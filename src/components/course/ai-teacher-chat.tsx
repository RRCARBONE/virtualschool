"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Loader2, MessageCircleQuestion, Send, X } from "lucide-react";
import type { AITeacher } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "Pode explicar de um jeito mais simples?",
  "Me dá um exemplo prático?",
  "Cria um exercício sobre isso para eu praticar",
  "Pode revisar o conteúdo da aula?",
];

export function AITeacherChat({
  teacher,
  courseId,
  lessonId,
}: {
  teacher: AITeacher;
  courseId: string;
  lessonId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Oi! Eu sou ${teacher.name}, ${teacher.title.toLowerCase()}. Pode perguntar o que quiser sobre esta aula — dúvidas, exemplos ou exercícios extras.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply ?? "Não consegui responder agora." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Tive um problema para responder agora. Tente novamente." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-br from-brand to-accent px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105"
      >
        <MessageCircleQuestion className="h-5 w-5" />
        <span className="hidden sm:inline">Tirar dúvida com o professor IA</span>
        <span className="sm:hidden">Professor IA</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 sm:items-center sm:p-6">
          <div className="flex h-[85vh] w-full flex-col rounded-t-3xl bg-surface shadow-soft sm:h-[600px] sm:max-w-sm sm:rounded-3xl">
            <div className="flex items-center justify-between gap-3 border-b border-border p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-lg">
                  {teacher.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold">{teacher.name}</p>
                  <p className="text-xs text-muted">{teacher.title}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-surface-muted" aria-label="Fechar chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user" ? "ml-auto bg-brand text-white" : "bg-surface-muted"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Bot className="h-4 w-4" /> <Loader2 className="h-3.5 w-3.5 animate-spin" /> digitando...
                </div>
              )}
            </div>

            {messages.length < 3 && (
              <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted hover:bg-surface-muted"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida..."
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white disabled:opacity-40"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
