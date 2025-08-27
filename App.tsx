import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Phone, Instagram, Mail, Star, Sparkles, Loader, Award, Trophy, Heart, Send, Menu, X, Quote, Lock, Trash2, PlusCircle, Copy, Check } from "lucide-react";
import { NavLinkItem, GalleryItem, ServiceItem, TestimonialItem } from './types.ts';
import { palette, navLinks, galleryItems, serviceItems, testimonialItems, imagePaths } from './constants.ts';

// --- STYLES, ANIMATIONS & HOOKS ---

const Preloader = () => {
    const textVariants: Variants = {
        hidden: { pathLength: 0, fill: "rgba(209, 176, 126, 0)" },
        visible: {
            pathLength: 1,
            fill: "rgba(209, 176, 126, 1)",
            transition: {
                pathLength: { duration: 2, ease: "easeInOut" },
                fill: { duration: 1.5, ease: [0.1, 0, 0.3, 1], delay: 1 }
            }
        }
    };
    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: palette.background }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <motion.svg width="250" height="120" viewBox="0 0 250 120" initial="hidden" animate="visible">
                <motion.text
                    x="50%"
                    y="50%"
                    dy=".35em"
                    textAnchor="middle"
                    fontFamily="Vazirmatn, sans-serif"
                    fontSize="70"
                    fontWeight="bold"
                    stroke={palette.primary}
                    strokeWidth="1"
                    variants={textVariants}
                >
                    کیک‌آرت
                </motion.text>
            </motion.svg>
        </motion.div>
    );
};


const SiteBackground = () => (
    <>
      <style>{`
        /* Masonry Layout */
        .masonry-grid {
          column-count: 1;
          column-gap: 2rem;
        }
        @media (min-width: 640px) {
          .masonry-grid { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 3; }
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 2rem;
        }

        /* Floating Label Input */
        .floating-label-group {
          position: relative;
        }
        .floating-label-input {
          padding-top: 1.5rem;
          background-color: transparent;
        }
        .floating-label {
          position: absolute;
          top: 1rem;
          right: 0.75rem;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          pointer-events: none;
          transform-origin: right;
          color: ${palette.textSecondary};
        }
        .floating-label-input:focus ~ .floating-label,
        .floating-label-input:not(:placeholder-shown):not([value=""]) ~ .floating-label {
          transform: translateY(-0.85rem) scale(0.85);
          color: ${palette.primary};
        }
        
        /* Animated Gradient BG */
        @keyframes subtle-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-bg {
          background: linear-gradient(270deg, ${palette.background}, #1a1a1a, ${palette.background});
          background-size: 200% 200%;
          animation: subtle-gradient 30s ease infinite;
        }
      `}</style>
      <div className="fixed inset-0 -z-20 animated-gradient-bg" />
    </>
);

