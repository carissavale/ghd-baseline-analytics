"use client";

// Login form — Supabase auth when env is configured; otherwise falls back to
// design-preview mode and sends straight to /mission.

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const SUPABASE_CONFIGURED =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const next = params.get("redirect") ?? "/mission";

    if (!SUPABASE_CONFIGURED) {
      router.push(next);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setSubmitting(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Sign-in failed. Try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-eyebrow">Stakeholder Access</div>
      <div className="login-title">Sign in</div>
      <div className="login-sub">Q2 2026 · Mar 24 to Apr 23, 2026</div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          autoComplete="email"
          required={SUPABASE_CONFIGURED}
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required={SUPABASE_CONFIGURED}
        />
      </div>

      {error && <div className="login-error">{error}</div>}

      <button type="submit" className="submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Enter Portal →"}
      </button>

      <div className="login-footer">
        <span className="left">Secure · TLS 1.3</span>
        <a href="/forgot-password" className="right">
          Forgot Password →
        </a>
      </div>

      <style>{`
        .login-card {
          width: 420px; max-width: 100%;
          background: rgba(18,18,17,0.6);
          border: 1px solid var(--hairline-2);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          padding: 36px 36px 32px;
          position: relative;
          opacity: 0; animation: fadeUp 1.2s ease 1.1s forwards;
        }
        .login-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--gold);
        }
        .login-eyebrow {
          font-size: 12px; letter-spacing: 0.26em; color: var(--gold);
          text-transform: uppercase; margin-bottom: 14px; text-align: center;
        }
        .login-title {
          font-size: 22px; font-weight: 400; color: var(--mercury);
          letter-spacing: -0.01em; text-align: center; margin-bottom: 6px;
        }
        .login-sub {
          font-size: 12px; letter-spacing: 0.18em; color: var(--mercury-faint);
          text-transform: uppercase; text-align: center; margin-bottom: 28px;
        }
        .field { margin-bottom: 14px; }
        .field label {
          display: block; font-size: 11px; letter-spacing: 0.22em;
          color: var(--mercury-faint); text-transform: uppercase; margin-bottom: 6px;
        }
        .field input {
          width: 100%; padding: 14px 16px;
          background: rgba(0,0,0,0.4); border: 1px solid var(--hairline-2);
          color: var(--mercury); font-family: inherit;
          font-size: 16px; font-weight: 400;
          outline: none; transition: border-color 0.2s;
        }
        .field input:focus { border-color: var(--gold); }
        .field input::placeholder { color: var(--mercury-faint); }
        .login-error {
          margin: 4px 0 12px;
          padding: 10px 12px;
          font-size: 13px;
          color: #ff9a8a;
          background: rgba(255,90,80,0.08);
          border: 1px solid rgba(255,90,80,0.32);
        }
        .submit {
          width: 100%; padding: 16px 24px;
          background: var(--gold); color: var(--black); border: none;
          font-size: 13px; letter-spacing: 0.24em; text-transform: uppercase;
          font-weight: 500; cursor: pointer;
          transition: all 0.2s; margin-top: 8px;
        }
        .submit:hover { background: #ffd37a; }
        .submit:disabled { opacity: 0.6; cursor: wait; }
        .login-footer {
          margin-top: 22px; padding-top: 18px;
          border-top: 1px solid var(--hairline-2);
          display: flex; justify-content: space-between; align-items: center;
        }
        .login-footer .left {
          font-size: 11px; letter-spacing: 0.2em;
          color: var(--mercury-faint); text-transform: uppercase;
        }
        .login-footer .right {
          font-size: 11px; letter-spacing: 0.2em;
          color: var(--gold-mid); text-transform: uppercase;
          text-decoration: none; cursor: pointer;
        }
        .login-footer .right:hover { color: var(--gold); }
      `}</style>
    </form>
  );
}
