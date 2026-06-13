"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { contactSchema } from "@/lib/validators";

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactValues) {
    setSuccess(false);
    setError("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error ?? "Could not send message.");
      return;
    }
    form.reset();
    setSuccess(true);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid h-fit gap-4 rounded-3xl bg-surface-container-low p-5">
      <input className="input" placeholder="Name" {...form.register("name")} />
      <input className="input" placeholder="Email (optional)" {...form.register("email")} />
      <input className="input" placeholder="Phone" {...form.register("phone")} />
      <textarea className="input min-h-40" placeholder="Message" {...form.register("message")} />
      {Object.values(form.formState.errors)[0]?.message ? (
        <p className="text-sm font-semibold text-error">{String(Object.values(form.formState.errors)[0]?.message)}</p>
      ) : null}
      {error ? <p className="text-sm font-semibold text-error">{error}</p> : null}
      {success ? <p className="rounded-2xl bg-primary/10 p-3 text-sm font-semibold text-primary">Message sent. We will reply soon.</p> : null}
      <button disabled={form.formState.isSubmitting} className="btn-primary disabled:opacity-60">Send Message</button>
    </form>
  );
}
