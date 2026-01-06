import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, Clock, Star, Navigation, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChargingStationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stations-title',
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
        mapRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.station-item',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stations = [
    {
      name: 'Downtown EV Hub',
      address: '123 Electric Ave, Downtown',
      distance: '1.2 km',
      available: 4,
      total: 6,
      rating: 4.8,
      type: 'Fast Charging',
    },
    {
      name: 'Green Mall Station',
      address: '456 Green Street, Mall Area',
      distance: '2.5 km',
      available: 2,
      total: 4,
      rating: 4.5,
      type: 'Standard',
    },
    {
      name: 'Tech Park Charger',
      address: '789 Innovation Blvd',
      distance: '3.8 km',
      available: 8,
      total: 10,
      rating: 4.9,
      type: 'Ultra-Fast',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="stations"
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 stations-title">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Station Locator
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Find <span className="text-gradient">Charging Stations</span> Near You
          </h2>
          <p className="text-lg text-muted-foreground">
            Locate the nearest charging stations with real-time availability. 
            Filter by charging speed, amenities, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map Preview */}
          <div ref={mapRef} className="relative">
            <div className="ev-card p-0 overflow-hidden aspect-square lg:aspect-[4/3]">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100">
                {/* Grid lines */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />
                
                {/* Map pins */}
                <div className="absolute top-1/4 left-1/3 animate-bounce" style={{ animationDelay: '0s' }}>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/2 animate-bounce" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-accent-foreground" />
                  </div>
                </div>

                {/* User location */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-card shadow-lg" />
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-blue-500/50 animate-ping" />
                  </div>
                </div>
              </div>

              {/* Map overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card/80 to-transparent">
                <Button variant="hero" size="lg" className="w-full group">
                  <Navigation className="w-5 h-5" />
                  Find Stations Near Me
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stations List */}
          <div ref={listRef} className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-foreground">
                Nearby Stations
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
              </Button>
            </div>

            {stations.map((station, index) => (
              <div
                key={index}
                className="station-item ev-card p-4 hover:border-primary/30 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-display font-bold text-foreground truncate">
                        {station.name}
                      </h4>
                      <span className="text-sm text-muted-foreground flex-shrink-0">
                        {station.distance}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {station.address}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        <Zap className="w-3 h-3" />
                        {station.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {station.available}/{station.total} available
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        {station.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingStationsSection;
