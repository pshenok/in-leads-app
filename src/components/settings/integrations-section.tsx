"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import type { ApiKey, IngestLog } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Key,
  Plus,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const INGEST_URL = `${API_BASE}/ingest`;

// ── API Keys Manager ────────────────────────────────────────────────────

function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchKeys = useCallback(async () => {
    try {
      const data = await api.apiKeys.list();
      setKeys(data);
    } catch {
      // silently handle
    }
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const key = await api.apiKeys.create(newName.trim());
      setCreatedKey(key.rawKey ?? null);
      setNewName("");
      await fetchKeys();
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.apiKeys.delete(id);
      await fetchKeys();
    } catch {
      // silently handle
    }
  };

  const handleCopyKey = async () => {
    if (!createdKey) return;
    await navigator.clipboard.writeText(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wider">
        API KEYS
      </h3>

      {createdKey && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <p className="mb-2 text-sm font-medium text-green-400">
            API key created successfully. Copy it now — it won&apos;t be shown
            again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-green-500/10 px-3 py-2 font-[family-name:var(--font-mono)] text-sm text-green-300">
              {createdKey}
            </code>
            <Button variant="outline" size="sm" onClick={handleCopyKey}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          placeholder="Key name (e.g. Production)"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          className="max-w-xs"
        />
        <Button onClick={handleCreate} disabled={loading || !newName.trim()}>
          <Plus className="mr-1 h-4 w-4" />
          Create
        </Button>
      </div>

      {keys.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No API keys yet. Create one to start ingesting leads via webhook.
        </p>
      ) : (
        <div className="space-y-2">
          {keys.map((k) => (
            <div
              key={k.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center gap-3">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{k.name}</span>
                <code className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
                  {k.keyPrefix}...
                </code>
                {k.isActive ? (
                  <Badge variant="default">Active</Badge>
                ) : (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                {k.lastUsedAt && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last used{" "}
                    {new Date(k.lastUsedAt).toLocaleDateString()}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(k.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Endpoint Documentation ──────────────────────────────────────────────

function EndpointDocs() {
  const [copied, setCopied] = useState(false);

  const curlExample = `curl -X POST ${INGEST_URL} \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "name": "Jane Doe",
    "phone": "+15551234567",
    "email": "jane@example.com",
    "service": "Plumbing Repair",
    "source": "website-form",
    "urgency": "high"
  }'`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(curlExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wider">
        WEBHOOK ENDPOINT
      </h3>

      <div className="overflow-hidden rounded-lg border border-border bg-gray-900 text-gray-100">
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 text-white">POST</Badge>
            <code className="font-[family-name:var(--font-mono)] text-sm">
              {INGEST_URL}
            </code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-3 p-4 font-[family-name:var(--font-mono)] text-sm">
          <div>
            <p className="mb-1 text-gray-400">Required fields:</p>
            <p>
              <span className="text-green-400">name</span>{" "}
              <span className="text-gray-500">string</span>,{" "}
              <span className="text-green-400">phone</span>{" "}
              <span className="text-gray-500">string</span>
            </p>
          </div>
          <div>
            <p className="mb-1 text-gray-400">Optional fields:</p>
            <p className="leading-relaxed">
              <span className="text-yellow-400">email</span>,{" "}
              <span className="text-yellow-400">service</span>,{" "}
              <span className="text-yellow-400">source</span>,{" "}
              <span className="text-yellow-400">address</span>,{" "}
              <span className="text-yellow-400">description</span>,{" "}
              <span className="text-yellow-400">urgency</span>,{" "}
              <span className="text-yellow-400">budget</span>,{" "}
              <span className="text-yellow-400">metadata</span>
            </p>
          </div>
          <div>
            <p className="mb-1 text-gray-400">Example:</p>
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-gray-300">
              {curlExample}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Recent Ingest Logs ──────────────────────────────────────────────────

function IngestLogs() {
  const [logs, setLogs] = useState<IngestLog[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.ingest.logs();
      setLogs(data.slice(0, 20));
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wider">
          RECENT INGEST LOGS
        </h3>
        <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
          <RefreshCw
            className={`mr-1 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No ingest logs yet. Logs will appear here once leads are submitted via
          the webhook.
        </p>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center gap-3">
                {log.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm font-medium">{log.source}</span>
                <Badge
                  variant={
                    log.status === "success" ? "default" : "destructive"
                  }
                >
                  {log.status}
                </Badge>
                {log.error && (
                  <span className="text-xs text-destructive">{log.error}</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Integrations Section ───────────────────────────────────────────

export function IntegrationsSection() {
  return (
    <div className="space-y-10">
      <ApiKeysManager />
      <EndpointDocs />
      <IngestLogs />
    </div>
  );
}
