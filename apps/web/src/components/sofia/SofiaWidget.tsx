'use client';

import { useState } from 'react';
import { Robot, PaperPlaneTilt, Sparkle, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface SofiaResponse {
  answer: string;
  confidence: string;
  reasoning: string[];
  nextSteps: string[];
}

const SUGGESTIONS = [
  'Which countries have the most investment opportunities?',
  'How can I improve my smart bid success rate?',
  'What partnerships should I explore?',
  'Show me trending sectors on the platform',
];

export function SofiaWidget() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<SofiaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const askSofia = async (q?: string) => {
    const query = q || question;
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResponse(null);
    try {
      const res = await api.post('/sofia', { question: query });
      setResponse(res.data);
      setQuestion('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/30">
          <Robot weight="light" className="h-5 w-5 text-brand-600" />
        </div>
        <div>
          <h3 className="font-semibold">Sofia AI Assistant</h3>
          <p className="text-xs text-[hsl(var(--text-secondary))]">
            Ask about business, investments, or platform features
          </p>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && askSofia()}
          placeholder="Ask Sofia anything..."
          className="flex-1 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          disabled={loading}
        />
        <button
          onClick={() => askSofia()}
          disabled={loading || !question.trim()}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <PaperPlaneTilt weight="light" className="h-4 w-4" />
          )}
        </button>
      </div>

      {!response && !loading && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => askSofia(s)}
              className="rounded-full border border-[hsl(var(--border))] px-3 py-1.5 text-xs text-[hsl(var(--text-secondary))] transition-colors hover:bg-[hsl(var(--surface-elevated))]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-900 dark:bg-brand-950/20">
            <div className="mb-2 flex items-center gap-2">
              <Sparkle weight="light" className="h-4 w-4 text-brand-600" />
              <span className="text-xs font-medium text-brand-700 dark:text-brand-300">
                Confidence: {response.confidence}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{response.answer}</p>
          </div>

          {response.reasoning.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-[hsl(var(--text-secondary))]">Why:</p>
              <ul className="space-y-1">
                {response.reasoning.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--text-secondary))]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {response.nextSteps.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-[hsl(var(--text-secondary))]">Next Steps:</p>
              <ul className="space-y-1">
                {response.nextSteps.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-brand-600">
                    <ArrowRight weight="light" className="h-3 w-3" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
