"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/config/site";
import { REPLY_METHODS, TOPICS, validateContact, type FieldErrors, type ReplyMethod, type TopicId } from "@/lib/contact";
import { Icon } from "./Icon";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm({
  defaultTopic = "general",
  source = "contact-page",
  compact = false,
}: {
  defaultTopic?: TopicId;
  source?: string;
  compact?: boolean;
}) {
  const uid = useId();
  const id = (s: string) => `${uid}-${s}`;
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [replyMethod, setReplyMethod] = useState<ReplyMethod>("email");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      replyMethod: String(fd.get("replyMethod") ?? "") as ReplyMethod,
      replyTo: String(fd.get("replyTo") ?? ""),
      topic: String(fd.get("topic") ?? "") as TopicId,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      source,
    };

    const errs = validateContact(payload);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        formRef.current?.reset();
        setReplyMethod("email");
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus({
          kind: "error",
          message: data.error || "We couldn’t send your message right now.",
        });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn’t reach our server. Check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p className="field-error" id={id(`${k}-err`)}>
        <Icon name="alert" size={16} /> {errors[k]}
      </p>
    ) : null;

  if (status.kind === "sent") {
    return (
      <div className="status status--success" role="status" tabIndex={-1} ref={statusRef}>
        <Icon name="check" />
        <div>
          <p>Thank you — your message was sent.</p>
          <p style={{ fontWeight: 400 }}>
            {replyMethod === "none"
              ? "We received it."
              : "A team member will reply as soon as possible."}
          </p>
          <button type="button" className="btn btn--outline btn--sm" style={{ marginTop: "0.75rem" }} onClick={() => setStatus({ kind: "idle" })}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      {!compact && (
        <p className="muted" style={{ margin: 0 }}>
          Fields marked “optional” can be left blank. Please don’t include medical details or other private
          information.
        </p>
      )}

      <div className="field">
        <label htmlFor={id("name")}>
          Your name <span className="muted">(optional)</span>
        </label>
        <input id={id("name")} name="name" className="input" autoComplete="name" maxLength={120} />
      </div>

      <fieldset className="field">
        <legend>How should we reply?</legend>
        <div className="radio-row">
          {REPLY_METHODS.map((m, i) => (
            <label key={m.id} className="radio-pill">
              <input
                type="radio"
                name="replyMethod"
                value={m.id}
                checked={replyMethod === m.id}
                onChange={() => setReplyMethod(m.id)}
                data-field={i === 0 ? "replyMethod" : undefined}
              />
              <span>{m.label}</span>
            </label>
          ))}
        </div>
        {err("replyMethod")}
      </fieldset>

      {replyMethod !== "none" && (
        <div className="field">
          <label htmlFor={id("replyTo")}>{replyMethod === "email" ? "Email address" : "Phone number"}</label>
          <input
            id={id("replyTo")}
            name="replyTo"
            data-field="replyTo"
            className="input"
            type={replyMethod === "email" ? "email" : "tel"}
            inputMode={replyMethod === "email" ? "email" : "tel"}
            autoComplete={replyMethod === "email" ? "email" : "tel"}
            maxLength={200}
            aria-invalid={!!errors.replyTo}
            aria-describedby={errors.replyTo ? id("replyTo-err") : undefined}
          />
          {err("replyTo")}
        </div>
      )}

      <div className="field">
        <label htmlFor={id("topic")}>Topic</label>
        <select
          id={id("topic")}
          name="topic"
          data-field="topic"
          className="select"
          defaultValue={defaultTopic}
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? id("topic-err") : undefined}
        >
          {TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        {err("topic")}
      </div>

      <div className="field">
        <label htmlFor={id("message")}>Message</label>
        <textarea
          id={id("message")}
          name="message"
          data-field="message"
          className="textarea"
          maxLength={4000}
          rows={compact ? 4 : 6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? id("message-err") : undefined}
        />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people, bots tend to fill it in */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <div className="status status--error" role="alert" tabIndex={-1} ref={statusRef}>
          <Icon name="alert" />
          <div>
            <p>{status.message}</p>
            <p style={{ fontWeight: 400 }}>
              Your message was <strong>not</strong> sent. You can try again, or email us directly at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn--primary btn--block" disabled={status.kind === "sending"}>
        <Icon name="message" size={20} />
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" className="sr-only">
        {status.kind === "sending" ? "Sending your message" : ""}
      </p>
    </form>
  );
}
