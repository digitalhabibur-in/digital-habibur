import React from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <main>
      {/* 1. Portfolio Hero Section */}
      <section className="hero bg-dark" style={{ padding: '120px 0 80px' }}>
        <div className="hero-glow" style={{ top: '0' }}></div>
        <div className="container hero-content animate-fade-up" style={{ textAlign: 'center' }}>
          <span style={{ color: '#00A859', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block', marginBottom: '20px', background: 'rgba(0,168,89,0.1)', padding: '6px 12px', borderRadius: '50px' }}>
            <i className="fa-solid fa-briefcase" style={{marginRight: '8px'}}></i> My Work
          </span>
          <h1 style={{ marginBottom: '25px' }}>Real Results For <span className="text-gradient">Real Businesses</span></h1>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
            Explore my latest case studies. From custom WordPress ERPs to automated API integrations—see how I engineer solutions that scale.
          </p>
        </div>
      </section>

      {/* 2. Portfolio Grid Section */}
      <section className="bg-subtle">
        <div className="container">
          
          {/* Filters (Visual only for premium look) */}
          <div className="animate-fade-up delay-1" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '50px' }}>
            <span className="btn" style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '50px' }}>All Projects</span>
            <span className="btn-dark" style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Custom Web Apps</span>
            <span className="btn-dark" style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>WordPress ERP</span>
            <span className="btn-dark" style={{ padding: '8px 20px', fontSize: '0.9rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Automation</span>
          </div>

          <div className="grid-3">
            {/* Project 1: Umrah ERP */}
            <div className="portfolio-card animate-fade-up">
              <div className="portfolio-img" style={{ overflow: 'hidden' }}>
                  <img src="/portfolio-1.webp" alt="Umrah ERP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '35px' }}>
                <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', background: 'rgba(0,168,89,0.1)', padding: '4px 10px', borderRadius: '4px' }}>Enterprise ERP</span>
                <h3>Umrah Travel Management System</h3>
                <p style={{ marginBottom: '25px' }}>Engineered a robust custom plugin featuring automated wallet ledgers, secure KYC controls, and agent booking logs.</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <span className="tech-pill" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Custom PHP</span>
                  <span className="tech-pill" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>WordPress</span>
                </div>
                <a href="#" style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>View Case Study <i className="fa-solid fa-arrow-right text-green"></i></a>
              </div>
            </div>

            {/* Project 2: Automation */}
            <div className="portfolio-card animate-fade-up delay-1">
              <div className="portfolio-img" style={{ overflow: 'hidden' }}>
                  <img src="/portfolio-2.webp" alt="Automation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '35px' }}>
                <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', background: 'rgba(0,168,89,0.1)', padding: '4px 10px', borderRadius: '4px' }}>Automation</span>
                <h3>Automated Subscription Sync</h3>
                <p style={{ marginBottom: '25px' }}>Developed a custom script ensuring real-time, secure data routing directly into Google Sheets and CRM pipelines.</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <span className="tech-pill" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>API</span>
                  <span className="tech-pill" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Google Apps Script</span>
                </div>
                <a href="#" style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>View Case Study <i className="fa-solid fa-arrow-right text-green"></i></a>
              </div>
            </div>

            {/* Project 3: SNC Udyog */}
            <div className="portfolio-card animate-fade-up delay-2">
              <div className="portfolio-img" style={{ overflow: 'hidden' }}>
                  <img src="/portfolio-3.webp" alt="SNC Udyog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '35px' }}>
                <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', background: 'rgba(0,168,89,0.1)', padding: '4px 10px', borderRadius: '4px' }}>Web App</span>
                <h3>SNC UDYOG Portal</h3>
                <p style={{ marginBottom: '25px' }}>Complete enterprise website development including cloudflare configuration, automated backups, and handover documentation.</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <span className="tech-pill" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>React</span>
                  <span className="tech-pill" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Cloudflare</span>
                </div>
                <a href="#" style={{ color: '#fff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>View Case Study <i className="fa-solid fa-arrow-right text-green"></i></a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. CTA Section */}
      <section className="bg-dark" style={{ paddingBottom: '100px' }}>
        <div className="container animate-fade-up">
          <div className="glass-card" style={{ textAlign: 'center', padding: '70px 20px', borderTop: '2px solid #00A859' }}>
            <h2 style={{ marginBottom: '20px' }}>Have a Project in Mind?</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '40px', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto 40px' }}>
              Let’s collaborate to build a scalable and secure web application that takes your business to the next level.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                Start Your Project <i className="fa-solid fa-arrow-right" style={{marginLeft: '8px'}}></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}