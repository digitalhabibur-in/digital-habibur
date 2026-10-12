"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
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
        
        .service-detail-card {
          padding: 50px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05); border-radius: 16px;
          margin-bottom: 40px; transition: 0.3s;
        }
        .service-detail-card:hover {
          border-color: rgba(0,168,89,0.3); background: rgba(0,168,89,0.02);
        }
        
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes slideUp { to { transform: translateY(0); } }

        @media (max-width: 768px) {
          .modal-content { padding: 30px 20px; }
          .service-detail-card { padding: 30px 20px; }
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
              <input type="hidden" name="service" value={selectedService} />
              <textarea name="message" rows={4} placeholder="Tell me about your specific requirements..." required></textarea>
              
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

      {/* Page Header */}
      <section className="bg-dark" style={{ padding: '80px 0 40px', textAlign: 'center' }}>
        <div className="container animate-fade-up">
          <span style={{ color: '#00A859', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block', marginBottom: '20px' }}>
            What I Do Best
          </span>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Digital <span className="text-gradient">Services</span></h1>
          <p style={{ color: '#a1a1aa', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>
            I do not build generic websites. I engineer digital solutions that solve real business problems, reduce manual work, and drive online sales.
          </p>
        </div>
      </section>

      {/* Detailed Services List */}
      <section className="bg-subtle">
        <div className="container">
          
          {/* Service 1 */}
          <div className="service-detail-card animate-fade-up">
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <div className="icon-circle" style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}><i className="fa-brands fa-wordpress"></i></div>
                <h2 style={{ textAlign: 'left', marginBottom: '15px', fontSize: '2rem' }}>Custom WordPress Development</h2>
                <p style={{ fontSize: '1.05rem', marginBottom: '20px', color: '#8b949e' }}>
                  Stop relying on heavy, bloated readymade themes that slow down your business. I build blazing-fast, 100% custom WordPress websites from the ground up, tailored specifically to your brand identity and operational needs.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Pixel-perfect custom designs</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Advanced SEO & Speed Optimization</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Highly secure architecture</li>
                </ul>
                <button onClick={() => openModal('Custom WordPress Development')} className="btn"><i className="fa-solid fa-bolt"></i> Request This Service</button>
              </div>
              <div style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#fff', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Perfect For:</h4>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• Corporate Businesses & Agencies</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• High-traffic Blogs & News Portals</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: 0 }}>• Local Businesses looking to scale (Nabadwip & beyond)</p>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="service-detail-card animate-fade-up">
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <div className="icon-circle" style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}><i className="fa-solid fa-code"></i></div>
                <h2 style={{ textAlign: 'left', marginBottom: '15px', fontSize: '2rem' }}>Custom Plugin Engineering</h2>
                <p style={{ fontSize: '1.05rem', marginBottom: '20px', color: '#8b949e' }}>
                  Don&apos;t force your business to fit a generic plugin. I write clean, secure PHP code to create custom WordPress plugins that do exactly what you need—whether it&apos;s an internal accounting tool or a complex travel ERP system.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Custom ERPs & Dashboards</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Lightweight, zero-bloat code</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Seamless database management</li>
                </ul>
                <button onClick={() => openModal('Custom Plugin Engineering')} className="btn"><i className="fa-solid fa-bolt"></i> Request This Service</button>
              </div>
              <div style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#fff', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Perfect For:</h4>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• Travel Agencies (Booking/KYC Systems)</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• Educational Institutes (Course Portals)</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: 0 }}>• Businesses needing tailored internal tools</p>
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="service-detail-card animate-fade-up">
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <div className="icon-circle" style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}><i className="fa-solid fa-cart-shopping"></i></div>
                <h2 style={{ textAlign: 'left', marginBottom: '15px', fontSize: '2rem' }}>High-Performance E-Commerce</h2>
                <p style={{ fontSize: '1.05rem', marginBottom: '20px', color: '#8b949e' }}>
                  A 1-second delay in your online store can cost you thousands in lost sales. I develop scalable WooCommerce platforms designed for speed, security, and maximizing your conversion rates.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Frictionless custom checkout flow</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Advanced Inventory & Order Tracking</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Payment Gateway Integrations</li>
                </ul>
                <button onClick={() => openModal('High-Performance E-Commerce')} className="btn"><i className="fa-solid fa-bolt"></i> Request This Service</button>
              </div>
              <div style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#fff', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Perfect For:</h4>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• Retail Brands & Digital Shops</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• Subscription-based businesses</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: 0 }}>• Multi-vendor Marketplaces</p>
              </div>
            </div>
          </div>

          {/* Service 4 */}
          <div className="service-detail-card animate-fade-up">
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <div className="icon-circle" style={{ width: '60px', height: '60px', fontSize: '1.5rem', marginBottom: '20px' }}><i className="fa-solid fa-gears"></i></div>
                <h2 style={{ textAlign: 'left', marginBottom: '15px', fontSize: '2rem' }}>Workflow & API Automation</h2>
                <p style={{ fontSize: '1.05rem', marginBottom: '20px', color: '#8b949e' }}>
                  Stop wasting hours on manual data entry. I build custom API integrations to connect your website with Google Sheets, third-party CRMs, and email marketing tools so your business runs on autopilot.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Google Sheets API Syncing</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> Automated Lead Capture systems</li>
                  <li style={{ marginBottom: '10px', color: '#e4e4e7' }}><i className="fa-solid fa-check text-green" style={{ marginRight: '10px' }}></i> REST API Development</li>
                </ul>
                <button onClick={() => openModal('Workflow & API Automation')} className="btn"><i className="fa-solid fa-bolt"></i> Request This Service</button>
              </div>
              <div style={{ padding: '20px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#fff', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Perfect For:</h4>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• B2B Service Providers</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '10px' }}>• Real Estate & Lead Gen Agencies</p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: 0 }}>• Any business looking to reduce manual work</p>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="bg-dark" style={{ padding: '60px 0', borderTop: '1px solid rgba(0,168,89,0.2)' }}>
        <div className="container animate-fade-up" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Have a Different Requirement?</h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            If you have a unique challenge or need a custom web application built from scratch using Next.js or PHP, let&apos;s discuss how we can make it happen.
          </p>
          <button onClick={() => openModal('General Inquiry / Custom Project')} className="btn btn-dark" style={{ border: '1px solid #00A859' }}>
            <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i> Contact Me Directly
          </button>
        </div>
      </section>
      
    </main>
  );
}