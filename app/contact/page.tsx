import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach USViral about a story, a correction, or the site.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader size="compact" dateLabel="Reach the publication" />
      <main className="wrap page">
        <p className="kicker">
          <span>USViral</span>
          Corrections and questions
        </p>
        <h1 className="page-title">Contact us</h1>
        <div className="sheet">
          <p>
            Write if a story has a fact wrong, if a picture is off, or if you need to reach the
            publisher. USViral reads those notes. This is not a Google address, and it is not a
            place to file a news tip that belongs to someone else.
          </p>
          <p>
            Sending the form opens a public message on the USViral project. Include an email if you
            want a reply. Do not send passwords, payment details, or private documents.
          </p>
          <ContactForm />
        </div>
      </main>
    </>
  );
}