const subtleLiftHover = {
    y: -5,
    borderColor: palette.primary,
    boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2)`,
};

function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sectionIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sectionIds]);

    return activeSection;
}

// --- CORE COMPONENTS ---

const Section = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string; }) => (
  <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 ${className}`}>
    {children}
  </section>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string; }) => (
  <motion.div
    className={`rounded-xl p-6 relative overflow-hidden border ${className}`}
    style={{ background: palette.surface, borderColor: palette.border }}
    whileHover={subtleLiftHover}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const PillButton = ({ children, onClick, selected = false, className = "" } : { children: React.ReactNode, onClick: () => void, selected?: boolean, className?: string }) => (
    <motion.button
        onClick={onClick}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${className}`}
        style={{
            background: selected ? palette.primary : 'transparent',
            color: selected ? palette.background : palette.textPrimary,
            border: `1px solid ${selected ? palette.primary : palette.border}`,
        }}
        whileHover={{ y: -3, scale: 1.05, background: selected ? palette.primary: palette.border }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        {children}
    </motion.button>
);

// --- HEADER ---
const Header = ({ activeSection } : { activeSection: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Logo = () => (
    <a href="#home" className="flex items-center gap-3 group">
      <div 
        className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]"
        style={{filter: `drop-shadow(0 0 6px ${palette.primary})`}}
      >
        🎂
      </div>
      <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent" style={{backgroundImage: `linear-gradient(to right, ${palette.primary}, #EAEAEA)`}}>
          کیک‌آرت
      </span>
    </a>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={isScrolled ? { background: `${palette.surface}e6`, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: `1px solid ${palette.border}` } : {}}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        <Logo />
        <div className="hidden md:flex items-center gap-x-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors relative"
              style={{color: palette.textPrimary}}
            >
              {link.label}
              {activeSection === link.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: palette.primary }}
                    layoutId="active-nav-link"
                  />
              )}
            </a>
          ))}
        </div>
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                {isMenuOpen ? <X color={palette.textPrimary} /> : <Menu color={palette.textPrimary} />}
            </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
                style={{ background: palette.surface, borderBottom: `1px solid ${palette.border}` }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium"
                            style={{color: palette.textPrimary, background: activeSection === link.href.substring(1) ? palette.border : 'transparent' }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- SECTION COMPONENTS ---

const SectionTitle = ({ icon: Icon, title, subtitle }: { icon: React.ElementType, title: string, subtitle: string }) => (
  <div className="text-center mb-16">
      <motion.div 
          className="inline-flex items-center justify-center p-3 rounded-full border-2 mb-4" 
          style={{ borderColor: palette.primary }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
      >
          <Icon className="w-8 h-8" style={{ color: palette.primary }} />
      </motion.div>
      <motion.h2 
          className="text-4xl md:text-5xl font-black tracking-tight" 
          style={{ color: palette.textPrimary }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
      >
          {title}
      </motion.h2>
      <motion.p 
          className="mt-4 max-w-2xl mx-auto text-lg" 
          style={{color: palette.textSecondary}}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
      >
        {subtitle}
      </motion.p>
  </div>
);

const PrimaryButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <motion.a 
        href={href}
        className="mt-10 inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold shadow-lg"
        style={{ background: palette.primary, color: palette.background, boxShadow: `0 8px 15px -4px ${palette.primary}44` }}
        whileHover={{ scale: 1.05, boxShadow: `0 10px 20px -4px ${palette.primary}66`, y: -3, background: `linear-gradient(45deg, ${palette.primary}, #EAC793)`}}
        whileTap={{ scale: 0.95 }}
    >
        {children}
    </motion.a>
);

const AnimatedTextWord = ({ text, el: Wrapper = 'h1', className = "", style }: { text: string; el?: keyof JSX.IntrinsicElements; className?: string; style?: React.CSSProperties }) => {
    const words = text.split(" ");
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };
    const wordVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 },
        },
    };
    return (
        <Wrapper className={className} style={style}>
            <motion.span variants={containerVariants} initial="hidden" animate="visible">
                {words.map((word, i) => (
                    <motion.span key={i} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    );
};


const Home = () => {
    return (
        <Section id="home" className="min-h-screen flex items-center !pt-32 md:!pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16 items-center">
                <motion.div 
                    className="text-center md:text-right"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                >
                    <AnimatedTextWord text="کیک‌آرت فرزین" el="h1" className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight" style={{color: palette.textPrimary}} />
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-4 text-2xl md:text-3xl font-bold bg-clip-text text-transparent" style={{backgroundImage: `linear-gradient(to left, ${palette.primary}, ${palette.textSecondary})`}}>
                        هنر کیک، با الهام از رویاها
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 1, duration: 0.5 }} className="mt-6 text-lg leading-relaxed max-w-xl mx-auto md:mx-0" style={{color: palette.textSecondary}}>
                        من فرزین هستم، هنرمند و طراح کیک‌های سفارشی. هر کیک، داستانی است از طعم و زیبایی که برای شیرین‌تر کردن لحظات خاص شما خلق می‌شود.
                    </motion.p>
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} transition={{ delay: 1.2, duration: 0.5 }}>
                        <PrimaryButton href="#portfolio">
                            <Award />
                            نمونه کارهای من را ببینید
                        </PrimaryButton>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    <div
                        className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square rounded-2xl overflow-hidden"
                        style={{
                            filter: `drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.5))`
                        }}
                    >
                        <img
                            src={imagePaths.hero}
                            alt="فرزین هنرمند کیک در کنار یکی از کیک‌های هنری خود"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </motion.div>
            </div>
        </Section>
    )
};

