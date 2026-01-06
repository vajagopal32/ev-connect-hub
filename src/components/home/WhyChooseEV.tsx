import { useEffect, useRef } from 'react';
import { Wallet, Leaf, Wrench, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseEV = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.why-card',
        { opacity: 0, scale: 0.9, rotateX: 15 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reasons = [
    {
      icon: Wallet,
      title: 'Cost Savings',
      description: 'Save up to 70% on fuel costs compared to traditional vehicles. Lower running costs mean more money in your pocket.',
      stat: '70%',
      statLabel: 'Fuel Savings',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Zero direct emissions help reduce air pollution and combat climate change. Drive green, live green.',
      stat: '0',
      statLabel: 'Emissions',
    },
    {
      icon: Wrench,
      title: 'Low Maintenance',
      description: 'Fewer moving parts mean less wear and tear. No oil changes, fewer brake replacements, minimal servicing.',
      stat: '50%',
      statLabel: 'Less Maintenance',
    },
    {
      icon: Award,
      title: 'Government Benefits',
      description: 'Take advantage of tax credits, subsidies, and incentives offered by the government for EV adoption.',
      stat: '$7,500',
      statLabel: 'Tax Credit',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-ev-dark text-ev-light relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 why-title">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            Benefits
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-primary">Electric?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Electric vehicles are not just the future—they're the smarter choice today. 
            Discover the benefits of going electric.
          </p>
        </div>

        {/* Reasons Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason, index) => (
            <div key={index} className="why-card group">
              <div className="h-full p-6 rounded-2xl bg-card/5 border border-border/20 backdrop-blur-sm hover:bg-card/10 hover:border-primary/30 transition-all duration-300">
                {/* Stat */}
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-primary">
                    {reason.stat}
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {reason.statLabel}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow">
                  <reason.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-3 text-ev-light">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseEV;
