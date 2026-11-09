"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useI18n } from "@/components/i18n/locale-provider";
import { Spinner } from "@/components/ui/spinner";

export function ContactForm() {
  const { t } = useI18n();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Same rules as the server's contactSchema, with messages in the visitor's language.
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t.contact.errors.name),
        email: z.string().email(t.contact.errors.email).optional().or(z.literal("")),
        phone: z
          .string()
          .regex(/^(\+971|971|0)?[0-9\s-]{8,14}$/, t.contact.errors.phone)
          .optional()
          .or(z.literal("")),
        message: z.string().trim().min(10, t.contact.errors.message)
      }),
    [t]
  );
  type Values = z.infer<typeof schema>;
  const form = useForm<Values>({ resolver: zodResolver(schema) });
  const { errors } = form.formState;

  async function onSubmit(values: Values) {
    setSuccess(false);
    setError("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    if (!response.ok) {
      setError(t.contact.sendError);
      return;
    }
    form.reset();
    setSuccess(true);
  }

  const field = "grid gap-2 text-sm text-stone";
  const errorText = "text-sm text-error";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid h-fit gap-5 rounded-card border border-hairline bg-white p-6 md:p-8">
      <h2 className="font-display text-3xl font-light text-ink">{t.contact.formTitle}</h2>
      <label className={field}>
        {t.contact.name}
        <input className="input" autoComplete="name" {...form.register("name")} aria-invalid={Boolean(errors.name)} />
        {errors.name ? <span className={errorText}>{errors.name.message}</span> : null}
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={field}>
          {t.contact.phoneField}
          <input className="input" type="tel" dir="ltr" autoComplete="tel" {...form.register("phone")} aria-invalid={Boolean(errors.phone)} />
          {errors.phone ? <span className={errorText}>{errors.phone.message}</span> : null}
        </label>
        <label className={field}>
          {t.contact.email}
          <input className="input" type="email" dir="ltr" autoComplete="email" {...form.register("email")} aria-invalid={Boolean(errors.email)} />
          {errors.email ? <span className={errorText}>{errors.email.message}</span> : null}
        </label>
      </div>
      <label className={field}>
        {t.contact.message}
        <textarea className="input min-h-36" {...form.register("message")} aria-invalid={Boolean(errors.message)} />
        {errors.message ? <span className={errorText}>{errors.message.message}</span> : null}
      </label>
      {error ? <p className={errorText}>{error}</p> : null}
      {success ? <p className="animate-rise rounded-xl bg-sage-pale/60 p-3 text-sm text-forest" role="status">{t.contact.sent}</p> : null}
      <button disabled={form.formState.isSubmitting} aria-busy={form.formState.isSubmitting} className="btn-primary w-full sm:w-fit">
        {form.formState.isSubmitting ? <Spinner /> : null}
        {t.contact.sendMessage}
      </button>
    </form>
  );
}
