"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { StatusBar } from "../../components/StatusBar";
import { HomeIndicator } from "../../components/HomeIndicator";
import { CustomBalanceCard } from "./CustomBalanceCard";
import { CARD_DESIGNS } from "../lib/card-designs";
import {
  DEMO_USER_STATUS,
  getUnlockHeadline,
  getUnlockProgress,
  isDesignUnlocked,
} from "../lib/seller-status";
import styles from "./DesignSelector.module.css";

type Props = {
  designId: string;
  variantId: string;
  onChange: (designId: string, variantId: string) => void;
  onSave: () => void;
  onBack: () => void;
};

const SLIDE_WIDTH = 260;
const SLIDE_GAP = 16;
const SLIDE_PITCH = SLIDE_WIDTH + SLIDE_GAP;
// How far (px) the user has to drag before we snap to the next/prev card.
const DRAG_DISTANCE_THRESHOLD = 60;
// How fast (px/ms) the drag has to move to "flick" past a card without
// reaching the distance threshold.
const DRAG_VELOCITY_THRESHOLD = 0.45;
// How aggressively the drag pulls the track. Anything <1 means the track
// "resists" the drag a bit, which feels nicer than 1:1.
const DRAG_DAMPING = 0.85;

export function DesignSelector({ designId, variantId, onChange, onSave, onBack }: Props) {
  const designIndex = Math.max(
    0,
    CARD_DESIGNS.findIndex((d) => d.id === designId)
  );

  const [activeIndex, setActiveIndex] = useState(designIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [justSettledKey, setJustSettledKey] = useState(0);

  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startTime: number;
    lastX: number;
    lastTime: number;
  }>({ pointerId: null, startX: 0, startTime: 0, lastX: 0, lastTime: 0 });

  const viewportRef = useRef<HTMLDivElement>(null);

  const activeDesign = CARD_DESIGNS[activeIndex] ?? CARD_DESIGNS[0];
  const activeVariant =
    activeDesign?.variants.find((v) => v.id === variantId) ??
    activeDesign?.variants[0];

  const isLocked =
    !!activeDesign?.earned && !isDesignUnlocked(activeDesign.earned.unlock);

  // --- Index commit when external designId changes (e.g. coming back to selector) ---
  useEffect(() => {
    if (designIndex !== activeIndex) {
      setActiveIndex(designIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designIndex]);

  // --- Settle pop animation key ---
  useEffect(() => {
    setJustSettledKey((k) => k + 1);
  }, [activeIndex]);

  // --- Pointer drag handlers ---
  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      // Ignore right-click / pen-eraser etc.
      if (e.button !== 0) return;
      const now = performance.now();
      dragStateRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startTime: now,
        lastX: e.clientX,
        lastTime: now,
      };
      setIsDragging(true);
      // Capture pointer so we still receive events if it leaves the viewport.
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const state = dragStateRef.current;
      if (state.pointerId !== e.pointerId) return;
      const dx = (e.clientX - state.startX) * DRAG_DAMPING;
      // Add resistance at the ends so the track doesn't feel infinite.
      let bounded = dx;
      const atStart = activeIndex === 0 && dx > 0;
      const atEnd = activeIndex === CARD_DESIGNS.length - 1 && dx < 0;
      if (atStart || atEnd) bounded = dx * 0.35;
      setDragOffset(bounded);
      state.lastX = e.clientX;
      state.lastTime = performance.now();
    },
    [activeIndex]
  );

  const finishDrag = useCallback(() => {
    const state = dragStateRef.current;
    if (state.pointerId === null) return;

    const totalDelta = state.lastX - state.startX;
    const totalTime = Math.max(1, state.lastTime - state.startTime);
    const velocity = totalDelta / totalTime; // px/ms

    let newIndex = activeIndex;
    if (totalDelta > DRAG_DISTANCE_THRESHOLD || velocity > DRAG_VELOCITY_THRESHOLD) {
      newIndex = Math.max(0, activeIndex - 1);
    } else if (
      totalDelta < -DRAG_DISTANCE_THRESHOLD ||
      velocity < -DRAG_VELOCITY_THRESHOLD
    ) {
      newIndex = Math.min(CARD_DESIGNS.length - 1, activeIndex + 1);
    }

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      const newDesign = CARD_DESIGNS[newIndex];
      // Keep the variant id if it exists in the new design, otherwise pick
      // its first variant.
      const matching = newDesign.variants.find((v) => v.id === variantId);
      onChange(newDesign.id, matching ? matching.id : newDesign.variants[0].id);
    }

    dragStateRef.current.pointerId = null;
    setIsDragging(false);
    setDragOffset(0);
  }, [activeIndex, onChange, variantId]);

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current.pointerId !== e.pointerId) return;
      finishDrag();
    },
    [finishDrag]
  );

  const handlePointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current.pointerId !== e.pointerId) return;
      finishDrag();
    },
    [finishDrag]
  );

  // --- Keyboard navigation ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        const next = activeIndex - 1;
        setActiveIndex(next);
        const d = CARD_DESIGNS[next];
        const matching = d.variants.find((v) => v.id === variantId);
        onChange(d.id, matching ? matching.id : d.variants[0].id);
      } else if (e.key === "ArrowRight" && activeIndex < CARD_DESIGNS.length - 1) {
        const next = activeIndex + 1;
        setActiveIndex(next);
        const d = CARD_DESIGNS[next];
        const matching = d.variants.find((v) => v.id === variantId);
        onChange(d.id, matching ? matching.id : d.variants[0].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, onChange, variantId]);

  // --- Dot click ---
  const handleDotClick = useCallback(
    (idx: number) => {
      if (idx === activeIndex) return;
      setActiveIndex(idx);
      const d = CARD_DESIGNS[idx];
      const matching = d.variants.find((v) => v.id === variantId);
      onChange(d.id, matching ? matching.id : d.variants[0].id);
    },
    [activeIndex, onChange, variantId]
  );

  // --- Compute base track translate + per-slide effects ---
  const trackOffset = -activeIndex * SLIDE_PITCH + dragOffset;
  // dragProgress is the fractional drag relative to a full slide pitch — used to
  // smoothly interpolate adjacent slides' scale / rotate as the user pulls.
  const dragProgress = dragOffset / SLIDE_PITCH;

  if (!activeDesign || !activeVariant) {
    return null;
  }

  const availabilityClass =
    activeDesign.availabilityTone === "limited"
      ? styles.availabilityLimited
      : activeDesign.availabilityTone === "new"
        ? styles.availabilityNew
        : styles.availabilityNeutral;

  const lockedProgress =
    isLocked && activeDesign.earned
      ? getUnlockProgress(activeDesign.earned.unlock, DEMO_USER_STATUS)
      : "";
  const lockedHeadline =
    isLocked && activeDesign.earned ? getUnlockHeadline(activeDesign.earned.unlock) : "";

  return (
    <div className={styles.screen}>
      <StatusBar />
      <div className={styles.statusBarSpacer} aria-hidden="true" />

      <div className={styles.nav}>
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.backBtn}`}
          aria-label="Back"
          onClick={onBack}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12.5 4.5L6.5 10l6 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className={styles.navTitle}>Select a design</h1>
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.infoBtn}`}
          aria-label="More info"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <path d="M10 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="10" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className={styles.carouselWrap}>
        <div
          ref={viewportRef}
          className={`${styles.viewport} ${isDragging ? styles.viewportDragging : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            className={`${styles.track} ${isDragging ? styles.trackDragging : ""}`}
            style={{ ["--track-x" as string]: `${trackOffset}px` }}
          >
            {CARD_DESIGNS.map((design, idx) => {
              // Effective distance from the active card, factoring in the
              // current drag. Positive = to the right of active.
              const distance = idx - activeIndex - dragProgress;
              const absDistance = Math.abs(distance);
              // Smooth scale: 1 at center, 0.85 once a full pitch away.
              const scale = Math.max(0.78, 1 - absDistance * 0.15);
              // Tilt outward from center (mirrored): cards on the right lean
              // right (-rotate), cards on the left lean left.
              const rotate = Math.max(-6, Math.min(6, -distance * 6));
              const opacity = Math.max(0.35, 1 - absDistance * 0.45);
              const slideVariant =
                idx === activeIndex
                  ? activeVariant
                  : design.variants[0];
              const slideStyle = {
                "--slide-scale": scale.toFixed(3),
                "--slide-rotate": `${rotate.toFixed(2)}deg`,
                "--slide-opacity": opacity.toFixed(3),
              } as CSSProperties;
              const isCenter = absDistance < 0.001 && !isDragging;

              const slideEarnedLocked =
                !!design.earned && !isDesignUnlocked(design.earned.unlock);

              return (
                <div
                  key={design.id}
                  className={`${styles.slide} ${isCenter ? styles.slideJustSettled : ""}`}
                  style={slideStyle}
                  // Re-trigger the settle animation each time the active index
                  // changes by keying off justSettledKey for the active slide.
                  data-settle-key={isCenter ? justSettledKey : 0}
                  aria-hidden={idx !== activeIndex}
                >
                  <div className={styles.slideCardWrap}>
                    <CustomBalanceCard
                      variant={slideVariant}
                      size="hero"
                      badge={design.earned ?? null}
                      className={slideEarnedLocked ? styles.slideCardLocked : ""}
                    />
                    {slideEarnedLocked && idx === activeIndex ? (
                      <div className={styles.lockOverlay}>
                        <span className={styles.lockBadge}>
                          <LockGlyph />
                          {getUnlockHeadline(design.earned!.unlock)}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.dots}>
          {CARD_DESIGNS.map((d, idx) => (
            <button
              key={d.id}
              type="button"
              className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Show design ${d.name}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.detail}>
        <div className={styles.detailContent} key={activeDesign.id}>
          <h2 className={styles.designName}>{activeDesign.name}</h2>
          <p className={styles.designDescription}>{activeDesign.description}</p>
          <span className={`${styles.availability} ${availabilityClass}`}>
            {isLocked ? lockedHeadline : activeDesign.availability}
          </span>
        </div>

        {/* Variant swatches are only shown for unlocked designs — there's
            nothing actionable for the user to do until they earn the card. */}
        {!isLocked ? (
          <div className={styles.variantsWrap}>
            <div className={styles.variants}>
              <div className={styles.variantTrack}>
                {activeDesign.variants.map((v, idx) => {
                  const isSelected = v.id === activeVariant.id;
                  const swatchStyle = {
                    "--swatch-bg": v.swatch,
                    "--variant-delay": `${idx * 35}ms`,
                  } as CSSProperties;
                  return (
                    <button
                      key={`${activeDesign.id}-${v.id}`}
                      type="button"
                      className={`${styles.variantBtn} ${isSelected ? styles.variantSelected : ""}`}
                      onClick={() => onChange(activeDesign.id, v.id)}
                      aria-pressed={isSelected}
                      aria-label={v.label}
                      style={swatchStyle}
                    >
                      <span className={styles.swatch} />
                      <span className={styles.variantLabel}>{v.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.footer}>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.cta}>
          {isLocked ? (
            <button
              type="button"
              className={styles.lockedCta}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              <LockGlyph />
              {lockedProgress || `Locked · ${lockedHeadline}`}
            </button>
          ) : (
            <button type="button" className={styles.primary} onClick={onSave}>
              Save card design
            </button>
          )}
        </div>
      </div>

      <HomeIndicator />
    </div>
  );
}

function LockGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={styles.lockGlyph}
    >
      <rect
        x="2.5"
        y="6"
        width="9"
        height="6.5"
        rx="1.6"
        fill="currentColor"
      />
      <path
        d="M4.5 6V4.5a2.5 2.5 0 015 0V6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
