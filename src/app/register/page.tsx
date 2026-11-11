"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import "./register.css";

/** Renders the registration form using Better Auth. */
export default function RegisterPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Registration failed.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-heading">
          <span className="register-eyebrow">JOIN INKSPACE</span>
          <h1>Create your account.</h1>
          <p>Join our community and start exploring stories that inspire.</p>
        </div>

        {success ? (
          <div className="register-success" role="status">
            <p>Your account has been created successfully!</p>
            <Link href="/login">Continue to sign in</Link>
          </div>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
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
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
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
                aria-describedby="password-hint"
                required
              />
              <span id="password-hint" className="register-hint">
                Must be at least 8 characters.
              </span>
            </div>

            {error && (
              <p className="register-error" role="alert">
                {error}
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