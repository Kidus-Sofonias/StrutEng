import { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import Reveal from "../components/Reveal";
import { company } from "../data/company";

const emptyForm = { name: "", email: "", phone: "", service: "", message: "" };

function buildMailto({ name, email, phone, service, message }) {
  const subject = encodeURIComponent(
    `[Strut Engineering Website] ${service || "General Inquiry"} — ${name}`
  );
  const body = encodeURIComponent(
    `Hello,\n\nA new inquiry has been submitted through the official website.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService needed: ${service || "N/A"}\n\nMessage:\n${message}\n\n---\nWebsite: Official Company Website\nSubmission time: ${new Date().toLocaleString()}`
  );
  return `mailto:${company.email}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    window.location.href = buildMailto(form);
    setSent(true);
  };

  return (
    <>
      <HeroBanner
        image="/images/contact.jpg"
        compact
        eyebrow="Get in touch"
        title="Contact"
        accent="Strut Engineering"
        description="Ready to start a project or have a question? Reach out — we respond to every inquiry."
      />

      <section className="section">
        <div className="container contact-grid">
          {/* Info */}
          <Reveal direction="left">
            <div>
              <div className="contact-block">
                <h3>Reach us directly</h3>
                <div className="c-line">
                  <span className="ico">📞</span>
                  <a href={`tel:${company.phoneRaw}`}>{company.phone}</a>
                </div>
                <div className="c-line">
                  <span className="ico">✉️</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
                <div className="c-line">
                  <span className="ico">📍</span>
                  <span>
                    {company.address}
                    <br />
                    {company.city}
                  </span>
                </div>
              </div>

              <div className="contact-block">
                <h3>Office hours</h3>
                <div className="c-line">
                  <span className="ico">🕘</span>
                  <span>Monday – Friday · 8:30 AM – 5:30 PM</span>
                </div>
                <div className="c-line">
                  <span className="ico">💬</span>
                  <span>
                    Prefer chat?{" "}
                    <a
                      href={company.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>{" "}
                    or{" "}
                    <a
                      href={company.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Telegram
                    </a>
                  </span>
                </div>
              </div>

              <div className="contact-block">
                <h3>Firm details</h3>
                <div className="c-line">
                  <span className="ico">🏢</span>
                  <span>
                    TIN {company.tin} · VAT {company.vat}
                  </span>
                </div>
                <div className="c-line">
                  <span className="ico">👥</span>
                  <span>
                    {company.employees} employees · Est. {company.established}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="right">
            <div className="form-card">
              <span className="eyebrow">Send a message</span>
              <h2
                className="headline"
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  marginBottom: 12,
                }}
              >
                Start your project
              </h2>
              <p
                style={{
                  color: "var(--ink-muted)",
                  fontSize: "0.92rem",
                  marginBottom: 28,
                  lineHeight: 1.7,
                }}
              >
                This opens your email app and sends directly to {company.email} —
                no third-party service, completely free.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="name">Full name *</label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+251 ..."
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="service">Service needed</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service…</option>
                    <option>Architectural & Landscape Design</option>
                    <option>Structural Engineering Design</option>
                    <option>Infrastructure Engineering Design</option>
                    <option>Industrial Engineering Services</option>
                    <option>MEP Engineering Design</option>
                    <option>Contract Administration & Site Supervision</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project…"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send via Email
                </button>
                {sent && (
                  <div className="form-status ok">
                    ✓ Your email app opened with the message pre-filled — just
                    hit Send!
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
