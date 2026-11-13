import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import PlanningGuides from "./pages/PlanningGuides";
import FAQ from "./pages/FAQ";
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import Testimonials from '@/pages/Testimonials';
import Contact from '@/pages/Contact';
import Collection from '@/pages/Collection';
import ADUModels from '@/pages/ADUModels';
import CompareModels from '@/pages/CompareModels';
import HowItWorks from '@/pages/HowItWorks';
import Financing from '@/pages/Financing';
import SeeWhatFits from '@/pages/SeeWhatFits';
import BestSellers from '@/pages/BestSellers';
import WhyHRG from '@/pages/WhyHRG';
import References from '@/pages/References';
import ProjectBuilderPage from '@/pages/ProjectBuilderPage';
import PrefabDesignBuild from '@/pages/collection/PrefabDesignBuild';
import AppleCabin from '@/pages/collection/AppleCabin';
import ExpandableContainer from '@/pages/collection/ExpandableContainer';
import OutdoorKitchen from '@/pages/collection/OutdoorKitchen';
import BuildDetail from '@/pages/collection/BuildDetail';
import BuildYours from '@/pages/collection/BuildYours';
import Pool from '@/pages/collection/Pool';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';

export default function SiteRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<PlanningGuides />} />
        <Route path="/guides/:slug" element={<PlanningGuides />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-a-quote" element={<Navigate to="/see-what-fits" replace />} />
        <Route path="/see-what-fits" element={<SeeWhatFits />} />
        <Route path="/adu-models" element={<ADUModels />} />
        <Route path="/compare-500-800" element={<CompareModels />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/financing" element={<Financing />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/collection/prefab-design-build" element={<PrefabDesignBuild />} />
        <Route path="/collection/apple-cabin" element={<AppleCabin />} />
        <Route path="/collection/expandable-container" element={<ExpandableContainer />} />
        <Route path="/collection/outdoor-kitchen" element={<OutdoorKitchen />} />
        <Route path="/finishes" element={<BuildYours />} />
        <Route path="/collection/prefab-design-build/:modelSlug/build" element={<BuildYours />} />
        <Route path="/collection/:collectionSlug/:modelSlug" element={<BuildDetail />} />
        <Route path="/pools" element={<Pool />} />
        <Route path="/collection/pool" element={<Navigate to="/pools" replace />} />
        <Route path="/why-hrg" element={<WhyHRG />} />
        <Route path="/references" element={<References />} />
        <Route path="/project-builder" element={<ProjectBuilderPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
