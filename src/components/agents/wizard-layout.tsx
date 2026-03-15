"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  showBack?: boolean;
  children: React.ReactNode;
}

const STEP_LABELS = ["Basics", "Voice", "Script", "Review"];

export function WizardLayout({
  currentStep,
  totalSteps,
  stepLabel,
  onNext,
  onBack,
  nextLabel = "Next",
  nextDisabled = false,
  loading = false,
  showBack = true,
  children,
}: WizardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/agents"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agents
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-foreground">
              {stepLabel}
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {STEP_LABELS.map((label, i) => (
              <div
                key={label}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i + 1 < currentStep
                    ? "bg-green-500"
                    : i + 1 === currentStep
                    ? "bg-orange-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-end gap-3 px-4 py-3 sm:px-6">
          {showBack && currentStep > 1 && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={onNext} disabled={nextDisabled || loading}>
            {loading ? "..." : nextLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
}
