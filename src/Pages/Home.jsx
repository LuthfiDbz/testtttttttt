import React, { useState } from "react";

import { Header } from "../Component/header/Header";
import { Footer } from "../Component/footer/Footer";
import { Promo } from "../Component/UI/home/PromoSlider";
import { Features } from "../Component/UI/home/Features";
import { Hero } from "../Component/UI/home/Hero";
import { Services } from "../Component/UI/home/Services";
import { Vehicles } from "../Component/UI/home/Vehicles";
import { Banner } from "../Component/UI/home/Banner";
import { Guide } from "../Component/UI/home/Guide";
import { Client } from "../Component/UI/home/Client";
import { Partner } from "../Component/UI/home/Partner";
import { Faq } from "../Component/UI/home/faq/Faq";
import { Helmet } from "react-helmet";
import { BsWhatsapp } from "react-icons/bs";
import { ClientSlider } from "../Component/UI/home/ClientSlider";

export const Home = () => {
  return (
    <>
      {/* <Header notifToken={isTokenFound}/> */}
      <Helmet>
        <title>Superkul Landing Page</title>
        <meta
          name="description"
          content="Percayakan pengiriman barangmu yang membutuhkan suhu dingin kepada Superkul." />
        <link rel="canonical" href="https://superkul.id/home" />
      </Helmet>
      <div
        style={{
          position: "relative"
        }}
      >
        <Hero />
        <Promo />
        <Features />
        <Services />
        <Vehicles />
        <Banner />
        <Guide />
        {/* <Client /> */}
        <ClientSlider />
        <Partner />
        <Faq />
        <a
          href="https://api.whatsapp.com/send/?phone=%2B6282130000298&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            backgroundColor: "#55CD6C",
            bottom: 30,
            right: 30,
            borderRadius: "50%",
            padding: "1rem"
          }}
        >
          <BsWhatsapp
            style={{
              color: "white",
              fontSize: "3rem",
            }}
          />
        </a>
      </div>
      <Footer />
    </>
  );
};
