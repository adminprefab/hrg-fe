import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, ArrowUpRight, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './HrgChat.css';

const suggestions = ['What does $100 per sq ft include?', 'Can I use my own contractor?', 'Compare the 500 and 800 sq ft models'];
const welcome = { role: 'assistant', content: 'A little clarity for your next step. Ask about prefab ADUs, project costs, materials or how HRG works.', mode: 'welcome' };
const fallback = { role: 'assistant', content: 'Chat is temporarily unavailable. Please try again or contact HRG at sales@hrgprefab.com or 909.274.0272.', mode: 'support', sources: [{ title: 'Talk with HRG', href: '/contact' }] };
const safeLinks = new Set(['/faq', '/compare-500-800', '/finishes', '/see-what-fits', '/contact', '/financing']);

export default function HrgChat() {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcome]);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const field = useRef(null), launcher = useRef(null), conversation = useRef(null), pending = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    // Do not add the assistant to other sites deployed from this repository.
    const allowed = /^(www\.)?hrgprefab\.com$/.test(window.location.hostname) || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.endsWith('.vercel.app');
    if (allowed) fetch('/api/hrg-chat', { signal: controller.signal, credentials: 'omit', cache: 'no-store' })
      .then(r => r.ok ? r.json() : null).then(data => setEnabled(data?.enabled === true)).catch(() => {});
    return () => { controller.abort(); pending.current?.abort(); };
  }, []);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);
  useEffect(() => { if (conversation.current) conversation.current.scrollTop = conversation.current.scrollHeight; }, [messages, busy, open]);

  function close() { setOpen(false); launcher.current?.focus(); }
  function clear() { pending.current?.abort(); pending.current = null; setMessages([welcome]); setQuestion(''); setBusy(false); field.current?.focus(); }
  async function send(text) {
    if (pending.current || !text.trim()) return;
    const next = [...messages, { role: 'user', content: text.trim().slice(0, 1500) }];
    setMessages(next); setQuestion(''); setBusy(true);
    const controller = new AbortController(); pending.current = controller;
    const timeout = setTimeout(() => controller.abort(), 28000);
    try {
      const response = await fetch('/api/hrg-chat', { method: 'POST', credentials: 'omit', cache: 'no-store', signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter(m => m.role === 'user' || m.mode === 'ai').slice(-9).map(({ role, content }) => ({ role, content })) }),
      });
      const data = await response.json();
      if (pending.current !== controller) return;
      if (typeof data.answer !== 'string') throw new Error('Invalid response');
      setMessages(current => [...current, { role: 'assistant', content: data.answer, mode: data.mode, sources: Array.isArray(data.sources) ? data.sources.filter(s => safeLinks.has(s.href)) : [] }]);
    } catch {
      if (pending.current === controller) setMessages(current => [...current, fallback]);
    } finally {
      clearTimeout(timeout);
      if (pending.current === controller) { pending.current = null; setBusy(false); field.current?.focus(); }
    }
  }

  // Layout belongs only to public pages; keep full-screen forms uncluttered.
  if (!enabled || /^\/(login|register|account|portal|admin|reset-password|forgot-password)(\/|$)/.test(pathname)) return null;
  return <div className="hrg-chat" onKeyDown={e => { if (e.key === 'Escape' && open) { e.stopPropagation(); close(); } }}>
    {open && <section className="hrg-chat-panel" aria-labelledby="hrg-chat-title" id="hrg-chat-panel">
      <header className="hrg-chat-heading">
        <div><span className="hrg-chat-eyebrow">HRG PREFAB · AI ASSISTANT</span><h2 id="hrg-chat-title">Let’s talk about your project.</h2></div>
        <button onClick={close} aria-label="Close HRG chat" className="hrg-chat-icon"><X size={20} /></button>
      </header>
      <div ref={conversation} className="hrg-chat-conversation" role="log" aria-label="HRG conversation" aria-live="polite" aria-relevant="additions">
        {messages.map((m, i) => <div key={i} className={`hrg-chat-message ${m.role === 'user' ? 'hrg-chat-user' : ''}`}>
          <span className="hrg-chat-byline">{m.role === 'user' ? 'YOU' : m.mode === 'ai' ? 'HRG · AI ASSISTANT' : 'HRG · PROJECT HELP'}</span>
          <p>{m.content}</p>
          {m.sources?.length > 0 && <nav aria-label="Related HRG pages">{m.sources.map(s => <a key={s.href} href={s.href}>{s.title}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</nav>}
        </div>)}
        {messages.length === 1 && <div className="hrg-chat-suggestions" aria-label="Suggested questions">{suggestions.map(s => <button key={s} onClick={() => send(s)}>{s}<ArrowUpRight size={15} aria-hidden="true" /></button>)}</div>}
        {busy && <p className="hrg-chat-status" role="status">Finding the right guidance…</p>}
      </div>
      <form className="hrg-chat-form" onSubmit={e => { e.preventDefault(); send(question); }}>
        <label className="sr-only" htmlFor="hrg-chat-question">Your HRG question</label>
        <textarea id="hrg-chat-question" ref={field} value={question} onChange={e => setQuestion(e.target.value)} maxLength={1500} rows={2} placeholder="What would you like to know?" aria-describedby="hrg-chat-notice" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(question); } }} />
        <button type="submit" disabled={busy || !question.trim()} aria-label="Send HRG question"><Send size={18} /></button>
      </form>
      <footer className="hrg-chat-footer">
        <p id="hrg-chat-notice">AI can make mistakes. Questions are processed by OpenAI. Don’t share private project, payment or login details. Confirm your scope and budget with HRG.</p>
        <div><a href="/see-what-fits">Start your project</a><a href="/contact">Talk with HRG</a><button onClick={clear}>Clear chat</button></div>
      </footer>
    </section>}
    <button ref={launcher} className="hrg-chat-launcher" aria-expanded={open} aria-controls="hrg-chat-panel" onClick={() => open ? close() : setOpen(true)}><MessageSquare size={18} aria-hidden="true" />{open ? 'Close chat' : 'Ask HRG'}</button>
  </div>;
}
