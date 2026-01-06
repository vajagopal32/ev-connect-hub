import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, ArrowRight, Battery, Leaf } from 'lucide-react';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 1 }
      )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.8, x: 100 },
          { opacity: 1, scale: 1, x: 0, duration: 1.2 },
          '-=0.8'
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Zap, value: '10,000+', label: 'Charging Stations' },
    { icon: Battery, value: '50,000+', label: 'Happy Users' },
    { icon: Leaf, value: '2M+', label: 'CO₂ Tons Saved' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-hero"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                #1 EV Platform in the Region
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Powering the Future with{' '}
              <span className="text-gradient">Electric Vehicles</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Join the sustainable transportation revolution. Find nearby charging stations, 
              compare EV models, and book your charging slots in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/#stations">
                <Button variant="hero" size="lg" className="group">
                  <MapPin className="w-5 h-5" />
                  Find Charging Stations
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="heroOutline" size="lg">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-pulse" />
              
              {/* Main visual */}
              <div className="relative bg-card rounded-3xl p-8 shadow-lg border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                
                {/* EV Illustration */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center mb-6 shadow-glow animate-float">
                    <Zap className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-center mb-2">
                    Smart Charging
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Find & book charging stations near you
                  </p>
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                    <Battery className="w-8 h-8 text-accent" />
                  </div>
                  <div className="absolute bottom-8 left-8 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                    <Leaf className="w-7 h-7 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
