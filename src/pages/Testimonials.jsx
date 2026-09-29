import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/shared/CTASection";

const testimonials = [
  { text: "HRG had our ADU framed and on-site faster than our neighbor's kitchen remodel took. The whole process was organized from day one, and they kept us updated at every stage.", name: "Marissa T.", project: "Backyard ADU", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { text: "We needed space for my mother-in-law without a years-long renovation. HRG handled permitting and the install in under two months from groundbreaking.", name: "Daniel R.", project: "In-Law Suite", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { text: "The build quality is genuinely better than I expected from a prefab unit. Finishes look custom, not cookie-cutter, and the crew that set it on-site was careful and fast.", name: "Priya K.", project: "Rental ADU", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { text: "Our addition needed to match the roofline of a 1920s house, and they pulled it off. You genuinely can't tell which part was built off-site.", name: "Tom & Ellen W.", project: "Attached Addition", avatar: "https://images.unsplash.com/photo-1500648766831-dca3d8e3e7b1?w=200&q=80" },
  { text: "From our first call to move-in was about four months, most of which was permitting that they handled for us. We barely had to think about it.", name: "Carlos M.", project: "Detached ADU", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c6010e?w=200&q=80" },
  { text: "We compared three ADU builders and HRG was the most upfront about cost and timeline. No surprises along the way, which mattered a lot to us.", name: "Janelle F.", project: "Backyard Studio", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
];

export default function Testimonials() {
  return (
    <>
      <PageHero
        breadcrumb="Testimonials"
        label="What Clients Say"
        title={<>Real feedback from <em className="not-italic font-bold">real builds</em></>}
        subtitle="We measure success by whether clients would build with us again. Here's what some of them have to say."
        image="https://images.unsplash.com/photo-1628394029761-acc83a2a08a6?w=1600&q=80"
      />

      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                className="bg-card rounded-lg p-8 border border-border shadow-sm"
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-foreground/70 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-foreground/50">{t.project}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label="Join Our Clients"
        title={<>Ready to start your <em className="not-italic font-bold">own project?</em></>}
        buttonText="Get Your Free Estimate"
      />
    </>
  );
}