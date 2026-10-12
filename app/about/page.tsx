"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Modal (Popup) States
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setErrorMsg('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
    <main style={{ paddingTop: '80px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .about-hero-img { width: 100%; height: 500px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); }
        .vision-card { padding: 40px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; height: 100%; }
        
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
          .about-hero-img { height: 350px; }
          .vision-card { padding: 30px 20px; }
          .modal-content { padding: 30px 20px; }
        }
      `}} />

      {/* --- Modal (Popup) Component --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}><i className="fa-solid fa-times"></i></button>
            <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Let&apos;s Work Together</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '25px' }}>
              Fill out the form below and I will get back to you within 24 hours.
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name or Company" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <input type="hidden" name="service" value="General Inquiry from About Page" />
              <textarea name="message" rows={4} placeholder="How can I help your business grow?" required></textarea>
              
              {errorMsg && <p style={{ color: '#ff5f56', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600 }}>{errorMsg}</p>}
              {isSuccess && <p style={{ color: '#00A859', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(0,168,89,0.1)', padding: '10px', borderRadius: '6px' }}>✅ Message sent successfully!</p>}
              
              <button type="submit" className="btn" style={{ width: '100%', padding: '16px' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Sending...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane"></i> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-dark" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="animate-fade-up">
              <span style={{ color: '#00A859', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block', marginBottom: '20px' }}>
                <i className="fa-solid fa-user-tie" style={{marginRight: '8px'}}></i> About Digital Habibur
              </span>
              <h1 style={{ textAlign: 'left', fontSize: '3.2rem', marginBottom: '20px' }}>Hi, I am <span className="text-gradient">Habibur Rahaman.</span></h1>
              <p style={{ fontSize: '1.15rem', color: '#a1a1aa', marginBottom: '20px' }}>
                I am a professional Full-Stack Web Developer based in <strong>Nabadwip, West Bengal</strong>. Operating under the brand name <strong>Digital Habibur</strong>, I specialize in engineering highly optimized custom WordPress solutions, lightweight plugins, and automated web applications.
              </p>
              <p style={{ fontSize: '1.15rem', color: '#a1a1aa', marginBottom: '40px' }}>
                My mission is simple: I do not sell templates. I sell digital solutions that solve operational bottlenecks, save time through automation, and scale your business revenue.
              </p>
              <div className="btn-group">
                <button onClick={openModal} className="btn"><i className="fa-solid fa-handshake"></i> Hire Me</button>
                <Link href="/portfolio" className="btn btn-dark">View My Work</Link>
              </div>
            </div>
            <div className="animate-fade-up delay-1">
              {/* Note: Ensure you have an image named about-profile.webp in your public folder, or use the existing one */}
              <img src="/about-1.webp" alt="Habibur Rahaman - Web Developer in Nabadwip" className="about-hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Core Values */}
      <section className="bg-subtle">
        <div className="container">
          <span className="section-subtitle" style={{ display: 'block', textAlign: 'center' }}>My Philosophy</span>
          <h2 className="section-title animate-fade-up">Why I Stand Out</h2>
          
          <div className="grid-2" style={{ marginTop: '50px' }}>
            <div className="vision-card animate-fade-up">
              <div className="icon-circle" style={{ width: '50px', height: '50px', fontSize: '1.2rem', marginBottom: '20px' }}><i className="fa-solid fa-code"></i></div>
              <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>100% Custom Engineering</h3>
              <p style={{ color: '#8b949e', lineHeight: '1.8' }}>
                The market is flooded with developers who simply install bloated readymade themes. That is not my approach. I write clean PHP, CSS, and Next.js code from scratch. This guarantees that your website is incredibly fast, highly secure, and tailored exactly to your brand.
              </p>
            </div>
            <div className="vision-card animate-fade-up delay-1">
              <div className="icon-circle" style={{ width: '50px', height: '50px', fontSize: '1.2rem', marginBottom: '20px' }}><i className="fa-solid fa-chart-line"></i></div>
              <h3 style={{ textAlign: 'left', marginBottom: '15px' }}>Business-First Mindset</h3>
              <p style={{ color: '#8b949e', lineHeight: '1.8' }}>
                I consider myself your growth partner, not just a coder. Whether I am building a travel CRM, an automated Google Sheets integration, or an e-commerce store, my primary focus is always on improving your ROI and reducing your manual workload.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack / Skillset */}
      <section className="bg-dark">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="animate-fade-up">
              <span className="section-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '15px' }}>My Arsenal</span>
              <h2 style={{ textAlign: 'left', marginBottom: '25px' }}>Technologies I Master</h2>
              <p style={{ color: '#8b949e', marginBottom: '30px', fontSize: '1.05rem' }}>
                Building robust systems requires the right set of tools. I stay updated with the latest technologies to ensure your project is built on modern, scalable architecture.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#e4e4e7' }}>Custom WordPress & PHP</span>
                    <span style={{ color: '#00A859', fontWeight: 700 }}>95%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '95%', height: '100%', background: 'linear-gradient(90deg, #00A859, #00d2ff)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#e4e4e7' }}>React & Next.js</span>
                    <span style={{ color: '#00A859', fontWeight: 700 }}>85%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #00A859, #00d2ff)' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#e4e4e7' }}>MySQL & API Integrations</span>
                    <span style={{ color: '#00A859', fontWeight: 700 }}>90%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '90%', height: '100%', background: 'linear-gradient(90deg, #00A859, #00d2ff)' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-up delay-1" style={{ paddingLeft: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <i className="fa-solid fa-code-branch text-green" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Clean Code</h4>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <i className="fa-solid fa-bolt text-green" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Fast Loading</h4>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <i className="fa-solid fa-shield-halved text-green" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Highly Secure</h4>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <i className="fa-solid fa-mobile-screen text-green" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem' }}>Responsive</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-subtle" style={{ padding: '60px 0', borderTop: '1px solid rgba(0,168,89,0.2)' }}>
        <div className="container animate-fade-up" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Let&apos;s Build Something Great</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            Ready to upgrade your digital presence? Whether you need a custom web application or an enterprise-level WordPress site, I am here to help.
          </p>
          <button onClick={openModal} className="btn" style={{ padding: '16px 35px', fontSize: '1.1rem' }}>
            Start A Conversation <i className="fa-solid fa-arrow-right" style={{ marginLeft: '10px' }}></i>
          </button>
        </div>
      </section>
      
    </main>
  );
}