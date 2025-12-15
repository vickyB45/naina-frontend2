  "use client";

  import React, { useMemo, useState } from "react";
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
  import { Menu, Copy, Download, CheckCircle, AlertTriangle, Info, Check } from "lucide-react";
  import { formatDistanceToNowStrict, parseISO } from "date-fns";
  import { motion, AnimatePresence } from "framer-motion";
  import { toast, Toaster } from "sonner";
  import { LEVEL_COLORS, MOCK_LOGS } from "@/utils/helper";


  export default function SystemLogsCard() {
    const [query, setQuery] = useState("");
    const [level, setLevel] = useState("all");
    const [expanded, setExpanded] = useState(null);
    const [live, setLive] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    const filtered = useMemo(() => {
      return MOCK_LOGS.filter((l) => {
        if (level !== "all" && l.level !== level) return false;
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.message.toLowerCase().includes(q) ||
          (l.client && l.client.toLowerCase().includes(q))
        );
      }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }, [query, level]);

    async function copyJSON(item) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(item, null, 2));
        setCopiedId(item.id);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2000);
      } catch {
        toast.error("Failed to copy log!");
      }
    }

    function exportJSON() {
      const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `logs-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    return (
      <>
        <Toaster position="top-right" richColors />
        <Card className="border border-border/50 shadow-lg dark:bg-neutral-900/60">
          <CardHeader className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-3xl font-semibold">System Logs</CardTitle>
              <p className="text-xs text-muted-foreground">Recent system & agent events</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded px-2 py-1">
                <button
                  onClick={() => setLive((s) => !s)}
                  className={`text-xs px-2 py-1 rounded border ${live ? "bg-emerald-600/30 dark:text-emerald-300  text-emerald-900" : "text-muted-foreground"}`}
                  aria-pressed={live}
                >
                  {live ? "Live • On" : "Live • Off"}
                </button>
                <Input
                  placeholder="Search logs..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-[220px] text-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800">
                      <Menu />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem onClick={() => setLevel("all")}>All levels</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLevel("error")}>Errors</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLevel("warning")}>Warnings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLevel("info")}>Info</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLevel("success")}>Success</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="ghost" onClick={exportJSON} title="Export filtered logs">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ul className="divide-y divide-border/30 max-h-[300px] overflow-y-auto">
              <AnimatePresence initial={false}>
                {filtered.map((log) => {
                  const isOpen = expanded === log.id;
                  const timeAgo = formatDistanceToNowStrict(parseISO(log.timestamp), { addSuffix: true });
                  return (
                    <motion.li
                      key={log.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="px-4 py-3 hover:bg-zinc-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${LEVEL_COLORS[log.level] || "bg-slate-700 text-slate-200"}`}>
                          {log.level === "error" ? <AlertTriangle className="w-4 h-4" /> : log.level === "warning" ? <AlertTriangle className="w-4 h-4" /> : log.level === "success" ? <CheckCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium truncate">{log.title}</div>
                            <div className="ml-2 text-xs text-muted-foreground">{log.service}{log.client ? ` • ${log.client}` : ""}</div>
                            <div className="ml-auto text-xs text-muted-foreground">{timeAgo}</div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 truncate">{log.message}</div>

                          {/* actions */}
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => copyJSON(log)}
                              className="relative flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-neutral-200 hover:bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 transition-all duration-200"
                            >
                              <AnimatePresence mode="wait" initial={false}>
                                {copiedId === log.id ? (
                                  <motion.span
                                    key="copied"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Check className="w-3.5 h-3.5 text-green-400" /> Copied
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="copy"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Copy className="w-3.5 h-3.5" /> Copy
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </button>

                            <button
                              onClick={() => setExpanded(isOpen ? null : log.id)}
                              className="text-xs px-2 py-1 rounded-md hover:bg-slate-700/30 dark:hover:bg-neutral-700/50 transition-colors"
                            >
                              {isOpen ? "Collapse" : "Details"}
                            </button>
                          </div>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.pre
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 dark:bg-zinc-100 dark:bg-neutral-900/70 border border-slate-700 p-3 rounded text-xs dark:text-slate-200 overflow-auto max-h-[220px]"
                              >
                                {JSON.stringify(log.meta ?? { id: log.id, timestamp: log.timestamp, ...log }, null, 2)}
                              </motion.pre>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>

              {filtered.length === 0 && (
                <li className="p-6 text-center text-sm text-muted-foreground">
                  No logs found. Try adjusting filters or time range.
                </li>
              )}
            </ul>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Showing {filtered.length} logs</div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => alert("Open all logs page")}>View All</Button>
            </div>
          </CardFooter>
        </Card>
      </>
    );
  }

