"use client";

import React, { useState, useEffect } from 'react';
// Next.js Google Fonts import
import { Hind_Siliguri, Noto_Sans_Bengali } from 'next/font/google';

// Load fonts
const hindSiliguri = Hind_Siliguri({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ['400', '500', '600', '700'],
  subsets: ['bengali'],
  display: 'swap',
});

export default function UltimateSpecialOffer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Countdown Timer State (7 Days)
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60);

  useEffect(() => {
    // Hide global layout scroll
    document.body.style.overflow = 'hidden';
    
    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(timer);
    };
  }, []);

  const d = Math.floor(timeLeft / (24 * 3600));
  const h = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "৪,০০০ টাকায় ওয়েবসাইট! এটা কীভাবে সম্ভব? কোনো স্ক্যাম নয় তো?",
      a: "একদমই না! একটি ডাইনামিক ওয়েবসাইটের খরচ ১৫-২০ হাজার টাকার ওপরে। কিন্তু আমরা দিচ্ছি 'স্ট্যাটিক বিজনেস ও পোর্টফোলিও ওয়েবসাইট'। Next.js টেকনোলজি ব্যবহার করায় হোস্টিং খরচ একদম কমে যায়। তাই এই স্পেশাল অফারে আমরা প্রফিট না রেখেই শুধুমাত্র পোর্টফোলিও বাড়ানোর জন্য এই দামে দিচ্ছি!"
    },
    {
      q: "এই ওয়েবসাইটের মাধ্যমে কি লিড জেনারেশন করা যাবে?",
      a: "অবশ্যই! ওয়েবসাইটে একটি হাই-কনভার্টিং কাস্টম ইনকোয়ারি ফর্ম থাকবে। কাস্টমার ফর্ম ফিলাপ করলেই তার নাম, ফোন নম্বর ও বিস্তারিত তথ্য সরাসরি আপনার গুগল শিটে (Google Sheets) অটোমেটিক সেভ হয়ে যাবে। ফলে আপনি সহজেই লিডগুলো ট্র্যাক করতে পারবেন।"
    },
    {
      q: "৪,০০০ টাকার পর কি আর কোনো হিডেন চার্জ দিতে হবে?",
      a: "না! ৪,০০০ টাকার মধ্যেই আপনি ১ বছরের জন্য ডোমেইন (যেমন .in), হোস্টিং, এবং ওয়েবসাইটের সম্পূর্ণ ডিজাইন পেয়ে যাচ্ছেন। প্রথম এক বছরে আপনাকে আর ১ টাকাও দিতে হবে না।"
    },
    {
      q: "পরের বছর রিনিউয়াল (Renewal) করতে কত টাকা লাগবে?",
      a: "প্রথম বছর শেষ হওয়ার পর, শুধুমাত্র ডোমেইন এবং হোস্টিংয়ের রেগুলার রিনিউয়াল ফি দিতে হবে (আনুমানিক ২,৫০০-৩,০০০ টাকা)। ডিজাইনের জন্য আর কোনো টাকা লাগবে না।"
    },
    {
      q: "ওয়েবসাইট ডেলিভারি পেতে কতদিন সময় লাগবে?",
      a: "সব কনটেন্ট (আপনার ছবি, লোগো, ব্যবসার তথ্য) পাওয়ার পর মাত্র ৫ থেকে ৭ দিনের মধ্যেই আপনার প্রফেশনাল ওয়েবসাইট লাইভ হয়ে যাবে!"
    },
    {
      q: "আমি বুকিং করব কীভাবে?",
      a: "অফারটি সীমিত সময়ের জন্য। তাই নিচে থাকা ইনকোয়ারি ফর্মটি ফিলাপ করুন বা সরাসরি মেসেজ দিন। মাত্র ১,০০০ টাকা অ্যাডভান্স করে আপনি আপনার স্লট কনফার্ম করতে পারবেন।"
    }
  ];

  // Google Sheets Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Using your exact Google Script URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-JVa4GJpWx8isx1GJHmzZrE2CPIsiZ3dUkthhb7-UgYsclcphwUTpzfr96rJlYRk/exec';

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        // Hide success message after 5 seconds and close modal
        setTimeout(() => {
          setIsSuccess(false);
          setIsModalOpen(false);
        }, 5000);
      } else {
        setErrorMsg('কিছু সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch (error) {
      setErrorMsg('নেটওয়ার্ক এরর। দয়া করে পরে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={notoSansBengali.className} style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      width: '100vw', height: '100vh', 
      background: '#0a0a0a', /* Deep professional black/gray */
      color: '#e5e7eb', /* Soft white for better readability */
      overflowY: 'auto', overflowX: 'hidden', zIndex: 9999999 
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide Global Nav/Footer */
        nav, header, footer { display: none !important; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #00A859; border-radius: 4px; }

        /* Typography Helper Classes */
        .heading-font { font-family: ${hindSiliguri.style.fontFamily}, sans-serif !important; }
        
        /* FIX FOR MEDIA QUERY ERROR */
        .desktop-only { display: none; }
        @media (min-width: 600px) {
          .desktop-only { display: block; }
        }

        /* Modern Glassmorphism & Soft Shadows */
        .premium-box {
          background: rgba(25, 25, 25, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 40px 30px; 
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .premium-box:hover {
          transform: translateY(-5px);
          background: rgba(30, 30, 30, 0.6);
          border-color: rgba(0, 168, 89, 0.2);
          box-shadow: 0 20px 40px rgba(0, 168, 89, 0.08);
        }

        /* Subtle Gradients */
        .text-green { color: #00A859; }
        .gradient-text {
          background: linear-gradient(135deg, #00A859 0%, #00ffd5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Sleek Button */
        .btn-mega {
          background: linear-gradient(135deg, #00A859 0%, #007a41 100%);
          color: #fff;
          padding: 16px 40px;
          border-radius: 50px;
          font-size: 1.15rem;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 168, 89, 0.3);
          text-decoration: none;
        }
        .btn-mega:hover { 
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0, 168, 89, 0.5);
        }

        /* Clean Timer */
        .timer-container {
          display: flex; gap: 12px; margin-bottom: 30px; flex-wrap: wrap;
        }
        .timer-item {
          background: rgba(0, 168, 89, 0.08);
          border: 1px solid rgba(0, 168, 89, 0.15);
          border-radius: 12px;
          padding: 12px 18px;
          text-align: center;
          min-width: 75px;
        }
        .timer-val { font-size: 1.8rem; font-weight: 700; color: #fff; line-height: 1; }
        .timer-lbl { font-size: 0.8rem; color: #00A859; margin-top: 4px; font-weight: 500; }

        /* Mini Timer for Sticky Bar */
        .mini-timer {
          display: flex; gap: 6px; align-items: center; color: #00A859; font-weight: 700; font-size: 0.95rem; margin-top: 5px;
        }
        .mini-timer span {
          background: rgba(0, 168, 89, 0.15); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(0, 168, 89, 0.3); color: #fff;
        }

        /* Icon Wrapper */
        .icon-circle {
          width: 55px; height: 55px;
          background: rgba(0, 168, 89, 0.1);
          color: #00A859;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 25px;
        }

        /* Clean Hero Image */
        .hero-img-box {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        .hero-img-box::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
          border-radius: 24px;
          pointer-events: none;
        }

        /* Animations */
        @keyframes subtleFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: subtleFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Modern Table */
        .modern-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 30px; }
        .modern-table th, .modern-table td { padding: 22px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .bg-dim { background: rgba(255,255,255,0.02); }
        .highlight-col { background: rgba(0, 168, 89, 0.05); border-left: 1px solid rgba(0,168,89,0.1); border-right: 1px solid rgba(0,168,89,0.1); }
      `}} />

      {/* =========================================
          SECTION 1: HERO 
      ========================================== */}
      <section style={{ padding: '80px 20px 60px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 500px' }} className="fade-in">
            <div className="heading-font" style={{ display: 'inline-block', background: 'rgba(255, 215, 0, 0.1)', color: '#FFD700', padding: '8px 20px', borderRadius: '50px', fontSize: '0.95rem', marginBottom: '25px', border: '1px solid rgba(255, 215, 0, 0.2)', fontWeight: 600 }}>
              ✦ লিমিটেড পূজা স্পেশাল মেগা অফার
            </div>
            
            <h1 className="heading-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '20px', color: '#ffffff' }}>
              বিজনেস ওয়েবসাইট বানান, <br />
              <span className="gradient-text">বিক্রি বাড়ান দিন-রাত!</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '25px', color: '#9ca3af' }}>
              একটি সাধারণ ওয়েবসাইট নয়, আমরা দিচ্ছি লিড জেনারেশন ফানেল সহ কমপ্লিট বিজনেস সল্যুশন। 
              ডোমেইন এবং হোস্টিং সহ পুরো প্যাকেজ— <span style={{ color: '#fff', fontWeight: 600 }}>মাত্র ৪,০০০ টাকায়!</span>
            </p>

            <div className="timer-container">
              <div className="timer-item"><div className="timer-val heading-font">{d}</div><div className="timer-lbl">দিন</div></div>
              <div className="timer-item"><div className="timer-val heading-font">{h}</div><div className="timer-lbl">ঘণ্টা</div></div>
              <div className="timer-item"><div className="timer-val heading-font">{m}</div><div className="timer-lbl">মিনিট</div></div>
              <div className="timer-item"><div className="timer-val heading-font">{s}</div><div className="timer-lbl">সেকেন্ড</div></div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
              অফারটি লুফে নিন <i className="fa-solid fa-arrow-right"></i>
            </button>
            <p style={{ marginTop: '15px', color: '#ef4444', fontSize: '0.95rem' }}>⚠️ ১০ জনের মধ্যে ৩টি স্লট বুক হয়ে গেছে!</p>
          </div>

          <div style={{ flex: '1 1 450px' }}>
            <div className="hero-img-box">
              <img src="/puja-offer.png" alt="Premium Website Offer" style={{ width: '100%', display: 'block' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'; }} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: REALITY CHECK (Replaced "Pain Points")
      ========================================== */}
      <section style={{ padding: '80px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="heading-font" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '20px', color: '#ffffff' }}>
            অফলাইন ব্যবসায় আটকে থাকলে <span className="gradient-text">যা হারাচ্ছেন...</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1.15rem', marginBottom: '50px', maxWidth: '750px', margin: '0 auto 50px', lineHeight: 1.7 }}>
            আজকাল কাস্টমাররা দোকানে যাওয়ার আগে গুগলে সার্চ করে। আপনার ডিজিটাল প্রেজেন্স না থাকার অর্থ হলো আপনি নিজে আপনার কাস্টমারদের প্রতিযোগীদের কাছে পাঠিয়ে দিচ্ছেন।
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div className="premium-box">
              <div style={{ width: '45px', height: '5px', background: '#ef4444', marginBottom: '25px', borderRadius: '3px' }}></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '15px' }}>লিড ও সেলস ড্রপ</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>দোকান বা অফিস বন্ধ থাকার সময়টাতে আপনি কোনো লিড বা কাস্টমার পান না। আপনার সেলস গ্রোথ একটা জায়গায় গিয়ে থেমে যায়।</p>
            </div>
            
            <div className="premium-box">
              <div style={{ width: '45px', height: '5px', background: '#eab308', marginBottom: '25px', borderRadius: '3px' }}></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '15px' }}>ব্র্যান্ড ভ্যালু শূন্য</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>প্রফেশনাল ওয়েবসাইট না থাকলে নতুন কাস্টমাররা আপনাকে ভরসা করতে দ্বিধাবোধ করে। ব্র্যান্ড ভ্যালু তৈরি হয় না।</p>
            </div>

            <div className="premium-box">
              <div style={{ width: '45px', height: '5px', background: '#3b82f6', marginBottom: '25px', borderRadius: '3px' }}></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '15px' }}>মার্কেটে পিছিয়ে পড়া</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>আপনার প্রতিযোগীরা যখন অনলাইনে রমরমা ব্যবসা করছে, আপনি তখন শুধু লোকাল কাস্টমারদের ওপর নির্ভর করে বসে আছেন।</p>
            </div>
          </div>
          
          {/* Section CTA */}
          <div style={{ marginTop: '50px' }}>
             <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
               এখনই ডিজিটালাইজ হোন <i className="fa-solid fa-rocket"></i>
             </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: WHAT'S INCLUDED (Features)
      ========================================== */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '15px', color: '#ffffff' }}>
              প্যাকেজে <span className="gradient-text">কী কী পাচ্ছেন?</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1.15rem' }}>একটি হাই-কনভার্টিং ওয়েবসাইটের প্রতিটি প্রয়োজনীয় ফিচার।</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-globe"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>.in ডোমেইন ও হোস্টিং</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>১ বছরের জন্য প্রফেশনাল ডোমেইন এবং ফাস্ট ক্লাউড হোস্টিং সম্পূর্ণ বিনামূল্যে! কোনো হিডেন চার্জ নেই।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-filter"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>লিড জেনারেশন ফর্ম</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>ওয়েবসাইটে স্পেশাল ফর্ম থাকবে। কাস্টমার তথ্য সাবমিট করলেই লিড সরাসরি আপনার ডেটাবেসে চলে আসবে।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-database"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>Google Sheets অটোমেশন</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>কাস্টমারের পূরণ করা ফর্মের ডেটা অটোমেটিকভাবে আপনার গুগল শিটে জমা হবে রিয়েল-টাইমে।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-bolt"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>Next.js ফাস্ট স্পিড</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>লেটেস্ট 'Next.js' টেকনোলজিতে তৈরি হওয়ায় আপনার সাইট চোখের পলকে লোড হবে।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-mobile-screen-button"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>১০০% মোবাইল রেসপন্সিভ</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>যেকোনো স্মার্টফোন, ট্যাবলেট বা কম্পিউটারে আপনার ওয়েবসাইট দেখাবে একদম পারফেক্ট।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>SSL ও সিকিউরিটি</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1.05rem', margin: 0 }}>আপনার সাইট থাকবে ১০০% নিরাপদ। সাথে দেওয়া হবে ফ্রি SSL (HTTPS) সার্টিফিকেট।</p>
            </div>

          </div>

          {/* Section CTA */}
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
             <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega" style={{ background: 'transparent', border: '2px solid #00A859' }}>
               আপনার ওয়েবসাইট বুক করুন <i className="fa-solid fa-check"></i>
             </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: WHY SO CHEAP? (New Section)
      ========================================== */}
      <section style={{ padding: '80px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(0,168,89,0.05) 100%)', borderRadius: '24px', padding: '50px 40px', border: '1px solid rgba(0,168,89,0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 700, marginBottom: '20px', color: '#ffffff' }}>
              এত প্রিমিয়াম সার্ভিস, <br/><span className="gradient-text">এত কম দামে কেন দিচ্ছি?</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '25px' }}>
              অনেকের মনেই প্রশ্ন জাগে, যেখানে অন্যরা ১৫-২০ হাজার টাকা নেয়, সেখানে আমরা মাত্র ৪,০০০ টাকায় কীভাবে দিচ্ছি? এর পেছনে কোনো লুকানো স্ক্যাম নেই, আছে দুটি সহজ কারণ:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 35px 0', color: '#e5e7eb', fontSize: '1.05rem', lineHeight: 1.7 }}>
              <li style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                <i className="fa-solid fa-code text-green" style={{ fontSize: '1.5rem', marginTop: '3px' }}></i> 
                <div><strong className="heading-font" style={{ fontSize: '1.2rem', color: '#fff' }}>আধুনিক টেকনোলজি:</strong> আমরা পুরনো ওয়ার্ডপ্রেসের বদলে Next.js ব্যবহার করি। এতে সার্ভার বা ডাটাবেসের বাড়তি মেইনটেন্যান্স খরচ থাকে fix থাকে না।</div>
              </li>
              <li style={{ display: 'flex', gap: '15px' }}>
                <i className="fa-solid fa-handshake text-green" style={{ fontSize: '1.5rem', marginTop: '3px' }}></i> 
                <div><strong className="heading-font" style={{ fontSize: '1.2rem', color: '#fff' }}>দীর্ঘমেয়াদী সম্পর্ক:</strong> আমরা চাই আমাদের কাজের কোয়ালিটি দেখে আপনি ইমপ্রেস হোন এবং ভবিষ্যতে রেগুলার ক্লায়েন্ট হোন। তাই প্রফিট না রেখেই এই অফার!</div>
              </li>
            </ul>
            <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega" style={{ padding: '16px 40px' }}>
              স্লট বুক করুন <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
              <div style={{ width: '180px', height: '180px', background: 'rgba(0,168,89,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: '2px dashed rgba(0,168,89,0.4)', color: '#00A859', fontSize: '5rem' }}>
                  <i className="fa-solid fa-tags"></i>
              </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: PRICING COMPARISON TABLE
      ========================================== */}
      <section style={{ padding: '80px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '15px', color: '#ffffff' }}>
              মার্কেট প্রাইস বনাম <span className="gradient-text">আমাদের অফার</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>নিজে যাচাই করে দেখুন কেন আমাদের প্যাকেজটি আপনার জন্য লাভজনক!</p>
          </div>

          <div className="premium-box" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="modern-table">
                <thead>
                  <tr>
                    <th className="heading-font" style={{ width: '45%', color: '#fff', fontSize: '1.2rem' }}>সার্ভিস ডিটেইলস</th>
                    <th className="heading-font" style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1.1rem' }}>সাধারণ খরচ</th>
                    <th className="heading-font highlight-col" style={{ textAlign: 'center', color: '#00A859', fontSize: '1.2rem' }}>আমাদের অফার</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>.in ডোমেইন (১ বছর)</td>
                    <td style={{ textAlign: 'center', color: '#9ca3af' }}>~ ₹800</td>
                    <td className="highlight-col" style={{ textAlign: 'center', color: '#fff' }}><i className="fa-solid fa-check text-green"></i> ফ্রি</td>
                  </tr>
                  <tr className="bg-dim">
                    <td>ক্লাউড হোস্টিং (১ বছর)</td>
                    <td style={{ textAlign: 'center', color: '#9ca3af' }}>~ ₹3,500</td>
                    <td className="highlight-col" style={{ textAlign: 'center', color: '#fff' }}><i className="fa-solid fa-check text-green"></i> ফ্রি</td>
                  </tr>
                  <tr>
                    <td>রেসপন্সিভ ডিজাইন ও ডেভেলপমেন্ট</td>
                    <td style={{ textAlign: 'center', color: '#9ca3af' }}>~ ₹8,000</td>
                    <td className="highlight-col" style={{ textAlign: 'center', color: '#fff' }}><i className="fa-solid fa-check text-green"></i> ফ্রি</td>
                  </tr>
                  <tr className="bg-dim">
                    <td>লিড ফর্ম ও Google Sheets ইন্টিগ্রেশন</td>
                    <td style={{ textAlign: 'center', color: '#9ca3af' }}>~ ₹2,500</td>
                    <td className="highlight-col" style={{ textAlign: 'center', color: '#fff' }}><i className="fa-solid fa-check text-green"></i> ফ্রি</td>
                  </tr>
                  <tr>
                    <td className="heading-font" style={{ color: '#fff', fontSize: '1.2rem' }}>সর্বমোট খরচ</td>
                    <td style={{ textAlign: 'center', textDecoration: 'line-through', color: '#ef4444', fontSize: '1.1rem' }}>₹14,800+</td>
                    <td className="highlight-col heading-font" style={{ textAlign: 'center', fontSize: '1.6rem', color: '#FFD700', fontWeight: 700 }}>₹4,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
             <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
               অফারটি ক্লেম করুন <i className="fa-solid fa-gift"></i>
             </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 6: FAQ 
      ========================================== */}
      <section style={{ padding: '80px 20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '15px', color: '#ffffff' }}>
              সাধারণ <span className="gradient-text">জিজ্ঞাসিত প্রশ্ন</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="premium-box" style={{ padding: '0', marginBottom: '15px' }}>
                <div 
                  onClick={() => toggleFaq(index)}
                  style={{ padding: '22px 25px', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: openFaq === index ? '#00A859' : '#e5e7eb' }}
                  className="heading-font"
                >
                  <span style={{ fontWeight: openFaq === index ? 700 : 500 }}>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === index ? 'fa-minus' : 'fa-plus'}`} style={{ transition: 'transform 0.3s' }}></i>
                </div>
                <div style={{ maxHeight: openFaq === index ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <div style={{ padding: '0 25px 25px', color: '#9ca3af', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 7: FINAL CTA
      ========================================== */}
      <section style={{ padding: '100px 20px 150px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <h2 className="heading-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>
          সিদ্ধান্ত নেওয়ার <span className="gradient-text">সময় এখনই!</span>
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 40px' }}>
          আপনার ব্যবসার রূপরেখা বদলে দিতে আজই বুকিং করুন। অফারটি খুব দ্রুত শেষ হয়ে যাচ্ছে।
        </p>
        <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega" style={{ padding: '20px 50px', fontSize: '1.3rem' }}>
          <i className="fa-solid fa-paper-plane"></i> ইনকোয়ারি ফর্ম পূরণ করুন
        </button>
      </section>

      {/* =========================================
          FIXED STICKY BOTTOM BAR (Clean, Centered, with Timer)
      ========================================== */}
      <div style={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(10, 10, 10, 0.85)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
        padding: '15px 0',
        zIndex: 1000 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div className="desktop-only">
            <p className="heading-font" style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>মেগা অফার: মাত্র ৪,০০০ টাকা!</p>
            <div className="mini-timer heading-font">
               <span>{d}d</span> : <span>{h}h</span> : <span>{m}m</span> : <span>{s}s</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1', justifyContent: 'flex-end' }}>
            <span className="heading-font" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>₹4,000</span>
            <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega" style={{ padding: '12px 30px', fontSize: '1.1rem', boxShadow: 'none' }}>
              বুক করুন <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>
      </div>

      {/* =========================================
          POPUP INQUIRY FORM (Modern Glass UI)
      ========================================== */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999999,
          padding: '20px'
        }} onClick={() => !isSubmitting && setIsModalOpen(false)}>
          
          <div className="premium-box" style={{ 
            padding: '40px', width: '100%', maxWidth: '450px', position: 'relative',
            background: 'rgba(20, 20, 20, 0.95)' 
          }} onClick={(e) => e.stopPropagation()}>
            
            <button style={{
              position: 'absolute', top: '15px', right: '20px',
              background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.5rem', cursor: 'pointer'
            }} onClick={() => !isSubmitting && setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }} className="fade-in">
                <i className="fa-solid fa-circle-check" style={{ fontSize: '4rem', color: '#00A859', marginBottom: '20px' }}></i>
                <h3 className="heading-font" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>ধন্যবাদ!</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>আপনার ইনকোয়ারি সফলভাবে আমাদের কাছে পৌঁছেছে। আমাদের টিম খুব শীঘ্রই যোগাযোগ করবে।</p>
              </div>
            ) : (
              <div className="fade-in">
                <h3 className="heading-font" style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px', textAlign: 'center' }}>
                  স্লট বুক করুন
                </h3>
                <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '30px', fontSize: '0.95rem' }}>
                  নিচের ফর্মটি পূরণ করুন, আমরা দ্রুত আপনার সাথে কথা বলব।
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Hidden Service Field for Google Sheets */}
                  <input type="hidden" name="service" value="Mega Offer (4000 INR)" />

                  <input type="text" name="name" placeholder="আপনার নাম / ব্যবসার নাম" required style={{
                    width: '100%', padding: '16px', marginBottom: '15px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', borderRadius: '12px', fontSize: '1rem', outline: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  
                  {/* Phone Field for Google Sheets */}
                  <input type="text" name="phone" placeholder="ফোন / হোয়াটসঅ্যাপ নম্বর" required style={{
                    width: '100%', padding: '16px', marginBottom: '15px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', borderRadius: '12px', fontSize: '1rem', outline: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  
                  {/* Email Field */}
                  <input type="email" name="email" placeholder="ইমেইল আইডি" required style={{
                    width: '100%', padding: '16px', marginBottom: '15px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', borderRadius: '12px', fontSize: '1rem', outline: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  
                  <textarea name="message" placeholder="আপনার ব্যবসা সম্পর্কে কিছু বলুন..." rows={3} required style={{
                    width: '100%', padding: '16px', marginBottom: '20px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', borderRadius: '12px', fontSize: '1rem', outline: 'none', resize: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}></textarea>
                  
                  {errorMsg && <p style={{ color: '#ef4444', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{errorMsg}</p>}
                  
                  <button type="submit" className="heading-font btn-mega" style={{ width: '100%', justifyContent: 'center', padding: '16px', borderRadius: '12px' }} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> সাবমিট হচ্ছে...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane"></i> রিকোয়েস্ট পাঠান</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}
