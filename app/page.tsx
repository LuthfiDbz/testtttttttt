import Clients from "@/components/Page/Home/Clients";
import DataCount from "@/components/Page/Home/DataCount";
import Faq from "@/components/Page/Home/Faq";
import GetApps from "@/components/Page/Home/GetApps";
import Hero from "@/components/Page/Home/Hero";
import Products from "@/components/Page/Home/Products";
import Services from "@/components/Page/Home/Services";
import WhySuperkul from "@/components/Page/Home/WhySuperkul";
import Image from "next/image";
import ReactPlayer from "react-player";

export default function Home() {
  // initLocale('id');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary-white">
      <Hero />
      <section id="section-1" className="w-screen bg-glassmorph bg-cover px-26 py-10">
        <DataCount id="data-count-section" />
        <Clients id="clients-section" />
        <Services id="services-section" />
        <WhySuperkul id="why-superkul-section" />
      </section>
      <section id="section-2" className="w-screen bg-cover ">
        <Products id="products-section" />
        <GetApps id="getapps-section" />
        <Faq id="faq-section" />
      </section>
      {/* <section id="section-3" className="bg-ice bg-white bg-cover">
        <DataCount />
      </section> */}
    </main>
  );
}
