import { useEffect, useRef } from 'react';
import { UserPlus, MapPin, Calendar, CreditCard } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.how-title',
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
        '.step-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: UserPlus,
      step: '01',
      title: 'Register / Login',
      description: 'Create your account in seconds. Quick and secure registration with email or phone.',
    },
    {
      icon: MapPin,
      step: '02',
      title: 'Select Your Area',
      description: 'Choose your location to find the nearest charging stations and available slots.',
    },
    {
      icon: Calendar,
      step: '03',
      title: 'Book Your Slot',
      description: 'Pick your preferred time slot and charging station. Real-time availability updates.',
    },
    {
      icon: CreditCard,
      step: '04',
      title: 'Pay & Charge',
      description: 'Secure payment options. Arrive, plug in, and power up your EV hassle-free.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 how-title">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting started with EVPortal is easy. Follow these simple steps to find 
            and book your charging station.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card relative group"
            >
              <div className="ev-card h-full relative overflow-hidden">
                {/* Step number background */}
                <span className="absolute -top-4 -right-4 font-display text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                  {step.step}
                </span>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-md group-hover:shadow-glow transition-shadow">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <span className="text-sm font-semibold text-primary mb-2 block">
                    Step {step.step}
                  </span>
                  
                  <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
