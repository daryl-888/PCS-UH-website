"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import TerminalCard from "@/components/TerminalCard";
import StatusBadge from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey — I'm the PCS assistant. Ask me about dues, joining, workshops, or events.",
};

/** Site-wide floating "Ask PCS" launcher + chat panel, backed by /api/chat. */
export default function AskPCS() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send() {
    const content = input.trim();
    if (!content || busy) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("no response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Sorry — the AI backend is unreachable right now. Email contact@uh-pcs.org.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close PCS assistant" : "Open PCS assistant"}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full",
          "border border-lineActive bg-panel text-gpu shadow-glow backdrop-blur-md",
          "transition-colors hover:bg-panelHigh"
        )}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden />
        )}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-5 z-[60] w-[min(380px,calc(100vw-2.5rem))]"
          >
            <TerminalCard label="ASK_PCS.EXE" corners>
              <div className="flex items-center justify-between border-b border-line px-4 py-2">
                <StatusBadge label="AI_ONLINE" tone="green" />
              </div>

              <div
                ref={logRef}
                aria-live="polite"
                className="flex h-80 flex-col gap-3 overflow-y-auto px-4 py-3"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "max-w-[85%] rounded-lg border px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "self-end border-lineActive bg-panelHigh text-textPrimary"
                        : "self-start border-line bg-black text-textSecondary"
                    )}
                  >
                    {m.content || (busy && i === messages.length - 1 ? "…" : "")}
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 border-t border-line p-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about dues, events, workshops…"
                  aria-label="Message"
                  disabled={busy}
                  className={cn(
                    "flex-1 rounded-md border border-line bg-black px-3 py-2 font-sans text-sm text-textPrimary",
                    "placeholder:text-textMuted focus:border-lineActive focus:outline-none"
                  )}
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-md border border-lineActive bg-panel text-gpu",
                    "transition-colors hover:bg-panelHigh disabled:cursor-not-allowed disabled:opacity-40"
                  )}
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </TerminalCard>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