const About = () => (
  <Section id="about">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="!p-0"
      >
        <img src={imagePaths.about} alt="فرزین، هنرمند کیک" className="rounded-xl object-cover w-full h-full shadow-2xl shadow-black/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h2 className="text-4xl font-extrabold mb-4" style={{color: palette.textPrimary}}>درباره من</h2>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent mb-6" style={{backgroundImage: `linear-gradient(to right, ${palette.primary}, ${palette.textSecondary})`}}>فرزین، معمار رویاهای شیرین</h3>
        <p className="leading-relaxed mb-4" style={{color: palette.textSecondary}}>
          سلام! من فرزین هستم، هنرمندی که بوم نقاشی‌اش، کیک و رنگ‌هایش، طعم‌های رویایی است. از کودکی به هنر و شیرینی‌پزی علاقه داشتم و همیشه آرزو داشتم بتوانم زیبایی و طعم را با هم ترکیب کنم. امروز، این رویا را در قالب کیک‌های هنری و سفارشی به واقعیت تبدیل می‌کنم.
        </p>
        <p className="leading-relaxed" style={{color: palette.textSecondary}}>
          هر کیک برای من یک اثر هنری منحصر به فرد است. با استفاده از بهترین مواد اولیه و تکنیک‌های خلاقانه، آثاری خلق می‌کنم که نه تنها چشم‌ها را خیره می‌کنند، بلکه ذائقه شما را نیز به یک تجربه به‌یادماندنی دعوت می‌کنند.
        </p>
      </motion.div>
    </div>
  </Section>
);

const Lightbox = ({ src, onClose }: { src: string; onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
        <motion.img
            layoutId={src}
            src={src}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
        />
        <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 text-white bg-black/50 rounded-full p-2"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
        >
            <X size={24} />
        </motion.button>
    </motion.div>
);

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState("همه");
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const tags = ["همه", ...new Set(galleryItems.map(item => item.tag))];
    const filteredItems = activeFilter === "همه" ? galleryItems : galleryItems.filter(item => item.tag === activeFilter);

    return (
        <>
            <Section id="portfolio">
                <SectionTitle icon={Award} title="نمونه کارهای من" subtitle="گالری از کیک‌های هنری و خاص" />
                <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {tags.map(tag => (
                        <PillButton key={tag} onClick={() => setActiveFilter(tag)} selected={activeFilter === tag}>
                            {tag}
                        </PillButton>
                    ))}
                </div>
                <div className="masonry-grid">
                  {filteredItems.map((item) => (
                     <motion.div
                          key={item.src}
                          className="masonry-item"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5 }}
                          onClick={() => setSelectedImg(item.src)}
                      >
                          <Card className="group !p-0">
                              <div className="overflow-hidden rounded-t-xl relative">
                                <motion.img layoutId={item.src} src={item.src} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                              <div className="p-5">
                                  <h3 className="text-xl font-bold" style={{color: palette.textPrimary}}>{item.title}</h3>
                                  <span className="text-sm font-semibold mt-1 inline-block px-3 py-1 rounded-full text-black" style={{ background: palette.primary }}>{item.tag}</span>
                              </div>
                          </Card>
                     </motion.div>
                  ))}
                </div>
            </Section>
            <AnimatePresence>
                {selectedImg && <Lightbox src={selectedImg} onClose={() => setSelectedImg(null)} />}
            </AnimatePresence>
        </>
    );
};

