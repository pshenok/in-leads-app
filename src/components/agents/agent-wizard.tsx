"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { WizardLayout } from "./wizard-layout";
import { StepBasics } from "./steps/step-basics";
import { StepVoice } from "./steps/step-voice";

interface WizardState {
  name: string;
  firstMessage: string;
  voiceId: string;
  voiceName: string;
  businessDescription: string;
  agentGoal: string;
  tone: "friendly" | "professional" | "casual" | "formal";
  infoToCollect: string;
  systemPrompt: string;
}

const initialState: WizardState = {
  name: "",
  firstMessage: "",
  voiceId: "",
  voiceName: "",
  businessDescription: "",
  agentGoal: "",
  tone: "friendly",
  infoToCollect: "",
  systemPrompt: "",
};

const STEP_LABELS = ["Basics", "Voice", "Script", "Review"];

interface AgentWizardProps {
  agentId?: string;
}

export function AgentWizard({ agentId }: AgentWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialState);
  const [submitting, setSubmitting] = useState(false);

  const updateField = useCallback(
    <K extends keyof WizardState>(field: K, value: WizardState[K]) => {
      setState((s) => ({ ...s, [field]: value }));
    },
    []
  );

  function validateStep(): boolean {
    switch (step) {
      case 1:
        return state.name.trim().length >= 2 && state.firstMessage.trim().length >= 10;
      case 2:
        return state.voiceId !== "";
      case 3:
        return state.systemPrompt.trim().length >= 10;
      case 4:
        return true;
      default:
        return false;
    }
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit — will be wired in Task 9
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function goToStep(s: number) {
    setStep(s);
  }

  return (
    <WizardLayout
      currentStep={step}
      totalSteps={4}
      stepLabel={STEP_LABELS[step - 1]}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={step === 4 ? (agentId ? "Save Changes" : "Create Agent") : "Next"}
      nextDisabled={!validateStep()}
      loading={submitting}
    >
      {step === 1 && (
        <StepBasics
          name={state.name}
          firstMessage={state.firstMessage}
          onChange={updateField}
        />
      )}
      {step === 2 && (
        <StepVoice
          selectedVoiceId={state.voiceId}
          onSelect={(voiceId, voiceName) => {
            updateField("voiceId", voiceId);
            updateField("voiceName", voiceName);
          }}
        />
      )}
      {step === 3 && (
        <div className="text-center text-muted-foreground">Step 3: Script (coming soon)</div>
      )}
      {step === 4 && (
        <div className="text-center text-muted-foreground">Step 4: Review (coming soon)</div>
      )}
    </WizardLayout>
  );
}
