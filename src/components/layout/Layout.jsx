import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileCTA from "./MobileCTA";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}