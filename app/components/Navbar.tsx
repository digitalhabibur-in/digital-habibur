"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Prevent Background Scrolling when Menu or Modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isModalOpen]);

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
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false); 
      }, 3000);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-menu-btn { display: none; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; transition: 0.3s; z-index: 1001; }
        
        .sidebar-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100dvh;
            background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
            z-index: 999; opacity: 0; visibility: hidden; transition: 0.3s ease;
        }
        .sidebar-overlay.active { opacity: 1; visibility: visible; }
        
        .sidebar-menu {
            position: fixed; top: 0; right: -100%; 
            width: 100%; max-width: 100%; 
            height: 100dvh;
            background: #0a0a0c; 
            z-index: 1000; padding: 60px 20px; 
            display: flex; flex-direction: column; align-items: center; 
            transition: 0.4s cubic-bezier(0.8, 0, 0.2, 1);
            overflow-y: auto;
        }
        .sidebar-menu.active { right: 0; }
        
        .sidebar-link {
            color: #a1a1aa; font-size: 1.3rem; font-weight: 600; padding: 12px 0;
            display: block; text-align: center; transition: 0.3s;
        }
        .sidebar-link:hover { color: #00A859; transform: scale(1.05); }

        .social-circle {
            width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.05);
            display: flex; justify-content: center; align-items: center; color: #e4e4e7;
            font-size: 1.2rem; transition: 0.3s; border: 1px solid rgba(255,255,255,0.1);
        }
        .social-circle:hover { background: rgba(0,168,89,0.1); color: #00A859; border-color: #00A859; transform: translateY(-3px); }

        @media (max-width: 768px) {
          .mobile-menu-btn { display: block; }
          .nav-links { display: none !important; }
        }
      `}} />

      <nav>
        <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              
              {/* 🌟 FIX: Updated SVG Logo (React CamelCase format) */}
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 168, 89, 0.4))' }}>
                <defs>
                  <linearGradient id="neonGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00A859" />
                    <stop offset="100%" stopColor="#00d2ff" />
                  </linearGradient>
                </defs>
                <polygon points="15,85 40,15 65,15 40,85" fill="url(#neonGradient)" opacity="0.9"/>
                <polygon points="55,85 80,15 100,15 75,85" fill="url(#neonGradient)" opacity="0.6"/>
                <polygon points="25,60 90,30 95,45 30,75" fill="url(#neonGradient)" />
              </svg>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff', letterSpacing: '1px', lineHeight: '1.2' }}>
                  DIGITAL <span style={{ color: '#00A859' }}>HABIBUR</span>
                </span>
                <span style={{ fontSize: '0.65rem', color: '#8b949e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2.5px', marginTop: '2px' }}>
                  We Build Your Success
                </span>
              </div>

            </Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/contact">Contact</Link>
            
            <button onClick={() => setIsModalOpen(true)} className="btn" style={{ padding: '8px 24px', fontSize: '0.95rem', borderRadius: '50px' }}>
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`sidebar-overlay \${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      {/* Mobile Slide-out Menu (Full Screen) */}
      <div className={`sidebar-menu \${isMobileMenuOpen ? 'active' : ''}`}>
        
        <button onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'absolute', top: '20px', right: '25px', background: 'none', border: 'none', color: '#a1a1aa', fontSize: '2rem', cursor: 'pointer' }}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Original Profile Image in Mobile Menu */}
        <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #00A859', padding: '3px', margin: '0 auto 15px', overflow: 'hidden' }}>
            <img src="/about-1.webp" alt="Habibur Rahaman" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '5px' }}>Habibur Rahaman</h3>
          <p style={{ color: '#00A859', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Web Developer</p>
        </div>

        {/* Links perfectly centered */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '25px 0', margin: '0' }}>
          <Link href="/" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/services" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link href="/portfolio" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
          <Link href="/contact" className="sidebar-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', width: '100%', maxWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px' }}>
            <a href="https://wa.me/919332361219" target="_blank" className="social-circle"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="#" className="social-circle"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="social-circle"><i className="fa-brands fa-github"></i></a>
          </div>

          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <i className="fa-solid fa-envelope text-green"></i> info@digitalhabibur.in
          </p>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <i className="fa-solid fa-phone text-green"></i> +91 9332361219
          </p>
          
          <button 
            onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} 
            className="btn" 
            style={{ width: '100%', padding: '16px', fontSize: '1.05rem', justifyContent: 'center', borderRadius: '8px' }}
          >
            Hire Me <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
          </button>
        </div>
      </div>

      {/* Popup Form (Modal) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <h3 style={{ marginBottom: '10px', fontSize: '1.5rem', color: '#fff', textAlign: 'center' }}>Let's Start Your Project</h3>
            <p style={{ color: '#8b949e', fontSize: '0.95rem', marginBottom: '25px', textAlign: 'center' }}>Fill out the form below. The details will be sent directly to my database.</p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name or Company" required style={{ padding: '12px', marginBottom: '15px' }} />
              <input type="email" name="email" placeholder="Email Address" required style={{ padding: '12px', marginBottom: '15px' }} />
              <input type="text" name="service" placeholder="Service Needed" required style={{ padding: '12px', marginBottom: '15px' }} />
              <textarea name="message" rows={4} placeholder="Project Details..." required style={{ padding: '12px', marginBottom: '15px' }}></textarea>
              
              {errorMsg && <p style={{ color: '#ff5f56', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>{errorMsg}</p>}
              {isSuccess && <p style={{ color: '#00A859', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(0,168,89,0.1)', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>✅ Sent successfully!</p>}
              
              <button type="submit" className="btn" style={{ width: '100%', padding: '14px' }} disabled={isSubmitting}>
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
    </>
  );
}