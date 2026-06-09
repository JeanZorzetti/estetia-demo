"use client";

import React, { useState } from "react";
import { clientConfig } from "@/config/client";

type FormState = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

const INITIAL: FormState = { name: "", phone: "", service: "", message: "" };

const inputClass =
  "w-full border-0 border-b border-clinical-gray bg-transparent px-0 py-2 text-on-surface focus:outline-none focus:ring-0 focus:border-primary transition-colors placeholder-secondary";
const labelClass =
  "block text-xs uppercase tracking-widest text-on-surface-variant mb-2";

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit — no API/bank in this sprint
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-soft-beige relative overflow-hidden" id="agendar">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12 border border-clinical-gray/30">
          {submitted ? (
            <div className="text-center py-8">
              <span
                className="material-symbols-outlined text-5xl text-primary mb-4 block"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                check_circle
              </span>
              <h2 className="font-display text-3xl text-on-surface mb-3">
                Agendamento recebido!
              </h2>
              <p className="text-on-surface-variant">
                Obrigado, <strong>{form.name}</strong>. Entraremos em contato em
                até 1 hora.
              </p>
              <button
                onClick={() => {
                  setForm(INITIAL);
                  setSubmitted(false);
                }}
                className="mt-8 inline-flex items-center justify-center bg-primary text-on-primary text-xs font-semibold uppercase tracking-widest px-8 py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300"
              >
                Novo agendamento
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-4">
                  {clientConfig.bookingTitle}
                </h2>
                <p className="text-on-surface-variant">
                  {clientConfig.bookingSubtitle}{" "}
                  <strong className="text-primary font-medium">
                    Resposta em até 1 hora.
                  </strong>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Nome Completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(00) 00000-0000"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Serviço de Interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Selecione um tratamento</option>
                    {clientConfig.services.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Mensagem (Opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Conte-nos um pouco sobre o que você busca..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-primary text-on-primary text-xs font-semibold uppercase tracking-widest px-12 py-4 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors duration-300 shadow-md w-full md:w-auto"
                  >
                    {clientConfig.bookingTitle}
                    <span className="material-symbols-outlined ml-2 text-sm">
                      send
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
