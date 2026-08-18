import React from "react";
import { Instagram, Facebook } from "lucide-react";
import "../Styles/SocialSidebar.css";

/* =========================================================
   SOCIAL LINKS
   Apne real profile links / number yahan daal do
========================================================= */

const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    // Apna number country code ke saath daalo, jaise 91XXXXXXXXXX
    href: "https://wa.me/91XXXXXXXXXX",
    icon: null, // custom SVG neeche use hoga
  },
];

/* =========================================================
   WHATSAPP ICON
   lucide-react mein WhatsApp icon nahi hai, isliye
   custom SVG use kiya
========================================================= */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.29-.15-1.71-.85-1.98-.94-.27-.1-.46-.15-.66.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.27.29-1.02.99-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.19 2.05 3.13 4.96 4.39.69.3 1.24.48 1.66.61.7.22 1.33.19 1.84.12.56-.08 1.71-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
      <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.13c-1.7 0-3.29-.47-4.65-1.29l-.33-.2-3 .79.8-2.92-.22-.3A8.13 8.13 0 0 1 3.87 12c0-4.5 3.66-8.13 8.15-8.13S20.16 7.5 20.16 12s-3.65 8.13-8.14 8.13z" />
    </svg>
  );
}

export default function SocialSidebar() {
  return (
    <aside
      className="ss-sidebar"
      aria-label="Social media links"
    >
      <span className="ss-line"></span>

      <ul className="ss-list">
        {SOCIALS.map((social) => {
          const Icon = social.icon;

          return (
            <li
              key={social.id}
              className="ss-item"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`ss-link ss-link-${social.id}`}
                aria-label={social.label}
              >
                {Icon ? (
                  <Icon size={17} strokeWidth={1.6} />
                ) : (
                  <WhatsAppIcon />
                )}

                <span className="ss-tooltip">
                  {social.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <span className="ss-line"></span>
    </aside>
  );
}
