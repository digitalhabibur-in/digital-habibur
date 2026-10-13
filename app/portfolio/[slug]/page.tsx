"use client";

import React, { use } from 'react';
import Link from 'next/link';

// Detailed Case Study Data
const caseStudyData = {
  "umrah-travel-erp": {
    category: "Enterprise ERP",
    title: "Umrah Travel Management System",
    client: "Global Travel Agency",
    timeline: "3 Months",
    role: "Lead Full-Stack Developer",
    techStack: ["WordPress", "Custom PHP", "MySQL", "Tailwind CSS"],
    heroImage: "/portfolio-1.webp",
    overview: "Built a complete Travel Management ERP directly inside WordPress. The client was struggling with manual ledgers and agent bookings. I engineered a robust plugin that automates the entire flow from lead generation to PDF voucher creation.",
    problem: "The agency relied on messy Excel sheets to manage hundreds of B2B travel agents. They lacked a centralized system for tracking agent wallets, approving KYC documents, and instantly generating secure booking vouchers.",
    solution: "I developed a lightweight, single-file architectural pattern using pure OOP PHP. The system features an automated KYC verification pipeline, real-time PDF voucher generation using TCPDF, and secure wallet deductions directly hitting custom MySQL tables bypassing heavy WP native functions.",
    features: [
      "Agent Wallet Management & Automated Deductions",
      "Real-time PDF Voucher Generation",
      "Secure KYC Document Verification Portal",
      "Automated WhatsApp & Email Notifications"
    ],
    results: [
      "100% Elimination of manual entry",
      "Zero database bloat (optimized SQL)",
      "Automated PDF generation under 2 seconds"
    ]
  },
  "automated-subscription-sync": {
    category: "Automation",
    title: "Automated Subscription Sync",
    client: "B2B SaaS Startup",
    timeline: "2 Weeks",
    role: "Automation Engineer",
    techStack: ["REST API", "Google Apps Script", "Webhooks"],
    heroImage: "/portfolio-2.webp",
    overview: "Developed a custom automation pipeline to instantly route new subscriber data from the main platform directly into the sales team's Google Sheets.",
    problem: "The client was manually exporting CSV files every day and sending them to the sales team. This manual process led to severe data loss and slow response times, resulting in lost leads.",
    solution: "Set up a secure webhook endpoint that catches subscription payloads in real-time, sanitizes the data, and pushes it to Google Sheets instantly via API. Added fail-safes and error logging to ensure zero data drops during traffic spikes.",
    features: [
      "Real-time Webhook Listener",
      "Data Sanitization & Format Normalization",
      "Direct Google Sheets API Integration",
      "Automated Error Logging via Email"
    ],
    results: [
      "Real-time data sync achieved",
      "Saved 15 hours/week of manual work",
      "Zero data loss during high-traffic spikes"
    ]
  },
  "snc-udyog-portal": {
    category: "Web App",
    title: "SNC UDYOG Portal",
    client: "SNC Udyog",
    timeline: "1 Month",
    role: "Frontend Developer",
    techStack: ["Next.js", "React", "Cloudflare", "Tailwind CSS"],
    heroImage: "/portfolio-3.webp",
    overview: "Designed and developed a fast, secure, and modern corporate portal with complete handover documentation and robust backup architecture.",
    problem: "SNC Udyog needed a highly professional digital presence that loaded instantly across all devices and was easy for their internal team to maintain without technical expertise.",
    solution: "Used Next.js for blazing-fast static generation. Configured Cloudflare for global CDN delivery and advanced security. Set up automated UpdraftPlus backups and provided comprehensive technical documentation for easy handover.",
    features: [
      "Next.js Static Site Generation (SSG)",
      "Cloudflare CDN & Edge Security",
      "Automated Daily Backup Architecture",
      "Fully Responsive Mobile-First Design"
    ],
    results: [
      "Sub-second page load times globally",
      "Perfect 100/100 Google Lighthouse score",
      "Seamless client handover with full documentation"
    ]
  }
};

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  // 🌟 FIX: Unwrap the params Promise using React.use() for Next.js 15+
  const resolvedParams = use(params);
  const project = caseStudyData[resolvedParams.slug as keyof typeof caseStudyData];

  if (!project) {
    return (
      <main style={{ paddingTop: '150px', minHeight: '100vh', textAlign: 'center', background: '#050505' }}>
        <div className="container">
          <h2>Project Not Found</h2>
          <p style={{ color: '#a1a1aa', marginTop: '10px' }}>The case study you are looking for does not exist.</p>
          <Link href="/portfolio" className="btn" style={{ marginTop: '20px' }}>Return to Portfolio</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: '#050505', paddingBottom: '100px' }}>
      
      {/* 1. Case Study Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#a1a1aa', marginBottom: '30px', fontWeight: 600, fontSize: '0.9rem', transition: '0.3s' }} className="hover-green">
            <i className="fa-solid fa-arrow-left"></i> Back to Projects
          </Link>
          
          <div className="animate-fade-up">
            <span style={{ display: 'inline-block', color: '#00A859', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', background: 'rgba(0,168,89,0.1)', padding: '6px 12px', borderRadius: '4px' }}>
              {project.category}
            </span>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '30px', lineHeight: '1.2' }}>{project.title}</h1>
            
            {/* Project Meta Info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', marginTop: '10px' }}>
              <div>
                <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', fontWeight: 700 }}>Client</p>
                <p style={{ color: '#fff', fontWeight: 600 }}>{project.client}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', fontWeight: 700 }}>Role</p>
                <p style={{ color: '#fff', fontWeight: 600 }}>{project.role}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', fontWeight: 700 }}>Timeline</p>
                <p style={{ color: '#fff', fontWeight: 600 }}>{project.timeline}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px', fontWeight: 700 }}>Tech Stack</p>
                <p style={{ color: '#00A859', fontWeight: 600 }}>{project.techStack.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Image */}
      <section style={{ padding: '60px 0' }}>
        <div className="container animate-fade-up delay-1">
          <div style={{ width: '100%', height: '550px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src={project.heroImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
      </section>

      {/* 3. Case Study Content */}
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '60px', alignItems: 'flex-start' }}>
            
            {/* Left Content Area */}
            <div className="animate-fade-up">
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>Project Overview</h2>
                <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: '1.8' }}>{project.overview}</p>
              </div>

              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>The Challenge</h2>
                <div style={{ background: 'rgba(255,95,86,0.05)', borderLeft: '4px solid #ff5f56', padding: '25px', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ color: '#e4e4e7', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>{project.problem}</p>
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>The Solution</h2>
                <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>{project.solution}</p>
                
                <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '20px' }}>Key Features Developed:</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {project.features.map((feature, index) => (
                    <li key={index} style={{ color: '#a1a1aa', fontSize: '1.05rem', marginBottom: '15px', display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'rgba(0,168,89,0.1)', color: '#00A859', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '3px' }}>
                        <i className="fa-solid fa-check" style={{ fontSize: '0.7rem' }}></i>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Sidebar (Sticky) */}
            <div className="animate-fade-up delay-1" style={{ position: 'sticky', top: '100px' }}>
              <div className="glass-card" style={{ padding: '40px', background: 'linear-gradient(180deg, rgba(10,10,12,0.8) 0%, rgba(5,5,5,0.9) 100%)', border: '1px solid rgba(0,168,89,0.2)' }}>
                
                <div style={{ width: '50px', height: '50px', background: 'rgba(0,168,89,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                  <i className="fa-solid fa-chart-line text-green" style={{ fontSize: '1.5rem' }}></i>
                </div>
                
                <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', color: '#fff' }}>Project Outcomes</h3>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {project.results.map((result, index) => (
                    <li key={index} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: index !== project.results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <p style={{ color: '#e4e4e7', fontSize: '1.05rem', lineHeight: '1.5', margin: 0, fontWeight: 500 }}>{result}</p>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '16px', marginTop: '10px' }}>
                  Build Something Similar
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
