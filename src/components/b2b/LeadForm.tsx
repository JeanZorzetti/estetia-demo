"use client";

import React, { useState } from "react";
import { b2bConfig } from "@/config/b2b";

type LeadState = { name: string; clinic: string; whatsapp: string };
const INITIAL: LeadState = { name: "", clinic: "", whatsapp: "" };

const inputClass =
  "w-full bg-warm-white border border-clinical-gray/40 focus:border-primary focus:outline-none focus:ring-0 rounded-xl px-4 py-3 text-on-surface transition-colors";
const labelClass = "block text-sm font-medium text-on-surface mb-2";

export default function LeadForm() {
  const [form, setForm] = useState<LeadState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — captura de lead será integrada depois (DB/CRM).
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center">
        <span
          className="material-symbols-outlined text-5xl text-primary mb-4 block"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          check_circle
        </span>
        <h3 className="font-display text-2xl text-on-surface mb-2">
          Recebido, {form.name || "tudo certo"}!
        </h3>
        <p className="text-on-surface-variant">
          Entramos em contato pelo WhatsApp em até 1 hora.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Seu Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Dra. Maria Silva"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="clinic" className={labelClass}>
            Nome da Clínica
          </label>
          <input
            id="clinic"
            name="clinic"
            type="text"
            required
            value={form.clinic}
            onChange={handleChange}
            placeholder="Clínica Estética Avançada"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelClass}>
            WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-on-primary py-4 rounded-xl text-sm font-semibold uppercase tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md mt-2"
        >
          Quero meu site
        </button>
        <div className="flex items-center justify-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px] text-gold-accent">
            bolt
          </span>
          <span className="text-sm">{b2bConfig.offer.reassurance}</span>
        </div>
      </form>
    </div>
  );
}
