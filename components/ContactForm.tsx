"use client";

import { FormEvent } from "react";

const PROJECT = "https://github.com/mysticcipher23-create/usviral/issues/new";

export function ContactForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const title = `Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const url = `${PROJECT}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    window.location.assign(url);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" type="text" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required maxLength={160} />
      </label>
      <label>
        Message
        <textarea name="message" required maxLength={4000} />
      </label>
      <button className="refresh dark" type="submit">
        Send message
      </button>
    </form>
  );
}
