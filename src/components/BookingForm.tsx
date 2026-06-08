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

  if (submitted) {
    return (
      <section className="py-16 px-4 bg-accent" id="agendamento">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Agendamento recebido!</h2>
          <p className="text-gray-700">
            Obrigado, <strong>{form.name}</strong>. Entraremos em contato em breve.
          </p>
          <button
            onClick={() => { setForm(INITIAL); setSubmitted(false); }}
            className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Novo agendamento
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-accent" id="agendamento">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
          {clientConfig.copy.cta}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Preencha o formulário e nossa equipe entrará em contato.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone / WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Serviço de interesse
            </label>
            <select
              id="service"
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="">Selecione um serviço</option>
              {clientConfig.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem (opcional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="Alguma dúvida ou observação?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mt-2"
          >
            {clientConfig.copy.cta}
          </button>
        </form>
      </div>
    </section>
  );
}
