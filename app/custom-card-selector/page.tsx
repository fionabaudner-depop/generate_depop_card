"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PhoneFrame } from "../components/PhoneFrame";
import { BackLink } from "../components/BackLink";
import { CustomBalanceScreen } from "./components/CustomBalanceScreen";
import { DesignSelector } from "./components/DesignSelector";
import { CARD_DESIGNS, getDesign, getVariant } from "./lib/card-designs";
import { isDesignUnlocked } from "./lib/seller-status";
import styles from "./page.module.css";

type Step = "balance" | "designs";

const TRANSITION_MS = 460;

export default function CustomCardSelectorPage() {
  const [step, setStep] = useState<Step>("balance");
  const [outgoing, setOutgoing] = useState<Step | null>(null);

  // The user's saved choice (shown on Balance).
  const [savedDesignId, setSavedDesignId] = useState(CARD_DESIGNS[0].id);
  const [savedVariantId, setSavedVariantId] = useState(CARD_DESIGNS[0].variants[0].id);

  // The pending preview inside the design selector. Snapped to the saved
  // choice every time we re-enter the selector.
  const [previewDesignId, setPreviewDesignId] = useState(savedDesignId);
  const [previewVariantId, setPreviewVariantId] = useState(savedVariantId);

  useEffect(() => {
    if (!outgoing) return;
    const t = window.setTimeout(() => setOutgoing(null), TRANSITION_MS);
    return () => window.clearTimeout(t);
  }, [outgoing]);

  const goTo = useCallback(
    (next: Step) => {
      setOutgoing(step);
      setStep(next);
    },
    [step]
  );

  const handleCustomise = useCallback(() => {
    setPreviewDesignId(savedDesignId);
    setPreviewVariantId(savedVariantId);
    goTo("designs");
  }, [goTo, savedDesignId, savedVariantId]);

  const handleSelectorChange = useCallback((designId: string, variantId: string) => {
    setPreviewDesignId(designId);
    setPreviewVariantId(variantId);
  }, []);

  const handleSave = useCallback(() => {
    // Defensive guard — the DesignSelector swaps the Save CTA out for a
    // disabled lock pill when the previewed design is locked, so this should
    // never be reached. Keep the state consistent if it ever is.
    const previewDesign = getDesign(previewDesignId);
    if (
      previewDesign.earned &&
      !isDesignUnlocked(previewDesign.earned.unlock)
    ) {
      return;
    }
    setSavedDesignId(previewDesignId);
    setSavedVariantId(previewVariantId);
    goTo("balance");
  }, [goTo, previewDesignId, previewVariantId]);

  const handleBackFromDesigns = useCallback(() => {
    goTo("balance");
  }, [goTo]);

  const handleBackFromBalance = useCallback(() => {
    // No-op for the prototype — back chevron mirrors leaving the flow,
    // but the dashboard link already covers that.
  }, []);

  const renderStep = (s: Step): ReactNode => {
    switch (s) {
      case "balance": {
        const savedDesign = getDesign(savedDesignId);
        return (
          <CustomBalanceScreen
            variant={getVariant(savedDesignId, savedVariantId)}
            badge={savedDesign.earned ?? null}
            onCustomise={handleCustomise}
            onBack={handleBackFromBalance}
          />
        );
      }
      case "designs":
        return (
          <DesignSelector
            designId={previewDesignId}
            variantId={previewVariantId}
            onChange={handleSelectorChange}
            onSave={handleSave}
            onBack={handleBackFromDesigns}
          />
        );
    }
  };

  return (
    <>
      <BackLink />
      <PhoneFrame>
        <div className={styles.scene}>
          <div className={`${styles.layer} ${styles.entering}`} key={step}>
            {renderStep(step)}
          </div>
          {outgoing && outgoing !== step && (
            <div
              className={`${styles.layer} ${styles.exiting}`}
              key={`exit-${outgoing}`}
              aria-hidden="true"
            >
              {renderStep(outgoing)}
            </div>
          )}
        </div>
      </PhoneFrame>
    </>
  );
}
