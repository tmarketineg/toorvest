'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PaperPlaneTilt, Robot } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';
import api from '@/lib/api';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      "Hello! I'm Sofia, your AI investment assistant. I can help you with investment opportunities, market analysis, project recommendations, and more. How can I assist you today?",
  },
];


export default function SofiaPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const response = await api.post('/sofia/chat', { message: input });
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.message,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/investment"
          className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]"
        >
          <ArrowLeft weight="light" className="h-4 w-4 rtl:rotate-180" />
          Investment Tourism
        </Link>
        <div className="flex items-center gap-2">
          <Robot weight="light" className="h-5 w-5 text-brand-600" />
          <span className="text-sm font-semibold">Sofia AI</span>
          <span className="h-2 w-2 rounded-full bg-brand-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white'
                    : 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Sofia about investments..."
          className="flex-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-4 py-3 text-white transition-colors hover:bg-brand-700"
        >
          <PaperPlaneTilt weight="light" className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
