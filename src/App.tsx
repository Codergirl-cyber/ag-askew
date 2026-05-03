import NavbarScroll from './components/NavbarScroll'
import ShimmerHeroText from './components/ShimmerHeroText'
import MarqueeRail from './components/MarqueeRail'
import ClearView from './components/ClearView'
import Step01 from './components/Step_01'
import Step02 from './components/Step_02'
import Step03 from './components/Step_03'
import SignOff from './components/SignOff'
import BulletMarker from './components/BulletMarker'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'
import HoverImage from './components/HoverImage'

// Asset imports
import heroDashboard from './assets/fg-assets/Hero Dashboard.png'
import profitsSection from './assets/fg-assets/Profits Section.png'
import step01Img from './assets/fg-assets/Step 01 How It Works.png'
import step02Img from './assets/fg-assets/Step 02 How It Works.png'
import step03Img from './assets/fg-assets/Step 03 How It Works.png'

import cloud1 from './assets/bg-assets/cloud1.png'
import cloud2 from './assets/bg-assets/cloud2.png'
import clouds4 from './assets/bg-assets/clouds4.png'

function App() {
  return (
    <>
      {/* ── NAVBAR (fixed) ── */}
      <NavbarScroll />

      {/* ══════════════════════════════════════════════════════════════
          SECTION 01 — Hero  (animates on page load)
          ══════════════════════════════════════════════════════════════ */}
      <section id="hero-section" style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '120px', paddingBottom: '60px',
        gap: '48px',
        overflow: 'hidden',
      }}>
        {/* ── Hero cloud — left side, near text level ── */}
        <HoverImage src={cloud1} alt="" style={{
          position: 'absolute', top: '5%', left: '-12%',
          width: '55%', opacity: 0.55, zIndex: 0,
        }} />
        {/* ── Hero cloud — right side, upper ── */}
        <HoverImage src={cloud1} alt="" style={{
          position: 'absolute', top: '12%', right: '-20%',
          width: '45%', opacity: 0.45, zIndex: 0,
        }} />

        <ScrollReveal animateOnMount delay={0} distance={40} duration={800} style={{ position: 'relative', zIndex: 1 }}>
          <ShimmerHeroText />
        </ScrollReveal>

        <ScrollReveal animateOnMount delay={300} distance={50} duration={900} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '100%', maxWidth: '1100px',
            display: 'flex', justifyContent: 'center',
            padding: '0 40px',
          }}>
            <HoverImage
              src={heroDashboard}
              alt="Askew Dashboard Preview"
              style={{
                width: '100%', maxWidth: '1000px',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 02 — Marquee Rail + Profits  
          ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        {/* ── Section cloud ── */}
        <HoverImage src={cloud2} alt="" style={{
          position: 'absolute', top: '15%', left: '-18%',
          width: '40%', opacity: 0.35, zIndex: 0,
        }} />
        {/* ── Section cloud ── */}
        <HoverImage src={clouds4} alt="" style={{
          position: 'absolute', bottom: '-5%', right: '-25%',
          width: '55%', opacity: 0.3, zIndex: 0,
        }} />

        <ScrollReveal distance={20} duration={600} style={{ position: 'relative', zIndex: 1 }}>
          <MarqueeRail />
        </ScrollReveal>

        {/* Profits section — two-column (inspo 02) */}
        <div style={{
          width: '100%', maxWidth: '1200px',
          display: 'flex', alignItems: 'center', gap: '60px',
          padding: '60px 40px 0',
          flexWrap: 'wrap', justifyContent: 'space-between',
          position: 'relative', zIndex: 1,
        }}>
          <ScrollReveal delay={0} distance={40} style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'flex-start' }}>
            <HoverImage
              src={profitsSection}
              alt="Before and After Askew Profits"
              style={{
                width: '100%', maxWidth: '500px',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
              }}
            />
          </ScrollReveal>
          <ScrollReveal delay={150} distance={40} style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '16px',
            }}>
              <p style={{
                fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 400,
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.4, margin: 0,
              }}>
                Every Trade. Every Transaction.
              </p>
              <h2 style={{
                fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800,
                color: '#0a0a0a', lineHeight: 1.05, margin: 0,
              }}>
                Someone<br />Profits.
              </h2>
              <h3 style={{
                fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
                color: 'rgba(255,255,255,0.85)', lineHeight: 1.1, margin: 0,
              }}>
                Just not you.
              </h3>
              <p style={{
                fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 500,
                color: '#3b82f6', margin: 0,
              }}>
                Askew Changes That.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 03 — How It Works intro + Step 01
          ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '80px', paddingBottom: '80px',
        gap: '80px',
        overflow: 'hidden',
      }}>
        {/* ── Section cloud ── */}
        <HoverImage src={cloud1} alt="" style={{
          position: 'absolute', top: '25%', left: '-10%',
          width: '35%', opacity: 0.45, zIndex: 0,
          transform: 'scaleX(-1)',
        }} />

        {/* "Three Steps" intro block (inspo 03 top) */}
        <div style={{
          width: '100%', maxWidth: '1200px', padding: '0 40px',
          display: 'flex', gap: '60px', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 1,
        }}>
          <ScrollReveal delay={0} distance={36} style={{ flex: 1, minWidth: '300px' }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 800,
                color: '#0a0a0a', lineHeight: 1.05, margin: 0,
              }}>
                Three Steps.<br />
                <span style={{ color: '#ffffff' }}>Then it runs itself.</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100} distance={36} style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <p style={{
                fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 400,
                color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0,
              }}>
                Connect once and, earn forever. No monthly fees,
                no deposits, no subscriptions. Just passive
                cashback on everything you already do.
              </p>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px',
              }}>
                {['30+ supported platforms', 'No deposits required',
                  'Withdraw on your terms', 'Free forever'].map((item) => (
                    <span key={item} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.8)',
                    }}>
                      <BulletMarker /> {item}
                    </span>
                  ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Step 01 block (inspo 03 bottom) */}
        <div style={{
          width: '100%', maxWidth: '1200px', padding: '0 40px',
          display: 'flex', gap: '60px', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 1,
        }}>
          <ScrollReveal delay={0} distance={36} style={{ flex: '1', minWidth: '300px' }}>
            <Step01 />
          </ScrollReveal>
          <ScrollReveal delay={200} distance={44} style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'flex-end' }}>
            <HoverImage
              src={step01Img}
              alt="Step 01 – Sign Up"
              style={{
                width: '100%', maxWidth: '500px',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 04 — Step 02  
          ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '40px', paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        {/* ── Section cloud ── */}
        <HoverImage src={cloud2} alt="" style={{
          position: 'absolute', top: '10%', right: '-15%',
          width: '35%', opacity: 0.35, zIndex: 0,
        }} />

        <div style={{
          width: '100%', maxWidth: '1200px', padding: '0 40px',
          display: 'flex', gap: '60px', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 1,
        }}>
          <ScrollReveal delay={0} distance={44} style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'flex-start' }}>
            <HoverImage
              src={step02Img}
              alt="Step 02 – Connect Platforms"
              style={{
                width: '100%', maxWidth: '500px',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              }}
            />
          </ScrollReveal>
          <ScrollReveal delay={200} distance={36} style={{ flex: '1', minWidth: '300px' }}>
            <Step02 />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 05 — Step 03 
          ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '40px', paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        {/* ── Section cloud ── */}
        <HoverImage src={cloud1} alt="" style={{
          position: 'absolute', top: '20%', left: '-18%',
          width: '45%', opacity: 0.4, zIndex: 0,
        }} />

        <div style={{
          width: '100%', maxWidth: '1200px', padding: '0 40px',
          display: 'flex', gap: '60px', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 1,
        }}>
          <ScrollReveal delay={0} distance={36} style={{ flex: '1', minWidth: '300px' }}>
            <Step03 />
          </ScrollReveal>
          <ScrollReveal delay={200} distance={44} style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'flex-end' }}>
            <HoverImage
              src={step03Img}
              alt="Step 03 – Cashback"
              style={{
                width: '100%', maxWidth: '500px',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 06+07 — Dashboard (ClearView cards)
          ══════════════════════════════════════════════════════════════ */}
      <section id="dashboard" style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '80px', paddingBottom: '0px',
        gap: '40px',
        overflow: 'hidden',
      }}>
        {/* ── Section cloud ── */}
        <HoverImage src={clouds4} alt="" style={{
          position: 'absolute', top: '15%', right: '-12%',
          width: '55%', opacity: 0.3, zIndex: 0,
        }} />

        {/* Header text (inspo 06 top) */}
        <div style={{
          width: '100%', maxWidth: '1200px', padding: '0 40px',
          display: 'flex', gap: '40px', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', zIndex: 1,
        }}>
          <ScrollReveal delay={0} distance={32} style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{
                fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800,
                color: '#0a0a0a', lineHeight: 1.05, margin: 0,
              }}>
                Everything in<br />one place.
              </h2>
              <div style={{
                display: 'flex', gap: '24px', flexWrap: 'wrap',
              }}>
                {['Live Balances', 'Transparent activity', 'Forever referrals'].map((item) => (
                  <span key={item} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.65)',
                  }}>
                    <BulletMarker /> {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100} distance={28} style={{ flex: 1, minWidth: '300px', maxWidth: '480px' }}>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 400,
              color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0,
            }}>
              Track cashback, monitor activity across
              every platform, and withdraw all from a
              single dashboard.
            </p>
          </ScrollReveal>
        </div>

        {/* ClearView cards — inspo 06+07 */}
        <ScrollReveal delay={200} distance={40} duration={800} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex', justifyContent: 'center',
            padding: '0 20px',
          }}>
            <ClearView />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 08 — SignOff (Get Started CTA)
          ══════════════════════════════════════════════════════════════ */}
      <ScrollReveal distance={36} duration={800} style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'center',
        padding: '0px 20px',
      }}>
        <div style={{
          width: '100%', maxWidth: '1200px',
        }}>
          <SignOff />
        </div>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 09 — Footer (CTA + nav + copyright)
          ══════════════════════════════════════════════════════════════ */}
      <ScrollReveal distance={30} duration={800} style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'center',
        padding: '0px 20px',
      }}>
        <section id="get-started" style={{
          width: '100%', maxWidth: '1200px',
        }}>
          <Footer />
        </section>
      </ScrollReveal>
    </>
  )
}

export default App
