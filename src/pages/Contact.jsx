import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { sendLeadEmail } from "@/lib/leadEmail";
import PageHero from "@/components/shared/PageHero";

const contacts = [
  {
    name: "HRG Admin",
    phone: "+1 (909) 616-1182",
    phoneHref: "tel:+19096161182",
    email: "admin@HRGPrefab.com",
  },
  {
    name: "Jason A. Scott",
    phone: "+1 (909) 274-0272",
    phoneHref: "tel:+19092740272",
    email: "Jason@HRGPrefab.com",
  },
  {
    name: "Michael Tsveitel",
    phone: "+1 (917) 559-5056",
    phoneHref: "tel:+19175595056",
    email: "Michael@HRGPrefab.com",
  },
];

const projectTypes = ["Detached ADU", "Attached Addition", "Not sure yet"];

export default function Contact() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    zip_code: "",
    project_type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const projectType = form.project_type || "Not sure yet";
      await base44.entities.Lead.create({ ...form, project_type: projectType, lead_flow: "Contact Page" });
      // Same notification as the builder, so these inquiries reach the sales inbox (and the
      // CRM, which files every "New Project Inquiry" email). Saved first, so a failed email
      // never loses the inquiry.
      await sendLeadEmail({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        property_address: form.zip_code ? `ZIP ${form.zip_code}` : "-",
        final_sf: "-",
        plumbing: "-",
        scope_land_dev: "-",
        scope_materials: "-",
        scope_site_work: "-",
        expected_budget: "-",
        timeline: "-",
        has_plans: "-",
        plans_file_url: "No file uploaded",
        jurisdiction: "-",
        city_contact: "-",
        sewer_type: "-",
        utility_info: `${projectType}: ${form.message.trim() || "(no message)"}`,
        lead_flow: "Contact Page",
        details: `Form: Contact page\nProject type: ${projectType}\nMessage: ${form.message.trim() || "-"}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong sending your message. Please try again, or call us at (909) 616-1182.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        label="Let's Shape Your Space"
        title={<>Ready to start your <em className="not-italic font-bold">own project?</em></>}
        subtitle="Tell us a bit about your property and what you're hoping to build. We'll follow up within one business day with next steps."
        image="https://images.unsplash.com/photo-1709418440553-289bf9f1ef80?w=1600&q=80"
      />

      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl font-bold mb-8">Get in touch</h2>
            <div className="space-y-8">
              {contacts.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-l-2 border-primary pl-6"
                >
                  <h3 className="font-heading text-lg font-semibold mb-3">{c.name}</h3>
                  <a href={c.phoneHref} className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors mb-2">
                    <Phone className="w-4 h-4 text-primary" /> {c.phone}
                  </a>
                  <a href={`mailto:${c.email}`} className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary" /> {c.email}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 space-y-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-foreground/70">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Servicing metro and rural areas nationwide</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">Monday to Friday, 8:00 AM to 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-lg p-10 border border-border text-center h-full flex flex-col items-center justify-center"
              >
                <CheckCircle className="w-16 h-16 text-primary mb-6" />
                <h3 className="font-heading text-2xl font-bold mb-3">Thanks, we've got it.</h3>
                <p className="text-foreground/60 max-w-sm">
                  A member of our team will follow up within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 border border-border shadow-sm">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-primary mb-2">Full Name</label>
                    <input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-primary mb-2">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-primary mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-primary mb-2">Property ZIP Code</label>
                    <input
                      name="zip_code"
                      value={form.zip_code}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-primary mb-2">Project Type</label>
                  <select
                    name="project_type"
                    value={form.project_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  >
                    <option value="">Select a type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-primary mb-2">Tell us about your project</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-primary text-primary-foreground px-6 py-4 rounded-md font-semibold tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Request Free Estimate"}
                  {!loading && <Send className="w-4 h-4" />}
                </button>
                {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}