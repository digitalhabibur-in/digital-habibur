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
  
  // Countdown Timer State (in seconds)
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60);

  useEffect(() => {
    // Hide global layout scroll
    document.body.style.overflow = 'hidden';

    // Target Date: October 23, 2026 at 23:59:59 IST
    const targetTimestamp = new Date('2026-10-23T23:59:59+05:30').getTime();
    const STORAGE_KEY = 'dh_evergreen_10min_deadline';

    const updateCountdown = () => {
      const now = Date.now();

      if (now < targetTimestamp) {
        // Before Oct 23, 11:59:59 PM -> Show real countdown to Oct 23 deadline
        const remainingSeconds = Math.floor((targetTimestamp - now) / 1000);
        setTimeLeft(remainingSeconds);
      } else {
        // From Oct 24 onwards -> Show 10-minute countdown for every visitor
        let userDeadline = sessionStorage.getItem(STORAGE_KEY);
        let deadlineTime = userDeadline ? parseInt(userDeadline, 10) : 0;

        // If new visitor or timer expired, set a fresh 10-minute deadline
        if (!deadlineTime || now >= deadlineTime) {
          deadlineTime = now + 10 * 60 * 1000; // 10 minutes in milliseconds
          sessionStorage.setItem(STORAGE_KEY, deadlineTime.toString());
        }

        const remainingSeconds = Math.max(0, Math.floor((deadlineTime - now) / 1000));
        setTimeLeft(remainingSeconds);
      }
    };

    // Run immediately on load so there is no delay
    updateCountdown();

    // Update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(timer);
    };
  }, []);

  const d = Math.floor(timeLeft / (24 * 3600));
  const h = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "৪,০০০ টাকায় ওয়েবসাইট! এটা কীভাবে সম্ভব? কোনো স্ক্যাম নয় তো?",
      a: "একদমই না! একটি ডাইনামিক ওয়েবসাইটের খরচ ১৫-২০ হাজার টাকার ওপরে। কিন্তু আমরা দিচ্ছি 'স্ট্যাটিক বিজনেস ও পোর্টফোলিও ওয়েবসাইট'। Next.js টেকনোলজি ব্যবহার করায় হোস্টিং খরচ একদম কমে যায়। তাই এই স্পেশাল অফারে আমরা প্রফিট না রেখেই শুধুমাত্র পোর্টফোলিও বাড়ানোর জন্য এই দামে দিচ্ছি!"
    },
    {
      q: "এই ওয়েবসাইটের মাধ্যমে কি লিড জেনারেশন করা যাবে?",
      a: "অবশ্যই! ওয়েবসাইটে একটি হাই-কনভার্টিং কাস্টম ইনকোয়ারি ফর্ম থাকবে। কাস্টমার ফর্ম ফিলাপ করলেই তার নাম, ফোন নম্বর ও বিস্তারিত তথ্য সরাসরি আপনার গুগল শিটে (Google Sheets) অটোমেটিক সেভ হয়ে যাবে। ফলে আপনি সহজেই লিডগুলো ট্র্যাক করতে পারবেন।"
    },
    {
      q: "৪,০০০ টাকার পর কি আর কোনো হিডেন চার্জ দিতে হবে?",
      a: "না! ৪,০০০ টাকার মধ্যেই আপনি ১ বছরের জন্য ডোমেইন (যেমন .in), হোস্টিং, এবং ওয়েবসাইটের সম্পূর্ণ ডিজাইন পেয়ে যাচ্ছেন। প্রথম এক বছরে আপনাকে আর ১ টাকাও দিতে হবে না।"
    },
    {
      q: "পরের বছর রিনিউয়াল (Renewal) করতে কত টাকা লাগবে?",
      a: "প্রথম বছর শেষ হওয়ার পর, শুধুমাত্র ডোমেইন এবং হোস্টিংয়ের রেগুলার রিনিউয়াল ফি দিতে হবে (আনুমানিক ২,৫০০-৩,০০০ টাকা)। ডিজাইনের জন্য আর কোনো টাকা লাগবে না।"
    },
    {
      q: "ওয়েবসাইট ডেলিভারি পেতে কতদিন সময় লাগবে?",
      a: "সব কনটেন্ট (আপনার ছবি, লোগো, ব্যবসার তথ্য) পাওয়ার পর মাত্র ৫ থেকে ৭ দিনের মধ্যেই আপনার প্রফেশনাল ওয়েবসাইট লাইভ হয়ে যাবে!"
    },
    {
      q: "আমি বুকিং করব কীভাবে?",
      a: "অফারটি সীমিত সময়ের জন্য। তাই নিচে থাকা ইনকোয়ারি ফর্মটি ফিলাপ করুন বা সরাসরি মেসেজ দিন। মাত্র ১,০০০ টাকা অ্যাডভান্স করে আপনি আপনার স্লট কনফার্ম করতে পারবেন।"
    }
  ];

  const comparisonItems = [
    { name: ".in ডোমেইন (১ বছর)", market: "~ ₹800", offer: "ফ্রি" },
    { name: "ক্লাউড হোস্টিং (১ বছর)", market: "~ ₹3,500", offer: "ফ্রি" },
    { name: "রেসপন্সিভ ডিজাইন ও ডেভেলপমেন্ট", market: "~ ₹8,000", offer: "ফ্রি" },
    { name: "লিড ফর্ম ও Google Sheets ইন্টিগ্রেশন", market: "~ ₹2,500", offer: "ফ্রি" },
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
        setTimeout(() => {
          setIsSuccess(false);
          setIsModalOpen(false);
        }, 5000);
      } else {
        setErrorMsg('কিছু সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch (error) {
      setErrorMsg('নেটওয়ার্ক এরর। দয়া করে পরে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={notoSansBengali.className} style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      width: '100vw', height: '100vh', 
      background: '#0a0a0a',
      color: '#e5e7eb',
      overflowY: 'auto', overflowX: 'hidden', zIndex: 9999999 
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide Global Nav/Footer */
        nav, header, footer { display: none !important; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #00A859; border-radius: 4px; }

        * { box-sizing: border-box; }

        /* Typography Helper Classes */
        .heading-font { font-family: ${hindSiliguri.style.fontFamily}, sans-serif !important; }
        
        .text-green { color: #00A859; }
        .gradient-text {
          background: linear-gradient(135deg, #00A859 0%, #00ffd5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Responsive Section Padding */
        .sec-pad { padding: 80px 20px; position: relative; }
        @media (max-width: 768px) {
          .sec-pad { padding: 55px 16px; }
        }

        /* Hero Layout */
        .hero-sec { padding: 60px 20px 50px; min-height: 92vh; display: flex; align-items: center; }
        .hero-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 50px; align-items: center; width: 100%; }
        @media (max-width: 900px) {
          .hero-sec { padding: 35px 16px 40px; min-height: auto; }
          .hero-grid { grid-template-columns: 1fr; gap: 35px; text-align: center; }
        }

        /* 1. FIXED TIMER - Never wraps or drops seconds on mobile */
        .timer-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          max-width: 390px;
          margin-bottom: 30px;
        }
        @media (max-width: 900px) {
          .timer-container { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 400px) {
          .timer-container { gap: 8px; max-width: 100%; }
        }
        .timer-item {
          background: rgba(0, 168, 89, 0.08);
          border: 1px solid rgba(0, 168, 89, 0.25);
          border-radius: 14px;
          padding: 14px 6px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .timer-val { font-size: clamp(1.4rem, 4vw, 1.9rem); font-weight: 700; color: #fff; line-height: 1.1; }
        .timer-lbl { font-size: clamp(0.75rem, 2.5vw, 0.85rem); color: #00A859; margin-top: 4px; font-weight: 600; }

        /* Modern Glassmorphism & Cards */
        .premium-box {
          background: rgba(22, 22, 22, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          padding: 32px 26px; 
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.35s ease;
        }
        .premium-box:hover {
          transform: translateY(-4px);
          background: rgba(28, 28, 28, 0.8);
          border-color: rgba(0, 168, 89, 0.3);
          box-shadow: 0 15px 35px rgba(0, 168, 89, 0.1);
        }
        @media (max-width: 600px) {
          .premium-box { padding: 24px 20px; border-radius: 16px; }
        }

        /* Responsive Grids */
        .cards-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        @media (max-width: 600px) {
          .cards-grid-3 { grid-template-columns: 1fr; gap: 16px; }
        }

        /* Sleek Button */
        .btn-mega {
          background: linear-gradient(135deg, #00A859 0%, #007a41 100%);
          color: #fff;
          padding: 16px 36px;
          border-radius: 50px;
          font-size: 1.15rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 168, 89, 0.3);
          text-decoration: none;
        }
        .btn-mega:hover { 
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0, 168, 89, 0.5);
        }
        @media (max-width: 600px) {
          .btn-mega { width: 100%; padding: 15px 24px; font-size: 1.05rem; }
        }

        /* 2. WHY WORK WITH US / WHY SO CHEAP SECTION */
        .why-card {
          max-width: 1050px;
          margin: 0 auto;
          background: linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(0, 168, 89, 0.07) 100%);
          border-radius: 24px;
          padding: 45px 40px;
          border: 1px solid rgba(0, 168, 89, 0.25);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 40px;
          align-items: center;
        }
        .why-reason-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 18px 20px;
          margin-bottom: 16px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          text-align: left;
        }
        .why-reason-icon {
          width: 44px; height: 44px; min-width: 44px;
          border-radius: 12px;
          background: rgba(0, 168, 89, 0.15);
          color: #00A859;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem;
          margin-top: 2px;
        }
        @media (max-width: 850px) {
          .why-card { grid-template-columns: 1fr; padding: 28px 20px; gap: 25px; }
          .why-badge-wrap { order: -1; margin-bottom: 5px; }
        }

        /* 3. MODERN RESPONSIVE PRICING COMPARISON */
        .price-compare-wrapper {
          background: rgba(20, 20, 20, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }
        .price-header-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          background: rgba(255, 255, 255, 0.04);
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-weight: 700;
        }
        .price-item-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          align-items: center;
        }
        .price-item-row:nth-child(even) { background: rgba(255, 255, 255, 0.015); }
        .price-total-banner {
          background: linear-gradient(135deg, rgba(0, 168, 89, 0.15) 0%, rgba(0, 168, 89, 0.03) 100%);
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          border-top: 1px solid rgba(0, 168, 89, 0.25);
        }
        .mobile-label { display: none; }

        @media (max-width: 680px) {
          .price-header-row { display: none; }
          .price-item-row {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 18px 16px;
          }
          .price-service-title {
            grid-column: 1 / -1;
            font-size: 1.05rem;
            font-weight: 600;
            color: #fff;
            padding-bottom: 6px;
            border-bottom: 1px dashed rgba(255,255,255,0.08);
          }
          .price-market-box, .price-offer-box {
            background: rgba(255,255,255,0.03);
            padding: 10px 12px;
            border-radius: 10px;
            text-align: center !important;
          }
          .price-offer-box {
            background: rgba(0, 168, 89, 0.1);
            border: 1px solid rgba(0, 168, 89, 0.25);
          }
          .mobile-label {
            display: block;
            font-size: 0.75rem;
            color: #9ca3af;
            margin-bottom: 3px;
          }
          .price-total-banner {
            flex-direction: column;
            text-align: center;
            padding: 24px 16px;
          }
        }

        /* 4. STICKY BOTTOM BAR - Shows Timer on BOTH Mobile & Desktop */
        .sticky-bar {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: rgba(12, 12, 12, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 168, 89, 0.25);
          padding: 12px 20px;
          z-index: 1000;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
        }
        .sticky-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between; gap: 15px;
        }
        .mini-timer {
          display: flex; gap: 5px; align-items: center; color: #00A859; font-weight: 700; font-size: 0.9rem; margin-top: 3px;
        }
        .mini-timer span {
          background: rgba(0, 168, 89, 0.15); padding: 2px 7px; border-radius: 6px; border: 1px solid rgba(0, 168, 89, 0.3); color: #fff; font-size: 0.85rem;
        }
        @media (max-width: 600px) {
          .sticky-bar { padding: 10px 14px; }
          .sticky-offer-title { font-size: 0.8rem !important; }
          .mini-timer { font-size: 0.75rem; gap: 3px; }
          .mini-timer span { padding: 2px 5px; font-size: 0.75rem; }
          .sticky-price { font-size: 1.2rem !important; }
          .sticky-btn { padding: 10px 18px !important; font-size: 0.95rem !important; width: auto !important; }
        }

        /* Icon Wrapper */
        .icon-circle {
          width: 52px; height: 52px;
          background: rgba(0, 168, 89, 0.12);
          color: #00A859;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; margin-bottom: 20px;
          border: 1px solid rgba(0, 168, 89, 0.2);
        }

        /* Clean Hero Image */
        .hero-img-box {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }

        @keyframes subtleFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: subtleFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* =========================================
          SECTION 1: HERO 
      ========================================== */}
      <section className="hero-sec">
        <div className="hero-grid">
          
          <div className="fade-in">
            <div className="heading-font" style={{ display: 'inline-block', background: 'rgba(255, 215, 0, 0.1)', color: '#FFD700', padding: '7px 18px', borderRadius: '50px', fontSize: '0.9rem', marginBottom: '20px', border: '1px solid rgba(255, 215, 0, 0.25)', fontWeight: 600 }}>
              ✦ লিমিটেড পূজা স্পেশাল মেগা অফার
            </div>
            
            <h1 className="heading-font" style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '18px', color: '#ffffff' }}>
              বিজনেস ওয়েবসাইট বানান, <br />
              <span className="gradient-text">বিক্রি বাড়ান দিন-রাত!</span>
            </h1>
            
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.7, marginBottom: '25px', color: '#9ca3af' }}>
              একটি সাধারণ ওয়েবসাইট নয়, আমরা দিচ্ছি লিড জেনারেশন ফানেল সহ কমপ্লিট বিজনেস সল্যুশন। 
              ডোমেইন এবং হোস্টিং সহ পুরো প্যাকেজ— <span style={{ color: '#fff', fontWeight: 600 }}>মাত্র ৪,০০০ টাকায়!</span>
            </p>

            {/* Fixed 4-Column Responsive Timer */}
            <div className="timer-container">
              <div className="timer-item">
                <div className="timer-val heading-font">{pad(d)}</div>
                <div className="timer-lbl">দিন</div>
              </div>
              <div className="timer-item">
                <div className="timer-val heading-font">{pad(h)}</div>
                <div className="timer-lbl">ঘণ্টা</div>
              </div>
              <div className="timer-item">
                <div className="timer-val heading-font">{pad(m)}</div>
                <div className="timer-lbl">মিনিট</div>
              </div>
              <div className="timer-item">
                <div className="timer-val heading-font">{pad(s)}</div>
                <div className="timer-lbl">সেকেন্ড</div>
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
              অফারটি লুফে নিন <i className="fa-solid fa-arrow-right"></i>
            </button>
            <p style={{ marginTop: '14px', color: '#ef4444', fontSize: '0.9rem', fontWeight: 500 }}>
              ⚠️ ১০ জনের মধ্যে ৩টি স্লট বুক হয়ে গেছে!
            </p>
          </div>

          <div>
            <div className="hero-img-box">
              <img 
                src="/puja-offer.png" 
                alt="Premium Website Offer" 
                style={{ width: '100%', display: 'block' }} 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'; }} 
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 2: REALITY CHECK
      ========================================== */}
      <section className="sec-pad">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="heading-font" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.7rem)', fontWeight: 700, marginBottom: '16px', color: '#ffffff' }}>
            অফলাইন ব্যবসায় আটকে থাকলে <span className="gradient-text">যা হারাচ্ছেন...</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', maxWidth: '750px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            আজকাল কাস্টমাররা দোকানে যাওয়ার আগে গুগলে সার্চ করে। আপনার ডিজিটাল প্রেজেন্স না থাকার অর্থ হলো আপনি নিজে আপনার কাস্টমারদের প্রতিযোগীদের কাছে পাঠিয়ে দিচ্ছেন।
          </p>

          <div className="cards-grid-3" style={{ textAlign: 'left' }}>
            <div className="premium-box">
              <div style={{ width: '45px', height: '5px', background: '#ef4444', marginBottom: '20px', borderRadius: '3px' }}></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>লিড ও সেলস ড্রপ</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>দোকান বা অফিস বন্ধ থাকার সময়টাতে আপনি কোনো লিড বা কাস্টমার পান না। আপনার সেলস গ্রোথ একটা জায়গায় গিয়ে থেমে যায়।</p>
            </div>
            
            <div className="premium-box">
              <div style={{ width: '45px', height: '5px', background: '#eab308', marginBottom: '20px', borderRadius: '3px' }}></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>ব্র্যান্ড ভ্যালু শূন্য</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>প্রফেশনাল ওয়েবসাইট না থাকলে নতুন কাস্টমাররা আপনাকে ভরসা করতে দ্বিধাবোধ করে। ব্র্যান্ড ভ্যালু তৈরি হয় না।</p>
            </div>

            <div className="premium-box">
              <div style={{ width: '45px', height: '5px', background: '#3b82f6', marginBottom: '20px', borderRadius: '3px' }}></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>মার্কেটে পিছিয়ে পড়া</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>আপনার প্রতিযোগীরা যখন অনলাইনে রমরমা ব্যবসা করছে, আপনি তখন শুধু লোকাল কাস্টমারদের ওপর নির্ভর করে বসে আছেন।</p>
            </div>
          </div>
          
          <div style={{ marginTop: '40px' }}>
             <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
               এখনই ডিজিটালাইজ হোন <i className="fa-solid fa-rocket"></i>
             </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: WHAT'S INCLUDED (Features)
      ========================================== */}
      <section className="sec-pad">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.7rem)', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>
              প্যাকেজে <span className="gradient-text">কী কী পাচ্ছেন?</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>একটি হাই-কনভার্টিং ওয়েবসাইটের প্রতিটি প্রয়োজনীয় ফিচার।</p>
          </div>

          <div className="cards-grid-3">
            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-globe"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '10px' }}>.in ডোমেইন ও হোস্টিং</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>১ বছরের জন্য প্রফেশনাল ডোমেইন এবং ফাস্ট ক্লাউড হোস্টিং সম্পূর্ণ বিনামূল্যে! কোনো হিডেন চার্জ নেই।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-filter"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '10px' }}>লিড জেনারেশন ফর্ম</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>ওয়েবসাইটে স্পেশাল ফর্ম থাকবে। কাস্টমার তথ্য সাবমিট করলেই লিড সরাসরি আপনার ডেটাবেসে চলে আসবে।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-database"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '10px' }}>Google Sheets অটোমেশন</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>কাস্টমারের পূরণ করা ফর্মের ডেটা অটোমেটিকভাবে আপনার গুগল শিটে জমা হবে রিয়েল-টাইমে।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-bolt"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '10px' }}>Next.js ফাস্ট স্পিড</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>লেটেস্ট 'Next.js' টেকনোলজিতে তৈরি হওয়ায় আপনার সাইট চোখের পলকে লোড হবে।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-mobile-screen-button"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '10px' }}>১০০% মোবাইল রেসপন্সিভ</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>যেকোনো স্মার্টফোন, ট্যাবলেট বা কম্পিউটারে আপনার ওয়েবসাইট দেখাবে একদম পারফেক্ট।</p>
            </div>

            <div className="premium-box">
              <div className="icon-circle"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '10px' }}>SSL ও সিকিউরিটি</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: 0 }}>আপনার সাইট থাকবে ১০০% নিরাপদ। সাথে দেওয়া হবে ফ্রি SSL (HTTPS) সার্টিফিকেট।</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
             <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega" style={{ background: 'rgba(0, 168, 89, 0.12)', border: '2px solid #00A859' }}>
               আপনার ওয়েবসাইট বুক করুন <i className="fa-solid fa-check"></i>
             </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: WHY WORK WITH US / WHY SO CHEAP? (Redesigned for Mobile)
      ========================================== */}
      <section className="sec-pad">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        
        <div className="why-card">
          <div>
            <span className="heading-font" style={{ background: 'rgba(0, 168, 89, 0.15)', color: '#00A859', padding: '5px 14px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginBottom: '14px' }}>
              কেন আমাদের সাথে কাজ করবেন?
            </span>
            <h2 className="heading-font" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '16px', color: '#ffffff', lineHeight: 1.3 }}>
              এত প্রিমিয়াম সার্ভিস, <br/><span className="gradient-text">এত কম দামে কেন দিচ্ছি?</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              অনেকের মনেই প্রশ্ন জাগে, যেখানে অন্যরা ১৫-২০ হাজার টাকা নেয়, সেখানে আমরা মাত্র ৪,০০০ টাকায় কীভাবে দিচ্ছি? এর পেছনে কোনো লুকানো স্ক্যাম নেই, আছে দুটি সহজ কারণ:
            </p>
            
            <div style={{ marginBottom: '28px' }}>
              <div className="why-reason-item">
                <div className="why-reason-icon"><i className="fa-solid fa-code"></i></div>
                <div>
                  <strong className="heading-font" style={{ fontSize: '1.15rem', color: '#fff', display: 'block', marginBottom: '4px' }}>আধুনিক Next.js টেকনোলজি</strong>
                  <span style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>আমরা পুরনো ওয়ার্ডপ্রেসের বদলে Next.js ব্যবহার করি। এতে সার্ভার বা ডাটাবেসের বাড়তি মেইনটেন্যান্স খরচ থাকে না।</span>
                </div>
              </div>

              <div className="why-reason-item" style={{ marginBottom: 0 }}>
                <div className="why-reason-icon"><i className="fa-solid fa-handshake"></i></div>
                <div>
                  <strong className="heading-font" style={{ fontSize: '1.15rem', color: '#fff', display: 'block', marginBottom: '4px' }}>দীর্ঘমেয়াদী সম্পর্ক ও পোর্টফোলিও</strong>
                  <span style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>আমরা চাই আমাদের কাজের কোয়ালিটি দেখে আপনি ইমপ্রেস হোন এবং ভবিষ্যতে রেগুলার ক্লায়েন্ট হোন। তাই প্রফিট না রেখেই এই অফার!</span>
                </div>
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
              স্লট বুক করুন <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="why-badge-wrap" style={{ textAlign: 'center' }}>
            <div style={{ 
              background: 'radial-gradient(circle, rgba(0,168,89,0.18) 0%, rgba(0,0,0,0) 70%)',
              border: '2px dashed rgba(0,168,89,0.4)',
              borderRadius: '24px',
              padding: '35px 20px',
              maxWidth: '280px',
              margin: '0 auto'
            }}>
              <i className="fa-solid fa-tags" style={{ fontSize: '3.5rem', color: '#00A859', marginBottom: '15px' }}></i>
              <div className="heading-font" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>৭০% ছাড়!</div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '8px 0 0' }}>সীমিত সময়ের পূজা স্পেশাল অফার</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: PRICING COMPARISON (Mobile Friendly Cards/Table)
      ========================================== */}
      <section className="sec-pad">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.7rem)', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>
              মার্কেট প্রাইস বনাম <span className="gradient-text">আমাদের অফার</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>নিজে যাচাই করে দেখুন কেন আমাদের প্যাকেজটি আপনার জন্য সবচেয়ে লাভজনক!</p>
          </div>

          <div className="price-compare-wrapper">
            {/* Desktop Header */}
            <div className="price-header-row heading-font">
              <div style={{ color: '#fff', fontSize: '1.15rem' }}>সার্ভিস ডিটেইলস</div>
              <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '1.05rem' }}>সাধারণ মার্কেট খরচ</div>
              <div style={{ textAlign: 'center', color: '#00A859', fontSize: '1.15rem' }}>আমাদের অফার</div>
            </div>

            {/* Comparison Rows */}
            {comparisonItems.map((item, idx) => (
              <div key={idx} className="price-item-row">
                <div className="price-service-title">{item.name}</div>
                <div className="price-market-box" style={{ textAlign: 'center', color: '#9ca3af', fontWeight: 500 }}>
                  <span className="mobile-label">সাধারণ খরচ</span>
                  <span style={{ textDecoration: 'line-through', color: '#ef4444' }}>{item.market}</span>
                </div>
                <div className="price-offer-box" style={{ textAlign: 'center', color: '#fff', fontWeight: 700 }}>
                  <span className="mobile-label">আমাদের অফার</span>
                  <span style={{ color: '#00A859' }}><i className="fa-solid fa-circle-check"></i> {item.offer}</span>
                </div>
              </div>
            ))}

            {/* Total Highlight Banner */}
            <div className="price-total-banner">
              <div>
                <span style={{ color: '#9ca3af', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>সব মিলিয়ে আপনার সাশ্রয় হচ্ছে ১০,৮০০+ টাকা!</span>
                <div className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 700 }}>
                  সর্বমোট প্যাকেজ মূল্য:
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block' }}>মার্কেট প্রাইস</span>
                  <span style={{ textDecoration: 'line-through', color: '#ef4444', fontSize: '1.2rem', fontWeight: 600 }}>₹14,800+</span>
                </div>
                <div style={{ background: '#00A859', color: '#000', padding: '10px 22px', borderRadius: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>স্পেশাল অফার</span>
                  <span className="heading-font" style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1 }}>₹4,000</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '35px' }}>
             <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega">
               অফারটি ক্লেম করুন <i className="fa-solid fa-gift"></i>
             </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 6: FAQ 
      ========================================== */}
      <section className="sec-pad">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="heading-font" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.7rem)', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>
              সাধারণ <span className="gradient-text">জিজ্ঞাসিত প্রশ্ন</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="premium-box" style={{ padding: '0', marginBottom: '14px' }}>
                <div 
                  onClick={() => toggleFaq(index)}
                  style={{ padding: '18px 20px', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', color: openFaq === index ? '#00A859' : '#e5e7eb' }}
                  className="heading-font"
                >
                  <span style={{ fontWeight: openFaq === index ? 700 : 500, lineHeight: 1.4 }}>{faq.q}</span>
                  <i className={`fa-solid ${openFaq === index ? 'fa-minus' : 'fa-plus'}`} style={{ transition: 'transform 0.3s', flexShrink: 0 }}></i>
                </div>
                <div style={{ maxHeight: openFaq === index ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <div style={{ padding: '0 20px 20px', color: '#9ca3af', lineHeight: 1.7, fontSize: '0.95rem' }}>
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
      <section style={{ padding: '70px 20px 140px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}></div>
        <h2 className="heading-font" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
          সিদ্ধান্ত নেওয়ার <span className="gradient-text">সময় এখনই!</span>
        </h2>
        <p style={{ color: '#9ca3af', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', maxWidth: '600px', margin: '0 auto 35px', lineHeight: 1.6 }}>
          আপনার ব্যবসার রূপরেখা বদলে দিতে আজই বুকিং করুন। অফারটি খুব দ্রুত শেষ হয়ে যাচ্ছে।
        </p>
        <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega" style={{ maxWidth: '380px' }}>
          <i className="fa-solid fa-paper-plane"></i> ইনকোয়ারি ফর্ম পূরণ করুন
        </button>
      </section>

      {/* =========================================
          FIXED STICKY BOTTOM BAR (Shows Timer on BOTH Mobile & Desktop)
      ========================================== */}
      <div className="sticky-bar">
        <div className="sticky-inner">
          
          <div>
            <p className="heading-font sticky-offer-title" style={{ margin: 0, color: '#e5e7eb', fontSize: '0.95rem', fontWeight: 600 }}>
              🔥 অফার শেষ হতে বাকি:
            </p>
            <div className="mini-timer heading-font">
              <span>{pad(d)}d</span>:<span>{pad(h)}h</span>:<span>{pad(m)}m</span>:<span>{pad(s)}s</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block', textDecoration: 'line-through' }}>₹14,800</span>
              <span className="heading-font sticky-price" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFD700', lineHeight: 1 }}>₹4,000</span>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="heading-font btn-mega sticky-btn" style={{ padding: '12px 26px', fontSize: '1.05rem', boxShadow: 'none' }}>
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
          background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999999,
          padding: '16px'
        }} onClick={() => !isSubmitting && setIsModalOpen(false)}>
          
          <div className="premium-box" style={{ 
            padding: '32px 24px', width: '100%', maxWidth: '440px', position: 'relative',
            background: 'rgba(20, 20, 20, 0.96)', border: '1px solid rgba(0, 168, 89, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            
            <button style={{
              position: 'absolute', top: '14px', right: '18px',
              background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.4rem', cursor: 'pointer'
            }} onClick={() => !isSubmitting && setIsModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }} className="fade-in">
                <i className="fa-solid fa-circle-check" style={{ fontSize: '3.8rem', color: '#00A859', marginBottom: '18px' }}></i>
                <h3 className="heading-font" style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '10px' }}>ধন্যবাদ!</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.6 }}>আপনার ইনকোয়ারি সফলভাবে আমাদের কাছে পৌঁছেছে। আমাদের টিম খুব শীঘ্রই যোগাযোগ করবে।</p>
              </div>
            ) : (
              <div className="fade-in">
                <h3 className="heading-font" style={{ fontSize: '1.65rem', color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
                  স্লট বুক করুন
                </h3>
                <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem' }}>
                  নিচের ফর্মটি পূরণ করুন, আমরা দ্রুত আপনার সাথে কথা বলব।
                </p>

                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="service" value="Mega Offer (4000 INR)" />

                  <input type="text" name="name" placeholder="আপনার নাম / ব্যবসার নাম" required style={{
                    width: '100%', padding: '14px 16px', marginBottom: '12px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', borderRadius: '12px', fontSize: '0.95rem', outline: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                  
                  <input type="text" name="phone" placeholder="ফোন / হোয়াটসঅ্যাপ নম্বর" required style={{
                    width: '100%', padding: '14px 16px', marginBottom: '12px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', borderRadius: '12px', fontSize: '0.95rem', outline: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                  
                  <input type="email" name="email" placeholder="ইমেইল আইডি" required style={{
                    width: '100%', padding: '14px 16px', marginBottom: '12px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', borderRadius: '12px', fontSize: '0.95rem', outline: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                  
                  <textarea name="message" placeholder="আপনার ব্যবসা সম্পর্কে কিছু বলুন..." rows={3} required style={{
                    width: '100%', padding: '14px 16px', marginBottom: '18px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', resize: 'none'
                  }} onFocus={(e) => e.target.style.borderColor = '#00A859'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}></textarea>
                  
                  {errorMsg && <p style={{ color: '#ef4444', marginBottom: '12px', textAlign: 'center', fontSize: '0.85rem' }}>{errorMsg}</p>}
                  
                  <button type="submit" className="heading-font btn-mega" style={{ width: '100%', justifyContent: 'center', padding: '15px', borderRadius: '12px' }} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> সাবমিট হচ্ছে...</>
                    ) : (
                      <><i className="fa-solid fa-paper-plane"></i> রিকোয়েস্ট পাঠান</>
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
