import { company } from "../data/company";

export default function QuickContact() {
  return (
    <div className="quick-contact">
      <a
        className="qc qc-wa"
        href={company.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.5-.6c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.4 3.6a12 12 0 0 0 4.6 4.4c1.8.9 2.5 1 3.4.8.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
        </svg>
      </a>
      <a
        className="qc qc-tg"
        href={company.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on Telegram"
        title="Message on Telegram"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M21.9 4.6c.3-1.2-.9-2.2-2-1.7L2.7 9.5c-1.2.5-1.1 2.2.1 2.6l4.2 1.3 1.6 5.1c.3 1 1.6 1.3 2.4.6l2.3-2.1 4.2 3.1c1 .7 2.4.2 2.7-.9l3.7-14.6ZM8 13.3l10.4-6.7c.4-.3.9.3.5.6l-8 6.9c-.4.4-.7.9-.8 1.4l-.4 2.4c0 .3-.5.3-.6 0l-1.2-3.9c-.1-.4 0-.6.1-.7Z" />
        </svg>
      </a>
    </div>
  );
}
