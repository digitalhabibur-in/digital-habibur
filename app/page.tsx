"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Modal (Popup) States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
    setIsSuccess(false);
    setErrorMsg('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-JVa4GJpWx8isx1GJHmzZrE2CPIsiZ3dUkthhb7-UgYsclcphwUTpzfr96rJlYRk/exec';

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        // ৩ সেকেন্ড পর পপআপ অটোমেটিক বন্ধ হয়ে যাবে
        if(isModalOpen) {
          setTimeout(() => {
            closeModal();
          }, 3000);
        }
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <main style={{ overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* 🌟 FIX: Box will naturally wrap the image, no forced height, no gaps, no zoom */
        .responsive-img-box { 
            height: auto; 
            padding: 0 !important; /* Remove card padding so image touches borders */
            border: 1px solid rgba(255,255,255,0.05); 
            border-radius: 12px;
            overflow: hidden; 
            display: block; 
            background: transparent; 
        }
        
        /* 🌟 FIX: Image will take 100% width and adjust height automatically without cropping */
        .responsive-img-box img {
            width: 100%;
            height: auto;
            display: block;
        }

        .growth-img-box { height: 500px; padding: 0; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; display: flex; justify-content: center; align-items: center; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 80px; }
        .trusted-logos { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; opacity: 0.5; align-items: center; }
        
        /* Modal Popup Styles */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
          display: flex; justify-content: center; align-items: center; z-index: 9999;
          opacity: 0; animation: fadeIn 0.3s forwards;
        }
        .modal-content {
          width: 90%; max-width: 500px; padding: 40px; position: relative;
          background: #0a0a0c; border: 1px solid rgba(0,168,89,0.3);
          border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transform: translateY(20px); animation: slideUp 0.3s forwards;
        }
        .close-btn {
          position: absolute; top: 15px; right: 20px; background: none; border: none;
          color: #a1a1aa; font-size: 1.5rem; cursor: pointer; transition: 0.3s;
        }
        .close-btn:hover { color: #ff5f56; }
        
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes slideUp { to { transform: translateY(0); } }

        @media (max-width: 768px) {
          /* Mobile adjustments */
          .responsive-img-box { 
              width: 100%;
              margin: 0 auto 30px auto; 
          } 
          .growth-img-box { height: 300px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 50px; } 
          .trusted-logos { gap: 20px; } 
          .trusted-logos h3 { font-size: 1.2rem !important; } 
          .modal-content { padding: 30px 20px; }
        }
      `}} />

      {/* --- Modal (Popup) Component --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}><i className="fa-solid fa-times"></i></button>
            <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Project Inquiry</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '25px' }}>
              Service: <span style={{ color: '#00A859', fontWeight: 600 }}>{selectedService}</span>
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name or Company" required />
              <input type="email" name="email" placeholder="Email Address" required />
              
              {/* Hidden field for Service, so it sends automatically without being typed */}
              <input type="hidden" name="service" value={selectedService} />
              
              <textarea name="message" rows={4} placeholder="Tell me about your project..." required></textarea>
              
              {errorMsg && <p style={{ color: '#ff5f56', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600 }}>{errorMsg}</p>}
              {isSuccess && <p style={{ color: '#00A859', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(0,168,89,0.1)', padding: '10px', borderRadius: '6px' }}>✅ Message sent successfully!</p>}
              
              <button type="submit" className="btn" style={{ width: '100%', padding: '16px' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane"></i> Send Inquiry</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. Hero Section (SEO Optimized with Global & Local Keywords) */}
      <section className="hero bg-dark">
        <div className="hero-glow"></div>
        <div className="container hero-content animate-fade-up">
          <div className="grid-2">
            <div>
              <span style={{ color: '#00A859', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block', marginBottom: '20px', background: 'rgba(0,168,89,0.1)', padding: '6px 12px', borderRadius: '50px' }}>
                <i className="fa-solid fa-location-dot" style={{marginRight: '8px'}}></i> Best Web Developer in Nabadwip
              </span>
              <h1 style={{ fontSize: '3.2rem' }}>Digital Habibur: Custom Web & <span className="text-gradient">WordPress Solutions.</span></h1>
              <p style={{ fontSize: '1.15rem', marginBottom: '40px', color: '#a1a1aa' }}>
                I am Habibur Rahaman, a Full-Stack Developer specializing in high-performance WordPress sites, custom plugin development, WooCommerce, and business automation. Let&apos;s scale your brand globally.
              </p>
              
              <div className="btn-group">
                <a href="#contact" className="btn"><i className="fa-solid fa-bolt"></i> Start Your Project</a>
                <Link href="/portfolio" className="btn btn-dark">View Portfolio</Link>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '20px', background: 'rgba(10,10,12,0.8)', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '15px' }}>
                <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56'}}></div>
                <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e'}}></div>
                <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f'}}></div>
              </div>
              <pre style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: '1.6', overflowX: 'auto', paddingBottom: '10px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                <code style={{color: '#c678dd'}}>const</code> <code style={{color: '#61afef'}}>developer</code> = {'{'}<br/>
                &nbsp;&nbsp;brand: <code style={{color: '#98c379'}}>&apos;Digital Habibur&apos;</code>,<br/>
                &nbsp;&nbsp;expertise: [<code style={{color: '#98c379'}}>&apos;WordPress&apos;</code>, <code style={{color: '#98c379'}}>&apos;Plugins&apos;</code>, <code style={{color: '#98c379'}}>&apos;PHP&apos;</code>],<br/>
                &nbsp;&nbsp;location: <code style={{color: '#98c379'}}>&apos;Nabadwip, India&apos;</code>,<br/>
                &nbsp;&nbsp;solveProblem: <code style={{color: '#c678dd'}}>function</code>() {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<code style={{color: '#56b6c2'}}>return</code> <code style={{color: '#98c379'}}>&apos;Business Growth&apos;</code>;<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'};
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted By */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', background: '#050505' }}>
        <div className="container animate-fade-up" style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', fontWeight: 600 }}>Trusted by forward-thinking brands</p>
          <div className="trusted-logos">
            <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: 0, fontWeight: 800 }}>SNC <span className="text-green">UDYOG</span></h3>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: 0, fontWeight: 700, fontFamily: 'serif' }}>TATKA SABJI</h3>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: 0, fontWeight: 500, letterSpacing: '1px' }}>RUPAM TECH</h3>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', margin: 0, fontWeight: 800 }}>SAURABH</h3>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="bg-subtle">
        <div className="container">
          <div className="grid-2">
            
            <div className="glass-card animate-fade-up responsive-img-box">
                <img src="/about-1.webp" alt="Digital Habibur - Web Developer in Nabadwip" />
            </div>

            <div className="animate-fade-up delay-1">
              <span className="section-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '15px' }}>About Me</span>
              <h2 style={{ textAlign: 'left', marginBottom: '25px' }}>Top-Rated Web Developer in <span className="text-gradient">Nabadwip</span></h2>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>
                Operating under the brand <strong>Digital Habibur</strong>, I specialize in building custom web applications and advanced WordPress solutions. I do not rely on bloated readymade themes; I write clean, highly optimized code.
              </p>
              <p style={{ marginBottom: '30px', fontSize: '1.05rem' }}>
                Whether you need a custom WordPress plugin, a secure e-commerce store, or complex API integrations, my goal is to deliver digital solutions that directly increase your revenue.
              </p>
              <div className="btn-group">
                <a href="#contact" className="btn btn-dark">Discuss Your Needs <i className="fa-solid fa-arrow-right" style={{marginLeft: '8px'}}></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section */}
      <section id="services" className="bg-dark">
        <div className="container">
          <span className="section-subtitle" style={{ display: 'block', textAlign: 'center' }}>What I Do</span>
          <h2 className="section-title animate-fade-up">My Professional Services</h2>
          
          <div className="grid-3" style={{ marginTop: '50px' }}>
            <div className="glass-card animate-fade-up" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="icon-circle"><i className="fa-brands fa-wordpress"></i></div>
              <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Custom WordPress Sites</h3>
              <p style={{ flexGrow: 1, marginBottom: '25px' }}>Tailored, blazing-fast, and secure WordPress websites. No generic templates—built from scratch to fit your exact business needs.</p>
              <button onClick={() => openModal('Custom WordPress Sites')} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00A859', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }} className="hover-green">
                Discuss Project <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="glass-card animate-fade-up delay-1" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="icon-circle"><i className="fa-solid fa-code"></i></div>
              <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Plugin Development</h3>
              <p style={{ flexGrow: 1, marginBottom: '25px' }}>Avoid heavy third-party plugins. I engineer lightweight, custom WordPress plugins (ERP, Accounting, CRM) tailored to your logic.</p>
              <button onClick={() => openModal('Plugin Development')} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00A859', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }} className="hover-green">
                Discuss Project <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="glass-card animate-fade-up delay-2" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="icon-circle"><i className="fa-solid fa-cart-shopping"></i></div>
              <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>E-Commerce Solutions</h3>
              <p style={{ flexGrow: 1, marginBottom: '25px' }}>High-performance WooCommerce and custom online stores designed for smooth checkouts, high conversions, and easy management.</p>
              <button onClick={() => openModal('E-Commerce Solutions')} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00A859', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }} className="hover-green">
                Discuss Project <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="glass-card animate-fade-up delay-1" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="icon-circle"><i className="fa-solid fa-gears"></i></div>
              <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Workflow Automation</h3>
              <p style={{ flexGrow: 1, marginBottom: '25px' }}>Connect your website data directly to Google Sheets or your CRM. Stop manual data entry and automate your workflow securely.</p>
              <button onClick={() => openModal('Workflow Automation')} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#00A859', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }} className="hover-green">
                Discuss Project <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Experience & Milestones */}
      <section id="experience" className="bg-subtle">
        <div className="container">
          <div className="grid-2">
            <div className="animate-fade-up">
              <span className="section-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '15px' }}>My Journey</span>
              <h2 style={{ textAlign: 'left', marginBottom: '25px' }}>Professional <span className="text-gradient">Experience</span></h2>
              <p style={{ color: '#8b949e', marginBottom: '40px', fontSize: '1.05rem' }}>With years of hands-on experience in full-stack development, I have successfully delivered scalable solutions for agencies and enterprise clients.</p>
              
              <div className="timeline">
                <div className="timeline-item">
                  <span className="timeline-date">2024 - Present</span>
                  <h3 className="timeline-title">Senior Web Developer</h3>
                  <p className="timeline-desc">Digital Habibur • Developing enterprise-grade ERPs, automated CRMs, and highly optimized custom WordPress solutions.</p>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">2022 - 2024</span>
                  <h3 className="timeline-title">Freelance Full-Stack Engineer</h3>
                  <p className="timeline-desc">Collaborated with multiple B2B clients to streamline their data entry pipelines and build secure REST APIs.</p>
                </div>
                <div className="timeline-item">
                  <span className="timeline-date">2021 - 2022</span>
                  <h3 className="timeline-title">Frontend Developer</h3>
                  <p className="timeline-desc">Specialized in React, Next.js, and Tailwind CSS to build pixel-perfect, responsive user interfaces.</p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-up delay-1">
              <div className="glass-card" style={{ padding: '40px' }}>
                <h3 style={{ marginBottom: '25px', textAlign: 'center' }}>Technologies I Engineer With</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                  <span className="tech-pill"><i className="fa-brands fa-php text-green"></i> PHP (OOP)</span>
                  <span className="tech-pill"><i className="fa-brands fa-wordpress text-green"></i> WordPress/Elementor</span>
                  <span className="tech-pill"><i className="fa-brands fa-react text-green"></i> React & Next.js</span>
                  <span className="tech-pill"><i className="fa-solid fa-database text-green"></i> MySQL</span>
                  <span className="tech-pill"><i className="fa-brands fa-js text-green"></i> JavaScript (ES6+)</span>
                  <span className="tech-pill"><i className="fa-brands fa-css3 text-green"></i> Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Growth Partner */}
      <section className="bg-dark">
        <div className="container">
          <div className="grid-2">
            <div className="animate-fade-up">
              <span className="section-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '15px' }}>Why Choose Me</span>
              <h2 style={{ textAlign: 'left', marginBottom: '25px' }}>More Than A Developer — <br/><span className="text-gradient">Your Growth Partner</span></h2>
              <p style={{ marginBottom: '40px', fontSize: '1.05rem' }}>
                Many developers deliver a project and disappear. I believe in complete transparency and long-term success. I structure every project with the end-user in mind.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '25px', display: 'flex', gap: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,168,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><i className="fa-solid fa-1 text-green"></i></div>
                  <div>
                    <h4 style={{ marginBottom: '5px', fontSize: '1.1rem', color: '#fff' }}>Problem Solver Approach</h4>
                    <p style={{ fontSize: '0.95rem' }}>I analyze your business bottlenecks and build systems to resolve them efficiently.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,168,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><i className="fa-solid fa-2 text-green"></i></div>
                  <div>
                    <h4 style={{ marginBottom: '5px', fontSize: '1.1rem', color: '#fff' }}>Professional Handover</h4>
                    <p style={{ fontSize: '0.95rem' }}>Like my work with SNC UDYOG, every project comes with full documentation and backups.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card animate-fade-up delay-1 growth-img-box">
                <img src="/about-2.webp" alt="Digital Habibur Growth Partner" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Portfolio Section */}
      <section id="portfolio" className="bg-subtle">
        <div className="container">
          <span className="section-subtitle" style={{ display: 'block', textAlign: 'center' }}>Case Studies</span>
          <h2 className="section-title animate-fade-up">Real Results for Real Businesses</h2>

          <div className="grid-3" style={{ marginTop: '50px' }}>
            <div className="portfolio-card animate-fade-up">
              <div className="portfolio-img" style={{ overflow: 'hidden' }}>
                  <img src="/portfolio-1.webp" alt="Project 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '35px' }}>
                <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Enterprise ERP</span>
                <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Umrah Travel Management System</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '25px' }}>Engineered a robust custom plugin featuring automated wallet ledgers and secure KYC controls.</p>
                <Link href="/portfolio" style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover-green">View Project <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="portfolio-card animate-fade-up delay-1">
              <div className="portfolio-img" style={{ overflow: 'hidden' }}>
                  <img src="/portfolio-2.webp" alt="Project 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '35px' }}>
                <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Automation</span>
                <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Automated Subscription Sync</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '25px' }}>Developed a custom script ensuring real-time, secure data routing directly into Google Sheets.</p>
                <Link href="/portfolio" style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover-green">View Project <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>

            <div className="portfolio-card animate-fade-up delay-2">
              <div className="portfolio-img" style={{ overflow: 'hidden' }}>
                  <img src="/portfolio-3.webp" alt="Project 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '35px' }}>
                <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Web App</span>
                <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>SNC UDYOG Portal</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '25px' }}>Complete handover documentation and full backup archives for enterprise website management.</p>
                <Link href="/portfolio" style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover-green">View Project <i className="fa-solid fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Stats & Testimonial Combined */}
      <section className="bg-dark">
        <div className="container">
          <div className="stats-grid animate-fade-up">
            <div className="glass-card" style={{ padding: '30px 15px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem !important', background: 'linear-gradient(135deg, #00A859, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>5+</h2>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>Years Exp.</p>
            </div>
            <div className="glass-card" style={{ padding: '30px 15px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem !important', background: 'linear-gradient(135deg, #00A859, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>31+</h2>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>Projects</p>
            </div>
            <div className="glass-card" style={{ padding: '30px 15px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem !important', background: 'linear-gradient(135deg, #00A859, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>100%</h2>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>Satisfaction</p>
            </div>
            <div className="glass-card" style={{ padding: '30px 15px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem !important', background: 'linear-gradient(135deg, #00A859, #00d2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>24/7</h2>
              <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>Support</p>
            </div>
          </div>

          <div className="glass-card animate-fade-up delay-1" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto', borderTop: '2px solid #00A859' }}>
            <i className="fa-solid fa-quote-left text-green" style={{ fontSize: '2.5rem', opacity: 0.2, marginBottom: '20px' }}></i>
            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '30px', color: '#e4e4e7' }}>&quot;Habibur is not just a developer; he understands how businesses operate. He built a custom tool for us that completely eliminated our manual data entry process.&quot;</p>
            <div>
              <h4 style={{ marginBottom: '5px', fontSize: '1.1rem', color: '#fff' }}>Director</h4>
              <p style={{ color: '#00A859', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>SNC UDYOG</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="bg-subtle">
        <div className="container">
          <span className="section-subtitle" style={{ display: 'block', textAlign: 'center' }}>FAQ</span>
          <h2 className="section-title animate-fade-up">Frequently Asked Questions</h2>
          <div className="animate-fade-up delay-1" style={{ maxWidth: '800px', margin: '50px auto 0' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '15px' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fa-solid fa-plus text-green"></i> Do you use readymade templates?</h4>
              <p style={{ color: '#8b949e', margin: 0, paddingLeft: '28px' }}>No. Every project is custom-coded to ensure it meets your exact operational needs without unnecessary bloat or speed issues.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}><i className="fa-solid fa-plus text-green"></i> What happens after the project is done?</h4>
              <p style={{ color: '#8b949e', margin: 0, paddingLeft: '28px' }}>I provide complete handover documentation, full backup archives, and training so you have 100% control over your new digital asset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. General Contact Form (Footer Section) */}
      <section id="contact" className="bg-dark">
        <div className="container">
          <div className="glass-card animate-fade-up" style={{ padding: '60px 40px', background: 'linear-gradient(135deg, rgba(0,168,89,0.05) 0%, rgba(0,0,0,0) 100%)', borderTop: '1px solid rgba(0,168,89,0.2)' }}>
            <div className="grid-2">
              <div>
                <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Ready to Transform Your Workflow?</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '40px' }}>Let&apos;s build a custom solution that actually saves you time and scales your business. Fill out the form, and I&apos;ll get back to you within 24 hours.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="icon-circle" style={{ margin: 0, width: '45px', height: '45px', fontSize: '1.1rem' }}><i className="fa-solid fa-envelope"></i></div>
                    <div>
                      <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, margin: 0, color: '#a1a1aa' }}>Email</p>
                      <h4 style={{ fontSize: '1.05rem', margin: 0, color: '#00A859' }}>info@digitalhabibur.in</h4>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="icon-circle" style={{ margin: 0, width: '45px', height: '45px', fontSize: '1.1rem' }}><i className="fa-solid fa-phone"></i></div>
                    <div>
                      <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, margin: 0, color: '#a1a1aa' }}>Phone</p>
                      <h4 style={{ fontSize: '1.05rem', margin: 0, color: '#00A859' }}>+91 9332361219</h4>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div className="icon-circle" style={{ margin: 0, width: '45px', height: '45px', fontSize: '1.1rem' }}><i className="fa-solid fa-location-dot"></i></div>
                    <div>
                      <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, margin: 0, color: '#a1a1aa' }}>Location</p>
                      <h4 style={{ fontSize: '1.05rem', margin: 0, color: '#fff' }}>Nabadwip, Nadia, WB</h4>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name or Company" required />
                <input type="email" name="email" placeholder="Email Address" required />
                <input type="text" name="service" placeholder="Service Needed (e.g. CRM, Web App)" required />
                <textarea name="message" rows={4} placeholder="Tell me about your project..." required></textarea>
                
                {errorMsg && <p style={{ color: '#ff5f56', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600 }}>{errorMsg}</p>}
                {isSuccess && <p style={{ color: '#00A859', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(0,168,89,0.1)', padding: '10px', borderRadius: '6px' }}>✅ Message sent successfully!</p>}
                
                <button type="submit" className="btn" style={{ width: '100%', padding: '16px' }} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fa-solid fa-paper-plane"></i> Send Inquiry</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}