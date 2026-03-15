"use client";

import { useState, useRef, useEffect } from "react";
import type { Voice } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Pencil, Play, Square } from "lucide-react";

interface StepReviewProps {
  name: string;
  firstMessage: string;
  voiceId: string;
  voiceName: string;
  systemPrompt: string;
  voices: Voice[];
  goToStep: (step: number) => void;
}

export function StepReview({
  name,
  firstMessage,
  voiceId,
  voiceName,
  systemPrompt,
  voices,
  goToStep,
}: StepReviewProps) {
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const voice = voices.find((v) => v.id === voiceId);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  function togglePlay() {
    if (!voice?.previewUrl) return;
    if (playing) {
      audioRef.current?.pause();
      audioRef.current = null;
      setPlaying(false);
      return;
    }
    const audio = new Audio(voice.previewUrl);
    audioRef.current = audio;
    setPlaying(true);
    audio.addEventListener("ended", () => setPlaying(false));
    audio.play().catch(() => setPlaying(false));
  }

  const promptLines = systemPrompt.split("\n");
  const truncatedPrompt =
    promptLines.length > 3
      ? promptLines.slice(0, 3).join("\n") + "..."
      : systemPrompt;

  const accentFlags: Record<string, string> = {
    american: "\u{1F1FA}\u{1F1F8}", british: "\u{1F1EC}\u{1F1E7}", australian: "\u{1F1E6}\u{1F1FA}", indian: "\u{1F1EE}\u{1F1F3}",
    irish: "\u{1F1EE}\u{1F1EA}", african: "\u{1F30D}", swedish: "\u{1F1F8}\u{1F1EA}", german: "\u{1F1E9}\u{1F1EA}",
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wider text-foreground">
          REVIEW YOUR AGENT
        </h2>
        <p className="mt-2 text-muted-foreground">
          Make sure everything looks good before creating
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-4">
        {/* Basics card */}
        <div className="rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Basics
            </h3>
            <Button variant="ghost" size="sm" onClick={() => goToStep(1)}>
              <Pencil className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{name}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="shrink-0 text-muted-foreground">First Message</span>
              <span className="truncate font-medium text-foreground text-right">
                {firstMessage}
              </span>
            </div>
          </div>
        </div>

        {/* Voice card */}
        <div className="rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Voice
            </h3>
            <Button variant="ghost" size="sm" onClick={() => goToStep(2)}>
              <Pencil className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                playing
                  ? "bg-foreground text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {playing ? (
                <Square className="h-3 w-3" fill="currentColor" />
              ) : (
                <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
              )}
            </button>
            <div>
              <p className="font-medium text-foreground">{voiceName || voiceId}</p>
              {voice && (
                <p className="text-sm text-muted-foreground">
                  {voice.gender === "male" ? "Male" : "Female"} &middot;{" "}
                  {accentFlags[voice.accent] || "\u{1F310}"}{" "}
                  {voice.accent.charAt(0).toUpperCase() + voice.accent.slice(1)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Script card */}
        <div className="rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Script
            </h3>
            <Button variant="ghost" size="sm" onClick={() => goToStep(3)}>
              <Pencil className="mr-1 h-3 w-3" />
              Edit
            </Button>
          </div>
          <p className="whitespace-pre-wrap text-sm text-foreground">
            {showFullPrompt ? systemPrompt : truncatedPrompt}
          </p>
          {promptLines.length > 3 && (
            <button
              onClick={() => setShowFullPrompt(!showFullPrompt)}
              className="mt-2 text-xs text-muted-foreground underline hover:text-foreground"
            >
              {showFullPrompt ? "Show less" : "Show all"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
