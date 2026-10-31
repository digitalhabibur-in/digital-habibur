"use client";

import React, { useState, useEffect } from 'react';
import { Hind_Siliguri, Noto_Sans_Bengali } from 'next/font/google';

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

export default function FreeGuideLandingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Strict Validation for Original Indian Mobile Number & Email
  const validateInputs = () => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    
    // Check for repetitive fake numbers like 9999999999 or 9876543210
    const isRepetitive = /^(\d)\1{9}$/.test(cleanPhone) || cleanPhone === '9876543210';

    if (name.trim().length < 3) {
      setErrorMsg('দয়া করে আপনার সঠিক নাম লিখুন।');
      return false;
    }
    if (!phoneRegex.test(cleanPhone) || isRepetitive) {
      setErrorMsg('দয়া করে ১০ সংখ্যার একটি সঠিক ও সচল মোবাইল নম্বর দিন।');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('দয়া করে একটি সঠিক ইমেইল আইডি দিন।');
      return false;
    }
    if (!profession.trim()) {
      setErrorMsg('দয়া করে আপনার পেশা বা ব্যবসার ধরন নির্বাচন করুন।');
      return false;
    }
    return true;
  };

  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    link.href = '/website-guide.pdf'; // Must match file name in public/ folder
    link.download = 'Chhoto_Byabsar_Website_Guide_Digital_Habibur.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateInputs()) return;

    setIsSubmitting(true);
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    const formData = new FormData();
    formData.append('service', 'Free PDF Guide Lead');
    formData.append('name', name.trim());
    formData.append('phone', cleanPhone);
    formData.append('email', email.trim());
    formData.append('message', `পেশা/ব্যবসা: ${profession}`);

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-JVa4GJpWx8isx1GJHmzZrE2CPIsiZ3dUkthhb7-UgYsclcphwUTpzfr96rJlYRk/exec';

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsUnlocked(true);
        triggerPdfDownload();
      } else {
        setErrorMsg('সার্ভারে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    } catch (error) {
      setErrorMsg('নেটওয়ার্ক সমস্যা। ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const chapters = [
    "কাস্টমার অনলাইনে আপনাকে কীভাবে খোঁজেন এবং কেন হারিয়ে যান",
    "ব্যবসার নিজস্ব ওয়েবসাইটের ৭টি বাস্তব উপকারিতা",
    "Facebook পেজ থাকার পরেও ওয়েবসাইটের দরকার কী?",
    "ওয়েবসাইট তৈরির আগে ব্যবসায়ীদের ১০টি জরুরি প্রস্তুতি",
    "গ্রাহকের বিশ্বাস নষ্ট করে এমন ৮টি মারাত্মক ভুল",
    "ওয়েবসাইট থেকে লিড ও সেল বাড়ানোর সহজ পদ্ধতি",
    "নিজের ব্যবসার ওয়েবসাইট অডিট চেকলিস্ট ও ৩০ দিনের প্ল্যান"
  ];

  return (
    <div className={notoSansBengali.className} style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      width: '100vw', height: '100vh', 
      background: '#0a0a0a', color: '#e5e7eb',
      overflowY: 'auto', overflowX: 'hidden', zIndex: 9999999 
    }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        nav, header, footer { display: none !important; }
        * { box-sizing: border-box; }
        .heading-font { font-family: ${hindSiliguri.style.fontFamily}, sans-serif !important; }
        
        .gradient-text {
          background: linear-gradient(135deg, #00A859 0%, #00ffd5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .main-wrapper {
          max-width: 1180px;
          margin: 0 auto;
          padding: 50px 20px 80px;
        }
        @media (max-width: 768px) {
          .main-wrapper { padding: 30px 16px 60px; }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 45px;
          align-items: start;
        }
        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr; gap: 35px; }
        }

        /* 3D Book Mockup Card */
        .book-showcase {
          background: linear-gradient(145deg, rgba(0, 168, 89, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%);
          border: 1px solid rgba(0, 168, 89, 0.25);
          border-radius: 22px;
          padding: 26px;
          margin-bottom: 28px;
          display: flex;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 550px) {
          .book-showcase { flex-direction: column; text-align: center; padding: 22px 18px; }
        }

        .book-cover-3d {
          width: 135px;
          min-width: 135px;
          height: 190px;
          background: linear-gradient(145deg, #071318 0%, #004D29 100%);
          border: 2px solid #00A859;
          border-left: 7px solid #006837;
          border-radius: 6px 14px 14px 6px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 12px 15px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 168, 89, 0.2);
          transform: perspective(600px) rotateY(-8deg);
        }

        /* Form Card */
        .form-card {
          background: rgba(20, 20, 20, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 168, 89, 0.35);
          border-radius: 24px;
          padding: 36px 28px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 168, 89, 0.08);
          position: sticky;
          top: 30px;
        }
        @media (max-width: 600px) {
          .form-card { padding: 26px 20px; border-radius: 20px; }
        }

        .input-group { margin-bottom: 16px; text-align: left; }
        .input-label {
          display: block;
          font-size: 0.9rem;
          color: #d1d5db;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .form-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          color: #fff;
          font-size: 0.98rem;
          outline: none;
          transition: all 0.25s;
        }
        .form-input:focus {
          border-color: #00A859;
          background: rgba(0, 168, 89, 0.05);
          box-shadow: 0 0 0 3px rgba(0, 168, 89, 0.15);
        }
        .form-input option { background: #141414; color: #fff; }

        .btn-download {
          width: 100%;
          background: linear-gradient(135deg, #00A859 0%, #007a41 100%);
          color: #fff;
          padding: 16px 24px;
          border-radius: 14px;
          font-size: 1.15rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 168, 89, 0.35);
        }
        .btn-download:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(0, 168, 89, 0.5);
        }

        .chapter-list-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          margin-bottom: 10px;
          font-size: 0.98rem;
        }
      `}} />

      {/* Top Banner */}
      <div style={{ background: 'rgba(0, 168, 89, 0.15)', borderBottom: '1px solid rgba(0, 168, 89, 0.3)', padding: '10px 16px', textAlign: 'center', fontSize: '0.9rem', color: '#a7f3d0' }}>
        📘 <strong>১০০% ফ্রি বিজনেস গাইড:</strong> ছোট ও মাঝারি ব্যবসার মালিকদের জন্য ২৮ পৃষ্ঠার বাস্তবভিত্তিক ই-বুক!
      </div>

      <div className="main-wrapper">
        <div className="hero-grid">
          
          {/* LEFT COLUMN: E-Book Details & Value */}
          <div>
            <span className="heading-font" style={{ display: 'inline-block', background: 'rgba(255, 215, 0, 0.12)', color: '#FFD700', padding: '6px 16px', borderRadius: '50px', fontSize: '0.88rem', marginBottom: '16px', border: '1px solid rgba(255, 215, 0, 0.3)', fontWeight: 600 }}>
              ✦ ফ্রি পিডিএফ গাইড (মূল্য ₹২৯৯ - আজ সম্পূর্ণ ফ্রি!)
            </span>

            <h1 className="heading-font" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '18px', color: '#ffffff' }}>
              প্রতিদিন কাস্টমার হারাচ্ছেন? <br />
              <span className="gradient-text">জেনে নিন ওয়েবসাইটের সঠিক কৌশল!</span>
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9ca3af', marginBottom: '26px' }}>
              ওয়েবসাইট কেন দরকার, কীভাবে কাজে লাগবে, ডেভেলপারকে কাজ দেওয়ার আগে কী কী প্রস্তুতি নেবেন এবং কীভাবে হাজার হাজার টাকার ভুল খরচ এড়াবেন—সবকিছু সহজ বাংলায় এই গাইডে সাজানো হয়েছে।
            </p>

            {/* 3D Book Visual Box */}
            <div className="book-showcase">
              <div className="book-cover-3d">
                <div>
                  <span style={{ fontSize: '0.55rem', background: '#F59E0B', color: '#000', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>শিক্ষামূলক গাইড</span>
                  <div className="heading-font" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '8px', lineHeight: 1.25 }}>
                    প্রতিদিন কাস্টমার হারাচ্ছেন?
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#00ffd5', marginTop: '4px' }}>
                    ছোট ব্যবসার ওয়েবসাইট গাইড
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '6px', fontSize: '0.6rem', color: '#d1fae5' }}>
                  ডিজিটাল হাবিবুর
                </div>
              </div>

              <div>
                <h3 className="heading-font" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>
                  ছোট ব্যবসার ওয়েবসাইট গাইড (PDF)
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#9ca3af', marginBottom: '12px', lineHeight: 1.6 }}>
                  যেকোনো স্মার্টফোন বা কম্পিউটারে পড়ার উপযোগী এবং প্রিন্ট-রেডি চেকলিস্ট সংবলিত।
                </p>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '0.85rem', color: '#00A859', fontWeight: 600 }}>
                  <span>✔ ১২টি পূর্ণাঙ্গ অধ্যায়</span>
                  <span>✔ অডিট চেকলিস্ট</span>
                  <span>✔ বাজেট ওয়ার্কশিট</span>
                </div>
              </div>
            </div>

            {/* What's Inside List */}
            <h3 className="heading-font" style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '14px' }}>
              📖 এই গাইডটির ভেতরে কী কী শিখবেন?
            </h3>
            <div>
              {chapters.map((item, idx) => (
                <div key={idx} className="chapter-list-item">
                  <span style={{ color: '#00A859', fontWeight: 700, fontSize: '1.1rem' }}>✔</span>
                  <span style={{ color: '#e5e7eb' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Lead Capture Form */}
          <div className="form-card">
            {isUnlocked ? (
              <div style={{ textAlign: 'center', padding: '15px 0' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(0, 168, 89, 0.15)', color: '#00A859', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', margin: '0 auto 18px', border: '2px solid #00A859' }}>
                  ✓
                </div>
                <h3 className="heading-font" style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '10px' }}>
                  অভিনন্দন, {name}! 🎉
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '22px' }}>
                  আপনার পিডিএফ গাইডটি অটোমেটিক ডাউনলোড শুরু হয়েছে। যদি ডাউনলোড না হয়ে থাকে, তবে নিচের বাটনে ক্লিক করুন:
                </p>

                <button onClick={triggerPdfDownload} className="heading-font btn-download" style={{ marginBottom: '25px' }}>
                  📥 পিডিএফ ডাউনলোড করুন (PDF)
                </button>

                {/* Bonus Upsell to 4,000 Taka Offer */}
                <div style={{ background: 'rgba(255, 215, 0, 0.08)', border: '1px dashed rgba(255, 215, 0, 0.4)', borderRadius: '16px', padding: '18px', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 700, textTransform: 'uppercase' }}>🔥 স্পেশাল বোনাস অফার</span>
                  <h4 className="heading-font" style={{ fontSize: '1.15rem', color: '#fff', margin: '6px 0' }}>
                    মাত্র ৪,০০০ টাকায় কমপ্লিট বিজনেস ওয়েবসাইট চান?
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginBottom: '14px', lineHeight: 1.5 }}>
                    ১ বছরের ডোমেইন, ক্লাউড হোস্টিং ও লিড জেনারেশন ফর্মসহ পুরো প্যাকেজ দেখুন।
                  </p>
                  <a href="/special-offer" className="heading-font" style={{ display: 'block', textAlign: 'center', background: '#FFD700', color: '#000', padding: '10px 16px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
                    স্পেশাল অফারটি দেখুন ➔
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span style={{ background: 'rgba(0, 168, 89, 0.15)', color: '#00A859', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                    INSTANT PDF DOWNLOAD
                  </span>
                  <h2 className="heading-font" style={{ fontSize: '1.65rem', color: '#fff', marginTop: '10px', marginBottom: '6px' }}>
                    গাইডটি ফ্রিতে ডাউনলোড করুন
                  </h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                    নিচের ফর্মে আপনার সঠিক তথ্য দিন, সাথে সাথে পিডিএফ ডাউনলোড আনলক হয়ে যাবে।
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* 1. Name */}
                  <div className="input-group">
                    <label className="input-label">আপনার নাম *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="যেমন: রাহুল সেন" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>

                  {/* 2. Original Mobile Number */}
                  <div className="input-group">
                    <label className="input-label">অরিজিনাল মোবাইল / WhatsApp নম্বর *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="১০ সংখ্যার মোবাইল নম্বর (যেমন: 98765XXXXX)" 
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      required 
                    />
                  </div>

                  {/* 3. Email ID */}
                  <div className="input-group">
                    <label className="input-label">আপনার ইমেইল আইডি *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="example@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>

                  {/* 4. Profession / Business Type */}
                  <div className="input-group" style={{ marginBottom: '22px' }}>
                    <label className="input-label">আপনার পেশা বা ব্যবসার ধরন *</label>
                    <select 
                      className="form-input" 
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      required
                    >
                      <option value="">-- পেশা / ব্যবসা নির্বাচন করুন --</option>
                      <option value="দোকান বা শোরুম মালিক (Retail/Shop)">দোকান বা শোরুম মালিক (Retail/Shop)</option>
                      <option value="সার্ভিস প্রোভাইডার / এজেন্সি">সার্ভিস প্রোভাইডার / এজেন্সি</option>
                      <option value="ডাক্তার / ক্লিনিক / হেলথকেয়ার">ডাক্তার / ক্লিনিক / হেলথকেয়ার</option>
                      <option value="শিক্ষক / কোচিং সেন্টার / ইনস্টিটিউট">শিক্ষক / কোচিং সেন্টার / ইনস্টিটিউট</option>
                      <option value="ট্রাভেল এজেন্সি / হোটেল / রেস্টুরেন্ট">ট্রাভেল এজেন্সি / হোটেল / রেস্টুরেন্ট</option>
                      <option value="ফ্রিল্যান্সার / কনসালট্যান্ট">ফ্রিল্যান্সার / কনসালট্যান্ট</option>
                      <option value="নতুন ব্যবসা শুরু করতে চাই">নতুন ব্যবসা শুরু করতে চাই</option>
                      <option value="অন্যান্য পেশা বা ব্যবসা">অন্যান্য পেশা বা ব্যবসা</option>
                    </select>
                  </div>

                  {errorMsg && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.88rem', textAlign: 'center' }}>
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="heading-font btn-download" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>⏳ যাচাই করা হচ্ছে...</>
                    ) : (
                      <>📥 ফ্রি পিডিএফ ডাউনলোড করুন</>
                    )}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#6b7280', marginTop: '14px' }}>
                    🔒 আপনার তথ্য ১০০% গোপন ও সুরক্ষিত থাকবে। কোনো স্প্যাম করা হবে না।
                  </p>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
        }
