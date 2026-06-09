import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceList from "@/components/ServiceList";
import WhyUs from "@/components/WhyUs";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Clínica Aurora | Demo — Estética de Luxo",
  description: "Exemplo de site premium de clínica de estética entregue pela EstetiaCRM.",
};

// Demo de clínica fictícia (Clínica Aurora) — usada como PROVA na página B2B (home).
export default function DemoPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServiceList />
        <WhyUs />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
