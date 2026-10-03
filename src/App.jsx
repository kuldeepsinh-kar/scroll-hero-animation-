import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const statsRef = useRef(null);
  const visualRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================
      // INITIAL HERO ANIMATION
      // =========================================

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          eyebrowRef.current,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          }
        )
        .fromTo(
          headlineRef.current,
          {
            y: 90,
            opacity: 0,
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
          },
          "-=0.35"
        )
        .fromTo(
          statsRef.current,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.55"
        )
        .fromTo(
          visualRef.current,
          {
            opacity: 0,
            scale: 0.65,
            rotation: -20,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.3,
          },
          "-=1"
        )
        .fromTo(
          scrollRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.5"
        );

      // =========================================
      // ORBITAL FLOATING MOTION
      // =========================================

      gsap.to(visualRef.current, {
        y: 18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // =========================================
      // SCROLL-DRIVEN HERO ANIMATION
      // =========================================

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1400",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Headline slowly moves upward and becomes smaller
      scrollTimeline.to(
        headlineRef.current,
        {
          y: -100,
          scale: 0.82,
          opacity: 0.25,
          ease: "none",
          duration: 1,
        },
        0
      );

      // Eyebrow moves upward
      scrollTimeline.to(
        eyebrowRef.current,
        {
          y: -70,
          opacity: 0,
          ease: "none",
          duration: 0.7,
        },
        0
      );

      // Statistics move away
      scrollTimeline.to(
        statsRef.current,
        {
          y: 90,
          opacity: 0,
          ease: "none",
          duration: 0.9,
        },
        0.15
      );

      // Orbital visual becomes the main focus
      scrollTimeline.to(
        visualRef.current,
        {
          x: -90,
          scale: 1.45,
          rotation: 70,
          opacity: 0.65,
          ease: "none",
          duration: 1.2,
        },
        0
      );

      // Scroll indicator disappears
      scrollTimeline.to(
        scrollRef.current,
        {
          opacity: 0,
          y: 30,
          ease: "none",
          duration: 0.4,
        },
        0
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="page">

      {/* =========================================
          HERO
      ========================================= */}

      <section ref={heroRef} className="hero">

        {/* MAIN CONTENT */}

        <div className="hero-content">

          <div ref={eyebrowRef} className="eyebrow">
            DIGITAL EXPERIENCE
          </div>

          <h1 ref={headlineRef} className="headline">
            <span>WELCOME</span>
            <span>ITZ FIZZ</span>
          </h1>

          {/* STATISTICS */}

          <div ref={statsRef} className="stats">

            <div className="stat">
              <strong>92%</strong>

              <span>
                smoother digital
                <br />
                interaction
              </span>
            </div>

            <div className="stat">
              <strong>78%</strong>

              <span>
                stronger visual
                <br />
                engagement
              </span>
            </div>

            <div className="stat">
              <strong>64%</strong>

              <span>
                faster content
                <br />
                discovery
              </span>
            </div>

          </div>

          {/* SCROLL INDICATOR */}

          <div ref={scrollRef} className="scroll-indicator">
            <span>SCROLL</span>
            <div className="scroll-line"></div>
          </div>

        </div>

        {/* =========================================
            ORBITAL GRAPHIC
        ========================================= */}

        <div ref={visualRef} className="orbital">

          <div className="orbit orbit-1"></div>

          <div className="orbit orbit-2"></div>

          <div className="orbit orbit-3"></div>

          <div className="orbital-dot dot-top"></div>

          <div className="orbital-dot dot-right"></div>

          <div className="orbital-dot dot-left"></div>

          <div className="orb"></div>

        </div>

      </section>

      {/* =========================================
          NEXT SECTION
      ========================================= */}

      <section className="next-section">

        <div className="next-content">

          <span className="section-number">
            01
          </span>

          <h2>
            SCROLL
            <br />
            EXPERIENCE
          </h2>

          <p>
            Motion transforms the digital experience
            as the page moves.
          </p>

        </div>

      </section>

    </main>
  );
}

export default App;