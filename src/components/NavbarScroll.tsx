import { useEffect, useState } from "react";

export default function NavbarScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const sections = ["hero-section", "how-it-works", "dashboard", "get-started"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    // Timeout ensures DOM is fully rendered before observing
    const timeout = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(0,0,0,0.15)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
        border: "none",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        fontFamily: "'Sora', sans-serif",
        fontWeight: 500,
        color: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      {/* Left — Logo + Nav Links */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {/* "A" logo circle */}
        <span
          onClick={() => scrollToSection("hero-section")}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            marginRight: "8px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L14 13H2L8 2Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="5" y1="9.5" x2="11" y2="9.5"
              stroke="white" strokeWidth="1.2" strokeLinecap="round"
            />
          </svg>
        </span>

        {[
          { label: "Home", id: "hero-section" },
          { label: "How it works", id: "how-it-works" },
          { label: "Dashboard", id: "dashboard" },
          { label: "Get Started", id: "get-started" },
        ].map((link) => {
          const isActive = activeSection === link.id;
          return (
          <span
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            style={{
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "inline-block",
              fontSize: "14px",
              position: "relative",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
              textShadow: isActive ? "0 0 12px rgba(255,255,255,0.3)" : "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLSpanElement).style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLSpanElement).style.transform = "translateX(0)";
            }}
          >
            {link.label}
            {/* Active indicator dot */}
            <span style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: isActive ? '#ffffff' : 'transparent',
              transition: 'background-color 0.2s ease'
            }} />
          </span>
        )})}
      </div>

      {/* Right — Brand name */}
      <span
        onClick={() => scrollToSection("hero-section")}
        style={{
          fontSize: "24px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          cursor: "pointer",
        }}
      >
        Askew
      </span>
    </nav>
  );
}
