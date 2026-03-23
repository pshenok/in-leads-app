"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Voice, Agent } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Save,
  Loader2,
  Sparkles,
  Play,
  Square,
  Check,
  Phone,
  Settings2,
  MessageSquare,
  Mic,
  FileText,
  Trash2,
  RotateCcw,
  Plus,
  X,
} from "lucide-react";

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

export default function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [voiceId, setVoiceId] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [retryEnabled, setRetryEnabled] = useState(true);
  const [retryDelays, setRetryDelays] = useState<number[]>([30, 60]);

  // Voices
  const [voices, setVoices] = useState<Voice[]>([]);
  const [voiceSearch, setVoiceSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");

  // Audio
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // AI regenerate
  const [generating, setGenerating] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const [bizDesc, setBizDesc] = useState("");
  const [agentGoal, setAgentGoal] = useState("");
  const [tone, setTone] = useState<"friendly" | "professional" | "casual" | "formal">("friendly");
  const [infoToCollect, setInfoToCollect] = useState("");

  // Load agent + voices
  useEffect(() => {
    Promise.all([api.agents.get(id), api.voices.list()])
      .then(([agentData, voicesData]) => {
        setAgent(agentData);
        setName(agentData.name);
        setFirstMessage(agentData.firstMessage);
        setVoiceId(agentData.voiceId);
        setSystemPrompt(agentData.systemPrompt);
        setIsActive(agentData.isActive);
        setRetryEnabled(agentData.retryEnabled ?? true);
        try {
          setRetryDelays(JSON.parse(agentData.retryDelaysJson || "[30,60]"));
        } catch { setRetryDelays([30, 60]); }
        setVoices(voicesData);
        setLoading(false);
      })
      .catch(() => {
        router.push("/agents");
      });
  }, [id, router]);

  // Track changes
  useEffect(() => {
    if (!agent) return;
    let agentDelays: number[];
    try { agentDelays = JSON.parse(agent.retryDelaysJson || "[30,60]"); } catch { agentDelays = [30, 60]; }
    const changed =
      name !== agent.name ||
      firstMessage !== agent.firstMessage ||
      voiceId !== agent.voiceId ||
      systemPrompt !== agent.systemPrompt ||
      isActive !== agent.isActive ||
      retryEnabled !== (agent.retryEnabled ?? true) ||
      JSON.stringify(retryDelays) !== JSON.stringify(agentDelays);
    setHasChanges(changed);
  }, [name, firstMessage, voiceId, systemPrompt, isActive, retryEnabled, retryDelays, agent]);

  // Audio controls
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
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setProgress(audio.currentTime));
    audio.addEventListener("ended", () => { setPlayingId(null); setProgress(0); });
    audio.play().catch(() => setPlayingId(null));
  }

  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  // Save
  async function handleSave() {
    setSaving(true);
    try {
      await api.agents.update(id, {
        name,
        firstMessage,
        systemPrompt,
        voiceId,
        voiceProvider: "11labs",
        model: "gpt-4o",
        modelProvider: "openai",
        isActive,
        isDefault: agent?.isDefault ?? false,
        retryEnabled,
        maxRetries: retryDelays.length,
        retryDelaysJson: JSON.stringify(retryDelays),
      });
      const updated = await api.agents.get(id);
      setAgent(updated);
      setHasChanges(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  // AI regenerate
  async function handleRegenerate() {
    if (!bizDesc.trim() || !agentGoal.trim()) return;
    setGenerating(true);
    try {
      const result = await api.agents.generatePrompt({
        businessDescription: bizDesc,
        agentGoal,
        tone,
        infoToCollect: infoToCollect || undefined,
        agentName: name,
        firstMessage,
      });
      setSystemPrompt(result.prompt);
      setShowRegenerate(false);
    } catch {
      alert("Failed to generate prompt");
    } finally {
      setGenerating(false);
    }
  }

  // Delete
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this agent? This cannot be undone.")) return;
    try {
      await api.agents.delete(id);
      router.push("/agents");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  // Filter voices
  const filteredVoices = voices.filter((v) => {
    if (genderFilter !== "all" && v.gender !== genderFilter) return false;
    if (voiceSearch && !v.name.toLowerCase().includes(voiceSearch.toLowerCase())) return false;
    return true;
  });

  const selectedVoice = voices.find((v) => v.id === voiceId);

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/agents"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-wider text-gray-900">
              {agent?.name || "EDIT AGENT"}
            </h1>
            <p className="text-sm text-gray-500">
              Agent settings &middot; {agent?._count?.calls ?? 0} calls made
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <Button onClick={handleSave} disabled={!hasChanges || saving} size="sm">
            {saving ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="mr-1.5 h-3.5 w-3.5" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Status toggle */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-300"}`} />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isActive ? "Active" : "Inactive"}
            </p>
            <p className="text-xs text-gray-500">
              {isActive ? "Agent is receiving and making calls" : "Agent is paused and won't make calls"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isActive ? "bg-emerald-500" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
              isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Section: Basics */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
          <Settings2 className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Basics
          </h2>
        </div>
        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Agent Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sales Assistant"
            />
            {name.length > 0 && name.trim().length < 2 && (
              <p className="text-xs text-red-500">Name must be at least 2 characters</p>
            )}
          </div>
        </div>
      </section>

      {/* Section: First Message */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
          <MessageSquare className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            First Message
          </h2>
        </div>
        <div className="space-y-2 p-6">
          <p className="text-xs text-gray-500">
            What your agent says when they call a lead
          </p>
          <Textarea
            rows={3}
            value={firstMessage}
            onChange={(e) => setFirstMessage(e.target.value)}
            placeholder="Hi! This is Sarah from Acme Corp. I'm calling about your recent inquiry..."
          />
          <div className="flex items-center justify-between">
            {firstMessage.length > 0 && firstMessage.trim().length < 10 && (
              <p className="text-xs text-red-500">Must be at least 10 characters</p>
            )}
            <p className="ml-auto text-xs text-gray-400">
              {firstMessage.length} / 500
            </p>
          </div>
        </div>
      </section>

      {/* Section: Voice */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Voice
            </h2>
          </div>
          {selectedVoice && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              Current: {selectedVoice.name}
            </span>
          )}
        </div>
        <div className="p-6 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search voices..."
              value={voiceSearch}
              onChange={(e) => setVoiceSearch(e.target.value)}
              className="max-w-xs"
            />
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5">
              {(["all", "male", "female"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    genderFilter === g
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Voice grid */}
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 max-h-[400px] overflow-y-auto pr-1">
            {filteredVoices.map((voice) => {
              const isSelected = voiceId === voice.id;
              const isPlaying = playingId === voice.id;

              return (
                <div
                  key={voice.id}
                  onClick={() => setVoiceId(voice.id)}
                  className={`relative cursor-pointer rounded-lg border p-3 transition-all hover:shadow-sm ${
                    isSelected
                      ? "border-orange-400 bg-orange-50/50 ring-1 ring-orange-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playVoice(voice);
                      }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isPlaying
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {isPlaying ? (
                        <Square className="h-3 w-3" fill="currentColor" />
                      ) : (
                        <Play className="h-3 w-3 ml-0.5" fill="currentColor" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{voice.name}</p>
                      <p className="text-xs text-gray-500">
                        {voice.gender === "male" ? "M" : "F"} &middot;{" "}
                        {accentFlags[voice.accent] || "\u{1F310}"}{" "}
                        {voice.accent.charAt(0).toUpperCase() + voice.accent.slice(1)}
                        {voice.description ? ` · ${voice.description}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini player */}
          {playingId && (
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-2.5">
              <button
                onClick={stopAudio}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white"
              >
                <Square className="h-2.5 w-2.5" fill="currentColor" />
              </button>
              <span className="text-xs font-medium text-gray-700">
                {voices.find((v) => v.id === playingId)?.name}
              </span>
              <div className="flex-1">
                <div className="h-1 rounded-full bg-gray-200">
                  <div
                    className="h-1 rounded-full bg-gray-900 transition-all"
                    style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : "0%" }}
                  />
                </div>
              </div>
              <span className="text-xs tabular-nums text-gray-400">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Section: System Prompt */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              System Prompt
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRegenerate(!showRegenerate)}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {showRegenerate ? "Hide AI Generator" : "Regenerate with AI"}
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {/* AI Regenerate form */}
          {showRegenerate && (
            <div className="space-y-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Prompt Generator
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">What does your business do?</Label>
                  <Textarea
                    rows={2}
                    value={bizDesc}
                    onChange={(e) => setBizDesc(e.target.value)}
                    placeholder="e.g. Plumbing company in Phoenix"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">What should the agent do?</Label>
                  <Textarea
                    rows={2}
                    value={agentGoal}
                    onChange={(e) => setAgentGoal(e.target.value)}
                    placeholder="e.g. Qualify leads and book appointments"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Tone</Label>
                  <div className="flex gap-1.5">
                    {(["friendly", "professional", "casual", "formal"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                          tone === t
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">
                  Info to collect <span className="text-gray-400">(optional)</span>
                </Label>
                <Input
                  value={infoToCollect}
                  onChange={(e) => setInfoToCollect(e.target.value)}
                  placeholder="Address, issue type, urgency, preferred time"
                  className="text-sm"
                />
              </div>
              <Button
                onClick={handleRegenerate}
                disabled={generating || !bizDesc.trim() || !agentGoal.trim()}
                size="sm"
              >
                {generating ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                )}
                {generating ? "Generating..." : "Generate New Prompt"}
              </Button>
            </div>
          )}

          {/* Prompt editor */}
          <Textarea
            rows={16}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="font-mono text-sm leading-relaxed"
            placeholder="Enter your agent's system prompt..."
          />
          {systemPrompt.length > 0 && systemPrompt.trim().length < 10 && (
            <p className="text-xs text-red-500">Prompt must be at least 10 characters</p>
          )}
          <p className="text-xs text-gray-400">
            {systemPrompt.length} characters &middot; This is the core instruction set for your AI agent
          </p>
        </div>
      </section>

      {/* Section: Retry Settings */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-gray-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Retry Settings
            </h2>
          </div>
          <button
            onClick={() => setRetryEnabled(!retryEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              retryEnabled ? "bg-emerald-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                retryEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="p-6">
          {retryEnabled ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-500">
                When a lead doesn&apos;t answer or requests a callback, the agent will automatically retry.
              </p>

              {/* Retry delay rows */}
              <div className="space-y-2.5">
                {retryDelays.map((delay, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-mono font-medium text-gray-500">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-600 w-24 shrink-0">
                      {idx === 0 ? "Retry after" : "Then after"}
                    </span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={1440}
                        value={delay}
                        onChange={(e) => {
                          const newDelays = [...retryDelays];
                          newDelays[idx] = Math.max(1, parseInt(e.target.value) || 1);
                          setRetryDelays(newDelays);
                        }}
                        className="w-20 text-center"
                      />
                      <span className="text-sm text-gray-500">minutes</span>
                    </div>
                    {retryDelays.length > 1 && (
                      <button
                        onClick={() => setRetryDelays(retryDelays.filter((_, i) => i !== idx))}
                        className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add retry button */}
              {retryDelays.length < 5 && (
                <button
                  onClick={() => setRetryDelays([...retryDelays, retryDelays[retryDelays.length - 1] * 2 || 60])}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add retry attempt
                </button>
              )}

              {/* Visual timeline */}
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">Preview</p>
                <div className="flex items-center gap-1 text-xs">
                  <div className="rounded bg-blue-100 px-2 py-1 text-blue-700 font-medium">
                    Call
                  </div>
                  {retryDelays.map((delay, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div className="w-8 border-t border-dashed border-gray-300" />
                      <span className="text-gray-400 whitespace-nowrap">{delay}m</span>
                      <div className="w-4 border-t border-dashed border-gray-300" />
                      <div className="rounded bg-amber-100 px-2 py-1 text-amber-700 font-medium whitespace-nowrap">
                        Retry {idx + 1}
                      </div>
                    </div>
                  ))}
                  <div className="w-8 border-t border-dashed border-gray-300" />
                  <span className="text-gray-400">stop</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Auto-retry is disabled. The agent will only call each lead once.
            </p>
          )}
        </div>
      </section>

      {/* Section: Technical */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
          <Phone className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Technical
          </h2>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-3.5">
              <p className="text-xs text-gray-400 mb-1">Model</p>
              <p className="text-sm font-mono font-medium text-gray-700">gpt-4o</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3.5">
              <p className="text-xs text-gray-400 mb-1">Voice Provider</p>
              <p className="text-sm font-mono font-medium text-gray-700">ElevenLabs</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3.5">
              <p className="text-xs text-gray-400 mb-1">Agent ID</p>
              <p className="text-sm font-mono font-medium text-gray-700 truncate">{id}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky save bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm px-6 py-3">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <p className="text-sm text-gray-600">You have unsaved changes</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!agent) return;
                  setName(agent.name);
                  setFirstMessage(agent.firstMessage);
                  setVoiceId(agent.voiceId);
                  setSystemPrompt(agent.systemPrompt);
                  setIsActive(agent.isActive);
                  setRetryEnabled(agent.retryEnabled ?? true);
                  try { setRetryDelays(JSON.parse(agent.retryDelaysJson || "[30,60]")); } catch { setRetryDelays([30, 60]); }
                }}
              >
                Discard
              </Button>
              <Button onClick={handleSave} disabled={saving} size="sm">
                {saving ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
