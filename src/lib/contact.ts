/** Shared between the contact form (browser) and the API route (server). */
export const TOPICS = [
  { id: "general", label: "General question" },
  { id: "volunteer", label: "Volunteering" },
  { id: "donate-supplies", label: "Donating supplies" },
  { id: "financial", label: "Financial support" },
  { id: "partnership", label: "Community partnership" },
  { id: "resource-update", label: "Suggest or update a resource" },
  { id: "other", label: "Something else" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export const REPLY_METHODS = [
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone or text" },
  { id: "none", label: "No reply needed" },
] as const;

export type ReplyMethod = (typeof REPLY_METHODS)[number]["id"];

export const isTopic = (v: unknown): v is TopicId => TOPICS.some((t) => t.id === v);

export interface ContactPayload {
  name: string;
  replyMethod: ReplyMethod;
  replyTo: string;
  topic: TopicId;
  message: string;
  website: string; // honeypot — must stay empty
  source: string;
}

export type FieldErrors = Partial<Record<"replyTo" | "message" | "topic" | "replyMethod", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(p: Partial<ContactPayload>): FieldErrors {
  const errors: FieldErrors = {};
  if (!p.replyMethod || !REPLY_METHODS.some((m) => m.id === p.replyMethod)) {
    errors.replyMethod = "Choose how we should reply.";
  }
  if (p.replyMethod === "email" && !EMAIL_RE.test((p.replyTo ?? "").trim())) {
    errors.replyTo = "Enter an email address, like name@example.com.";
  }
  if (p.replyMethod === "phone" && (p.replyTo ?? "").replace(/\D/g, "").length < 10) {
    errors.replyTo = "Enter a phone number with area code.";
  }
  if (!isTopic(p.topic)) errors.topic = "Choose a topic.";
  const msg = (p.message ?? "").trim();
  if (msg.length < 5) errors.message = "Please write a short message.";
  if (msg.length > 4000) errors.message = "Please keep your message under 4,000 characters.";
  return errors;
}
