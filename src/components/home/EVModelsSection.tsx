import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Battery, Gauge, Clock, ArrowRight, Car, Bike } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EVModelsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.models-title',
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
        '.model-card',
        { opacity: 0, y: 60, rotateY: 15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.7,
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

  const evModels = [
    {
      type: 'Car',
      icon: Car,
      name: 'Tesla Model 3',
      range: '358 km',
      price: '$39,990',
      chargeTime: '8.5 hrs',
      image: 'bg-gradient-to-br from-slate-800 to-slate-900',
      badge: 'Popular',
    },
    {
      type: 'Car',
      icon: Car,
      name: 'Hyundai Kona',
      range: '484 km',
      price: '$34,000',
      chargeTime: '9.5 hrs',
      image: 'bg-gradient-to-br from-blue-800 to-blue-900',
      badge: 'Long Range',
    },
    {
      type: 'Bike',
      icon: Bike,
      name: 'Ather 450X',
      range: '116 km',
      price: '$1,800',
      chargeTime: '3.5 hrs',
      image: 'bg-gradient-to-br from-emerald-700 to-emerald-800',
      badge: 'Best Seller',
    },
    {
      type: 'Scooter',
      icon: Bike,
      name: 'Ola S1 Pro',
      range: '181 km',
      price: '$1,500',
      chargeTime: '6.5 hrs',
      image: 'bg-gradient-to-br from-teal-700 to-teal-800',
      badge: 'New',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="vehicles"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-muted/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 models-title">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              EV Catalog
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Explore <span className="text-gradient">Electric Vehicles</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our collection of electric cars, bikes, and scooters. 
              Compare specifications and find your perfect ride.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start lg:self-auto group">
            View All Models
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Models Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {evModels.map((model, index) => (
            <div key={index} className="model-card group">
              <div className="ev-card p-0 overflow-hidden">
                {/* Image Area */}
                <div className={`relative h-48 ${model.image} flex items-center justify-center`}>
                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {model.badge}
                  </span>
                  
                  {/* Icon */}
                  <model.icon className="w-24 h-24 text-primary-foreground/30" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {model.type}
                  </span>
                  <h3 className="font-display text-xl font-bold mt-1 mb-4 text-foreground">
                    {model.name}
                  </h3>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Battery className="w-4 h-4 mx-auto text-primary mb-1" />
                      <span className="text-xs text-muted-foreground block">Range</span>
                      <span className="text-sm font-semibold text-foreground">{model.range}</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Clock className="w-4 h-4 mx-auto text-primary mb-1" />
                      <span className="text-xs text-muted-foreground block">Charge</span>
                      <span className="text-sm font-semibold text-foreground">{model.chargeTime}</span>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Gauge className="w-4 h-4 mx-auto text-primary mb-1" />
                      <span className="text-xs text-muted-foreground block">Price</span>
                      <span className="text-sm font-semibold text-foreground">{model.price}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EVModelsSection;
