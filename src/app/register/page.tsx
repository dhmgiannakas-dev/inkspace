"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerAction, type RegisterState } from "./actions";
import "./register.css";

const initialState: RegisterState = {
  success: false,
  message: "",
};

/** Renders registration form with server-side validation feedback. */
export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-heading">
          <span className="register-eyebrow">JOIN INKSPACE</span>
          <h1>Create your account.</h1>
          <p>Join our community and start exploring stories that inspire.</p>
        </div>

        {state.success ? (
          <div className="register-success" role="status">
            <p>{state.message}</p>
            <Link href="/login">Continue to sign in</Link>
          </div>
        ) : (
          <form className="register-form" action={formAction}>
            <div className="register-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                minLength={2}
                maxLength={50}
                aria-invalid={Boolean(state.errors?.name)}
                aria-describedby={
                  state.errors?.name ? "name-error" : undefined
                }
                required
              />
              {state.errors?.name && (
                <p id="name-error" className="register-error">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="register-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={Boolean(state.errors?.email)}
                aria-describedby={
                  state.errors?.email ? "email-error" : undefined
                }
                required
              />
              {state.errors?.email && (
                <p id="email-error" className="register-error">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div className="register-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                aria-invalid={Boolean(state.errors?.password)}
                aria-describedby={
                  state.errors?.password
                    ? "password-error"
                    : "password-hint"
                }
                required
              />
              <span id="password-hint" className="register-hint">
                Must be at least 8 characters.
              </span>
              {state.errors?.password && (
                <p id="password-error" className="register-error">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {state.message && (
              <p className="register-error" role="alert">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              className="register-submit"
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Create account"}
            </button>
          </form>
        )}

        <p className="register-login">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}