const Services = () => {
  const icons = [Trophy, Award, Heart];
  const containerVariants = {
      hidden: { opacity: 0 },
      show: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
      }
  };
  const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  return (
    <Section id="services">
      <SectionTitle icon={Trophy} title="خدمات کیک سفارشی" subtitle="سرویس‌هایی برای تبدیل رویاهای شما به واقعیت‌های شیرین" />
      <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
      >
        {serviceItems.map((service, index) => (
          <motion.div key={service.name} variants={itemVariants}>
            <ServiceCard service={service} icon={icons[index % icons.length]} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

const ServiceCard = ({ service, icon: Icon }: { service: ServiceItem, icon: React.ElementType }) => (
    <Card className="h-full flex flex-col text-center">
        <Icon className="w-12 h-12 mx-auto" style={{ color: palette.primary, filter: `drop-shadow(0 0 8px ${palette.primary}55)` }} />
        <h3 className="text-2xl font-bold mt-6 mb-2" style={{color: palette.textPrimary}}>{service.name}</h3>
        <p className="text-lg font-semibold mb-6" style={{color: palette.primary}}>{service.price}</p>
        <ul className="space-y-3 flex-grow text-right" style={{color: palette.textSecondary}}>
            {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                    <Star className="w-4 h-4 mt-1 shrink-0" style={{ color: palette.primary }} />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <motion.a
            href="#contact"
            className="mt-8 inline-block px-8 py-3 rounded-full text-md font-bold"
            style={{ background: 'transparent', border: `1px solid ${palette.primary}`, color: palette.primary }}
            whileHover={{ scale: 1.05, background: palette.primary, color: palette.background }}
            whileTap={{ scale: 0.95 }}
        >
            مشاوره و سفارش
        </motion.a>
    </Card>
);

const Testimonials = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
          opacity: 1,
          transition: { staggerChildren: 0.2 }
      }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };
    return (
        <Section id="testimonials">
            <SectionTitle icon={Heart} title="نظرات مشتریان" subtitle="آنچه مشتریان عزیز درباره ما می‌گویند" />
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
            >
                {testimonialItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <TestimonialCard item={item} />
                  </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};

const TestimonialCard = ({ item }: { item: TestimonialItem }) => (
  <Card className="h-full flex flex-col justify-between">
    <Quote className="absolute top-4 right-4 opacity-5 text-6xl" style={{color: palette.primary}} />
    <div className="flex-grow z-10">
        <p className="italic mb-4" style={{color: palette.textSecondary}}>"{item.text}"</p>
    </div>
    <div className="mt-4 pt-4 border-t z-10" style={{ borderColor: palette.border }}>
        <p className="font-bold" style={{color: palette.textPrimary}}>{item.name}</p>
        <p className="text-sm" style={{color: palette.primary}}>{item.role}</p>
    </div>
  </Card>
);

const FloatingLabelInput = ({ type, name, id, placeholder, required = false, value, onChange }: {type: string; name: string; id: string; placeholder: string; required?: boolean; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) => (
    <div className="floating-label-group">
        <input 
            type={type} 
            name={name} 
            id={id} 
            required={required}
            placeholder=" "
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border-2 focus:ring-0 transition-colors outline-none p-3 rounded-xl floating-label-input" 
            style={{borderColor: palette.border, color: palette.textPrimary, '--tw-ring-color': palette.primary} as React.CSSProperties}
            onFocus={(e) => e.target.style.borderColor = palette.primary}
            onBlur={(e) => e.target.style.borderColor = palette.border}
        />
        <label htmlFor={id} className="floating-label">{placeholder}</label>
    </div>
);

const FloatingLabelTextarea = ({ name, id, placeholder, required = false, rows = 4 }: {name: string; id: string; placeholder: string; required?: boolean; rows?: number}) => (
    <div className="floating-label-group">
        <textarea 
            name={name} 
            id={id} 
            required={required} 
            rows={rows}
            placeholder=" " 
            className="w-full bg-transparent border-2 focus:ring-0 transition-colors outline-none p-3 rounded-xl floating-label-input" 
            style={{borderColor: palette.border, color: palette.textPrimary, '--tw-ring-color': palette.primary} as React.CSSProperties}
            onFocus={(e) => e.target.style.borderColor = palette.primary}
            onBlur={(e) => e.target.style.borderColor = palette.border}
        ></textarea>
        <label htmlFor={id} className="floating-label">{placeholder}</label>
    </div>
);


const Contact = () => {
    const [status, setStatus] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('در حال ارسال...');
        // Mock form submission
        setTimeout(() => {
            const form = e.target as HTMLFormElement;
            form.reset();
            setStatus('پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.');
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    return (
        <Section id="contact">
            <SectionTitle icon={Send} title="تماس با ما" subtitle="برای مشاوره و ثبت سفارش، با من در ارتباط باشید" />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
            >
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FloatingLabelInput type="text" name="name" id="name" required placeholder="نام شما" />
                            <FloatingLabelInput type="email" name="email" id="email" required placeholder="ایمیل شما" />
                        </div>
                        <div>
                            <FloatingLabelTextarea name="message" id="message" required placeholder="پیام شما (نوع مراسم، تعداد مهمانان و...)" />
                        </div>
                        <div className="text-center">
                            <motion.button
                                type="submit"
                                className="px-12 py-4 rounded-full text-lg font-bold shadow-lg"
                                style={{ background: palette.primary, color: palette.background, boxShadow: `0 8px 15px -4px ${palette.primary}44` }}
                                whileHover={{ scale: 1.05, boxShadow: `0 10px 20px -4px ${palette.primary}66`}}
                                whileTap={{ scale: 0.95 }}
                            >
                                ارسال پیام
                            </motion.button>
                        </div>
                        {status && <p className="text-center mt-4" style={{color: status.includes('موفقیت') ? palette.primary : palette.textSecondary}}>{status}</p>}
                    </form>
                </Card>
            </motion.div>
        </Section>
    );
};

const Footer = () => (
    <footer className="w-full" style={{background: palette.surface, borderTop: `1px solid ${palette.border}`}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{color: palette.textPrimary}}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-2">
                         <span className="text-2xl">🎂</span>
                         <h3 className="font-bold text-xl">کیک‌آرت</h3>
                    </div>
                    <p style={{color: palette.textSecondary}}>خلق طعم‌های رویایی، با عشق</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold text-lg mb-2">لینک‌های سریع</h4>
                    <a href="#about" className="transition-opacity hover:opacity-75 mt-1" style={{color: palette.textSecondary}}>درباره من</a>
                    <a href="#portfolio" className="transition-opacity hover:opacity-75 mt-1" style={{color: palette.textSecondary}}>نمونه کارها</a>
                    <a href="#services" className="transition-opacity hover:opacity-75 mt-1" style={{color: palette.textSecondary}}>خدمات</a>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h4 className="font-bold text-lg mb-2">ارتباط با من</h4>
                    <div className="flex gap-4 justify-center md:justify-start">
                      <motion.a href="#" style={{color: palette.textSecondary}} whileHover={{ scale: 1.2, color: palette.primary }} whileTap={{ scale: 0.9 }}><Instagram /></motion.a>
                      <motion.a href="tel:+" style={{color: palette.textSecondary}} whileHover={{ scale: 1.2, color: palette.primary }} whileTap={{ scale: 0.9 }}><Phone /></motion.a>
                      <motion.a href="mailto:" style={{color: palette.textSecondary}} whileHover={{ scale: 1.2, color: palette.primary }} whileTap={{ scale: 0.9 }}><Mail /></motion.a>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm" style={{borderColor: palette.border, color: palette.textSecondary}}>
                <p>&copy; {new Date().getFullYear()} کیک‌آرت. تمام حقوق محفوظ است.</p>
            </div>
        </div>
    </footer>
);


// --- ADMIN PAGE COMPONENT ---
const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [items, setItems] = useState<GalleryItem[]>(galleryItems);
    const [newItem, setNewItem] = useState({ src: 'assets/', title: '', tag: '' });
    const [copied, setCopied] = useState(false);

    const ADMIN_PASSWORD = "cake-admin-2024"; // Simple hardcoded password

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('رمز عبور اشتباه است.');
        }
    };

    const handleAddItem = () => {
        if (newItem.src.trim() && newItem.src.trim() !== 'assets/' && newItem.title.trim() && newItem.tag.trim()) {
            setItems([...items, newItem]);
            setNewItem({ src: 'assets/', title: '', tag: '' });
        } else {
            alert('لطفا تمام فیلدها را پر کنید.');
        }
    };

    const handleDeleteItem = (src: string) => {
        setItems(items.filter(item => item.src !== src));
    };

    const generatedCode = `export const galleryItems: GalleryItem[] = ${JSON.stringify(items, null, 2)};`;
    
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4" style={{ background: palette.background, color: palette.textPrimary }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
                    <Card>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="text-center">
                                <Lock className="w-12 h-12 mx-auto" style={{ color: palette.primary }}/>
                                <h2 className="text-2xl font-bold mt-4">ورود به پنل مدیریت</h2>
                                <p className="mt-2" style={{color: palette.textSecondary}}>لطفا رمز عبور را وارد کنید.</p>
                            </div>
                            <FloatingLabelInput 
                                type="password" 
                                name="password" 
                                id="password"
                                placeholder="رمز عبور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
                            <motion.button
                                type="submit"
                                className="w-full px-8 py-3 rounded-full font-bold"
                                style={{ background: palette.primary, color: palette.background }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ورود
                            </motion.button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-8" style={{ background: palette.background, color: palette.textPrimary }}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center" style={{color: palette.primary}}>پنل مدیریت گالری</h1>
                
                <Card className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">افزودن عکس جدید</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <FloatingLabelInput type="text" name="src" id="src" placeholder="مسیر عکس (مثال: assets/cake.jpg)" value={newItem.src} onChange={(e) => setNewItem({...newItem, src: e.target.value })} />
                        <FloatingLabelInput type="text" name="title" id="title" placeholder="عنوان عکس" value={newItem.title} onChange={(e) => setNewItem({...newItem, title: e.target.value })} />
                        <FloatingLabelInput type="text" name="tag" id="tag" placeholder="تگ (مثال: عروسی)" value={newItem.tag} onChange={(e) => setNewItem({...newItem, tag: e.target.value })} />
                        <motion.button onClick={handleAddItem} className="px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2" style={{ background: palette.primary, color: palette.background }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <PlusCircle size={20} />
                            افزودن
                        </motion.button>
                    </div>
                </Card>

                <h2 className="text-2xl font-bold mb-4 mt-8">عکس‌های فعلی</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {items.map(item => (
                        <Card key={item.src} className="!p-0 relative group">
                            <img src={item.src} alt={item.title} className="w-full h-48 object-cover rounded-t-xl" />
                            <div className="p-4">
                                <h3 className="font-bold truncate">{item.title}</h3>
                                <p style={{color: palette.textSecondary}}>{item.tag}</p>
                            </div>
                            <motion.button onClick={() => handleDeleteItem(item.src)} className="absolute top-2 right-2 bg-red-600/80 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ scale: 1.1, background: 'rgb(220 38 38)'}} whileTap={{scale: 0.9}}>
                                <Trash2 size={18} />
                            </motion.button>
                        </Card>
                    ))}
                </div>

                <Card className="mt-8">
                    <h2 className="text-2xl font-bold mb-2">کد جدید برای آپدیت سایت</h2>
                    <p className="mb-4" style={{color: palette.textSecondary}}>
                        مرحله ۱: عکس‌های جدید را در پوشه `assets` پروژه خود آپلود کنید.
                        <br/>
                        مرحله ۲: کد زیر را کپی کرده و در فایل `constants.ts`، به طور کامل جایگزین محتوای `galleryItems` فعلی کنید.
                    </p>
                    <div className="relative">
                        <textarea readOnly value={generatedCode} className="w-full h-64 p-4 rounded-xl font-mono text-sm" style={{ background: palette.background, border: `1px solid ${palette.border}`, color: palette.textSecondary, direction: 'ltr' }} />
                        <motion.button onClick={handleCopy} className="absolute top-3 right-3 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors" style={{ background: copied ? '#4ade80' : palette.primary, color: palette.background }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                           {copied ? <Check size={18} /> : <Copy size={18} />}
                           {copied ? 'کپی شد!' : 'کپی کن'}
                        </motion.button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const PortfolioSite = () => {
  const sectionIds = navLinks.map(link => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    document.body.style.backgroundColor = palette.background;
    const timer = setTimeout(() => setLoading(false), 2500); // Increased preloader time for new animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: palette.background, color: palette.textPrimary }}>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      {!loading && (
        <>
          <SiteBackground />
          <Header activeSection={activeSection} />
          <main>
            <Home />
            <About />
            <Portfolio />
            <Services />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Set initial route

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (route === '#/admin') {
    document.body.style.backgroundColor = palette.background;
    return (
      <>
        <SiteBackground />
        <AdminPage />
      </>
    );
  }

  return <PortfolioSite />;
}