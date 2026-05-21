"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PhoneFrame } from "../components/PhoneFrame";
import { Splash } from "../components/Splash";
import { VibePicker } from "../components/VibePicker";
import { Generating } from "../components/Generating";
import { ResultCard } from "../components/ResultCard";
import { BalanceScreen } from "../components/BalanceScreen";
import { CardLayer, type CardMode } from "../components/CardLayer";
import { BackLink } from "../components/BackLink";
import type { VibeId } from "../lib/vibes";
import styles from "./page.module.css";

type Step = "splash" | "picker" | "generating" | "result" | "balance";

const TRANSITION_MS = 460;
const RANDOM_VIBES: VibeId[] = ["vintage", "street", "minimal", "maximalist"];

export default function DepopVibeSelectorPage() {
  const [step, setStep] = useState<Step>("splash");
  const [outgoing, setOutgoing] = useState<Step | null>(null);
  const [selected, setSelected] = useState<VibeId | null>(null);
  const [resolved, setResolved] = useState<VibeId | null>(null);
  const [username] = useState("style.maker");

  // Clear the outgoing layer once its exit animation has finished.
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

  const handleStart = useCallback(() => goTo("picker"), [goTo]);

  const handleSelect = useCallback((id: VibeId) => {
    setSelected(id);
  }, []);

  const handleGenerate = useCallback(() => {
    if (!selected) return;
    const final: VibeId =
      selected === "help" ? RANDOM_VIBES[Math.floor(Math.random() * RANDOM_VIBES.length)] : selected;
    setResolved(final);
    goTo("generating");
  }, [selected, goTo]);

  const handleDone = useCallback(() => goTo("result"), [goTo]);

  const handleTryAnother = useCallback(() => {
    setSelected(null);
    goTo("picker");
  }, [goTo]);

  const handleSave = useCallback(() => goTo("balance"), [goTo]);

  const handleExitBalance = useCallback(() => {
    setSelected(null);
    setResolved(null);
    goTo("splash");
  }, [goTo]);

  const renderStep = (s: Step): ReactNode => {
    switch (s) {
      case "splash":
        return <Splash onGetStarted={handleStart} onClose={handleStart} />;
      case "picker":
        return (
          <VibePicker selected={selected} onSelect={handleSelect} onGenerate={handleGenerate} />
        );
      case "generating":
        return resolved ? <Generating vibeId={resolved} onDone={handleDone} /> : null;
      case "result":
        return resolved ? (
          <ResultCard
            vibeId={resolved}
            onSave={handleSave}
            onTryAnother={handleTryAnother}
            onClose={handleSave}
          />
        ) : null;
      case "balance":
        return resolved ? <BalanceScreen onBack={handleExitBalance} /> : null;
    }
  };

  // The card is rendered at the page level so it can persist between the
  // result and balance screens, morphing position/size/contents.
  // Treat any "balance-bound" state (including the outgoing result during the
  // exit animation) as the balance slot so the morph starts immediately.
  const cardMode: CardMode = step === "balance" ? "balance" : "avatar";
  const cardVisible =
    step === "result" || step === "balance" || outgoing === "result" || outgoing === "balance";

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
          <CardLayer
            vibeId={resolved}
            username={username}
            mode={cardMode}
            visible={cardVisible}
          />
        </div>
      </PhoneFrame>
    </>
  );
}
