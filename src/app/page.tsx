import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceList from "@/components/ServiceList";
import WhyUs from "@/components/WhyUs";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function HomePage() {
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
