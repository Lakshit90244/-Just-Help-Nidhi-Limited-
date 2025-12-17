'use client';

export default function WhatsAppButton() {
  const phoneNumber = "919785873004"; // साक्रा Just Help Nidhi Limited
  const message = "Hello! I want to know more about your loan services."; // Optional pre-filled text
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp_float"
    >
      <img src="/whatsapp.png" alt="WhatsApp" className="whatsapp_icon" />
    </a>
  );
}
