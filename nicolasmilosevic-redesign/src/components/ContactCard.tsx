import Button from "./Button";
import { contactArt } from "./Art";
import { contact, person } from "@/lib/content";

export default function ContactCard() {
  return (
    <section id="contact" className="edge pb-3 pt-4" aria-labelledby="contact-title">
      <div data-rise data-dark className="tile grid items-center gap-10 bg-accent p-8 text-white md:grid-cols-12 md:gap-6 md:p-16">
        <div className="md:col-span-7">
          <p className="t-body mb-4 flex items-center gap-2 text-white/75">
            <span className="block h-2 w-2 rounded-full bg-white" aria-hidden />
            {contact.status}, from {person.location.split(",")[0]}
          </p>
          <h2 id="contact-title" className="t-title mb-10 max-w-[560px]">
            {contact.title}
          </h2>
          <Button href={contact.href} variant="primary" className="btn-on-accent">
            {contact.label}
          </Button>
        </div>
        <div className="mx-auto w-full max-w-[360px] text-white md:col-span-5">{contactArt}</div>
      </div>
    </section>
  );
}
