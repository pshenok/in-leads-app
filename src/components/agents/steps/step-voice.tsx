"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "@/lib/api";
import type { Voice } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Play, Square, Check } from "lucide-react";

const accentFlags: Record<string, string> = {
  american: "\u{1F1FA}\u{1F1F8}",
  british: "\u{1F1EC}\u{1F1E7}",
  australian: "\u{1F1E6}\u{1F1FA}",
  indian: "\u{1F1EE}\u{1F1F3}",
  irish: "\u{1F1EE}\u{1F1EA}",
  african: "\u{1F30D}",
  swedish: "\u{1F1F8}\u{1F1EA}",
  german: "\u{1F1E9}\u{1F1EA}",
};

interface StepVoiceProps {
  selectedVoiceId: string;
  onSelect: (voiceId: string, voiceName: string) => void;
}

export function StepVoice({ selectedVoiceId, onSelect }: StepVoiceProps) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");

  // Audio state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    api.voices.list().then((data) => {
      setVoices(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingId(null);
    setProgress(0);
    setDuration(0);
  }, []);

  function playVoice(voice: Voice) {
    if (playingId === voice.id) {
      stopAudio();
      return;
    }

    stopAudio();
    const audio = new Audio(voice.previewUrl);
    audioRef.current = audio;
    setPlayingId(voice.id);

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      setProgress(audio.currentTime);
    });
    audio.addEventListener("ended", () => {
      setPlayingId(null);
      setProgress(0);
    });

    audio.play().catch(() => {
      setPlayingId(null);
    });
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Filter voices
  const filtered = voices.filter((v) => {
    if (genderFilter !== "all" && v.gender !== genderFilter) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const playingVoice = voices.find((v) => v.id === playingId);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading voices...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wider text-foreground">
          CHOOSE A VOICE
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pick a voice for your agent and listen to a preview
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search voices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5">
          {(["all", "male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                genderFilter === g
                  ? "bg-foreground text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Voice grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((voice) => {
          const isSelected = selectedVoiceId === voice.id;
          const isPlaying = playingId === voice.id;

          return (
            <div
              key={voice.id}
              onClick={() => onSelect(voice.id, voice.name)}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                isSelected
                  ? "border-orange-500 bg-orange-50/50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Selected check */}
              {isSelected && (
                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}

              {/* Play button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playVoice(voice);
                }}
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  isPlaying
                    ? "bg-foreground text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isPlaying ? (
                  <Square className="h-3.5 w-3.5" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                )}
              </button>

              {/* Info */}
              <h3 className="font-semibold text-foreground">{voice.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {voice.gender === "male" ? "Male" : "Female"}
              </p>
              <p className="text-sm text-muted-foreground">
                {accentFlags[voice.accent] || "\u{1F310}"}{" "}
                {voice.accent.charAt(0).toUpperCase() + voice.accent.slice(1)}
              </p>
              {voice.description && (
                <span className="mt-2 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-muted-foreground">
                  {voice.description.charAt(0).toUpperCase() + voice.description.slice(1)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No voices match your filters
        </div>
      )}

      {/* Mini player */}
      {playingVoice && (
        <div className="sticky bottom-0 -mx-4 border-t border-gray-200 bg-white/90 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={stopAudio}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-white"
            >
              <Square className="h-3 w-3" fill="currentColor" />
            </button>
            <span className="text-sm font-medium text-foreground">
              {playingVoice.name}
            </span>
            <div className="flex-1">
              <div className="h-1 rounded-full bg-gray-200">
                <div
                  className="h-1 rounded-full bg-foreground transition-all"
                  style={{
                    width: duration > 0 ? `${(progress / duration) * 100}%` : "0%",
                  }}
                />
              </div>
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
