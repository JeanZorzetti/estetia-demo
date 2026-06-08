import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceList from "@/components/ServiceList";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServiceList />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
