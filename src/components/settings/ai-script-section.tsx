"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Agent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AiScriptSection() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch agents ──────────────────────────────────────────────────

  const fetchAgents = useCallback(async () => {
    try {
      setError(null);
      const data = await api.agents.list();
      setAgents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // ── Handlers ──────────────────────────────────────────────────────

  async function handleDelete() {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await api.agents.delete(deletingId);
      setDeletingId(null);
      await fetchAgents();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete agent");
    } finally {
      setDeleting(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Agents</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your AI voice agents, their voices, models, and scripts
          </p>
        </div>
        <Button onClick={() => router.push("/agents/new")}>+ Create Agent</Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-muted-foreground">
          Loading agents...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && agents.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <p className="text-muted-foreground">No agents yet.</p>
          <Button className="mt-4" onClick={() => router.push("/agents/new")}>
            Create your first agent
          </Button>
        </div>
      )}

      {/* Agent cards grid */}
      {!loading && agents.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-gray-200 bg-white p-5 space-y-3"
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground truncate">
                  {agent.name}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  {agent.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                  <Badge
                    variant={agent.isActive ? "default" : "outline"}
                  >
                    {agent.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="text-muted-foreground">Model</div>
                <div className="text-foreground font-medium">{agent.model}</div>

                <div className="text-muted-foreground">Voice</div>
                <div className="text-foreground font-medium">{agent.voiceId}</div>

                <div className="text-muted-foreground">Calls</div>
                <div className="text-foreground font-medium">
                  {agent._count?.calls ?? 0}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/agents/" + agent.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setDeletingId(agent.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete confirmation overlay ─────────────────────────────── */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Delete Agent
            </h3>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this agent? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeletingId(null)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
