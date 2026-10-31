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
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const validateInputs = () => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
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
    link.href = '/website-guide.pdf';
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
      minHeight: '100vh', 
      background: '#0a0a0a', 
      color: '#e5e7eb',
      overflowX: 'hidden'
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

        .main-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 20px 100px;
        }
        @media (max-width: 768px) {
          .main-container { padding: 30px 16px 60px; }
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 50px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .content-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        /* Mockup Box */
        .mockup-banner {
          background: linear-gradient(135deg, rgba(0, 168, 89, 0.12) 0%, rgba(20, 20, 20, 0.8) 100%);
          border: 1px solid rgba(0, 168, 89, 0.25);
          border-radius: 20px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 30px;
        }
        @media (max-width: 580px) {
          .mockup-banner { flex-direction: column; text-align: center; padding: 20px; }
        }

        .mockup-img {
          width: 150px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));
        }

        /* Clean Form Card */
        .lead-form-card {
          background: #141414;
          border: 1px solid rgba(0, 168, 89, 0.3);
          border-radius: 24px;
          padding: 35px 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        @media (max-width: 580px) {
          .lead-form-card { padding: 25px 18px; }
        }

        .form-group {
          margin-bottom: 18px;
          text-align: left;
        }
        .form-label {
          display: block;
          font-size: 0.92rem;
          color: #d1d5db;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .form-control {
          width: 100%;
          padding: 14px 16px;
          background: #1f1f1f;
          border: 1px solid #333;
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-control:focus {
          border-color: #00A859;
          background: #252525;
        }
        .form-control option { background: #1f1f1f; color: #fff; }

        .submit-btn {
          width: 100%;
          background: #00A859;
          color: #000;
          padding: 16px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 8px 20px rgba(0, 168, 89, 0.25);
        }
        .submit-btn:hover {
          background: #008f4c;
          transform: translateY(-1px);
        }

        .chapter-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #121212;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          margin-bottom: 10px;
          font-size: 0.95rem;
        }
      `}} />

      {/* Top Bar */}
      <div style={{ background: '#00A859', color: '#000', padding: '10px 16px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
        🔥 সীমিত সময়ের জন্য সম্পূর্ণ ফ্রি! ছোট ব্যবসার মালিকদের অপরিহার্য ই-বুক।
      </div>

      <div className="main-container">
        <div className="content-grid">
          
          {/* LEFT: Intro & Details */}
          <div>
            <span className="heading-font" style={{ display: 'inline-block', background: 'rgba(0, 168, 89, 0.12)', color: '#00A859', padding: '6px 16px', borderRadius: '50px', fontSize: '0.88rem', marginBottom: '18px', border: '1px solid rgba(0, 168, 89, 0.3)', fontWeight: 600 }}>
              ✦ ফ্রি পিডিএফ গাইড (মূল্য ₹২৯৯)
            </span>

            <h1 className="heading-font" style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '18px', color: '#ffffff' }}>
              প্রতিদিন কাস্টমার হারাচ্ছেন? <br />
              <span className="gradient-text">জেনে নিন ওয়েবসাইটের সঠিক কৌশল!</span>
            </h1>

            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#9ca3af', marginBottom: '28px' }}>
              ওয়েবসাইট কেন দরকার, কীভাবে কাজে লাগবে এবং কীভাবে হাজার হাজার টাকার ভুল খরচ এড়াবেন—সবকিছু সহজ বাংলায় এই গাইডে সাজানো হয়েছে।
            </p>

            {/* Mockup Card */}
            <div className="mockup-banner">
              <img src="/ebook-mockup.png" alt="ই-বুক মকআপ" className="mockup-img" />
              <div>
                <span style={{ color: '#00ffd5', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>ডিজিটাল হাবিবুর প্রকাশনা</span>
                <h3 className="heading-font" style={{ fontSize: '1.3rem', color: '#fff', margin: '4px 0 8px' }}>
                  ছোট ব্যবসার ওয়েবসাইট গাইড
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>
                  ২৮ পৃষ্ঠার প্রিন্ট-রেডি ই-বুক, অডিট চেকলিস্ট ও বাজেট ওয়ার্কশিট সংবলিত।
                </p>
              </div>
            </div>

            {/* Chapter Preview */}
            <h3 className="heading-font" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '14px' }}>
              📖 এই গাইডের ভেতর যা যা থাকছে:
            </h3>
            <div>
              {chapters.map((item, idx) => (
                <div key={idx} className="chapter-row">
                  <span style={{ color: '#00A859', fontWeight: 700 }}>✓</span>
                  <span style={{ color: '#d1d5db' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lead-form-card">
            {isUnlocked ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: 'rgba(0, 168, 89, 0.15)', color: '#00A859', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 16px', border: '2px solid #00A859' }}>
                  ✓
                </div>
                <h3 className="heading-font" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '10px' }}>
                  অভিনন্দন, {name}! 🎉
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '22px' }}>
                  আপনার পিডিএফ গাইডটি ডাউনলোড শুরু হয়ে গেছে। নিচে ক্লিক করেও ডাউনলোড করতে পারেন:
                </p>

                <button onClick={triggerPdfDownload} className="heading-font submit-btn" style={{ marginBottom: '24px' }}>
                  📥 আবার ডাউনলোড করুন (PDF)
                </button>

                <div style={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '14px', padding: '16px', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 700, textTransform: 'uppercase' }}>🔥 স্পেশাল অফার</span>
                  <h4 className="heading-font" style={{ fontSize: '1.1rem', color: '#fff', margin: '4px 0 6px' }}>
                    মাত্র ৪,০০০ টাকায় কমপ্লিট বিজনেস ওয়েবসাইট চান?
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '12px' }}>
                    ১ বছরের ডোমেইন, হোস্টিং ও লিড ফর্মসহ পুরো প্যাকেজ দেখুন।
                  </p>
                  <a href="/special-offer" className="heading-font" style={{ display: 'block', textAlign: 'center', background: '#00A859', color: '#000', padding: '10px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                    অফারটি দেখুন ➔
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                  <h2 className="heading-font" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
                    ফ্রি গাইডটি পেতে ফর্মটি পূরণ করুন
                  </h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem' }}>
                    সঠিক তথ্য দিয়ে নিচের ফর্মটি ফিলাপ করলেই ডাউনলোড আনলক হয়ে যাবে।
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">আপনার নাম *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="যেমন: রাহুল সেন" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">অরিজিনাল মোবাইল / WhatsApp নম্বর *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="১০ সংখ্যার নম্বর (যেমন: 98765XXXXX)" 
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">আপনার ইমেইল আইডি *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="example@gmail.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">আপনার পেশা বা ব্যবসার ধরন *</label>
                    <select 
                      className="form-control" 
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
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem', textAlign: 'center' }}>
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="heading-font submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? '⏳ যাচাই করা হচ্ছে...' : '📥 ফ্রি পিডিএফ ডাউনলোড করুন'}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#737373', marginTop: '14px' }}>
                    🔒 আপনার তথ্য ১০০% সুরক্ষিত থাকবে। কোনো স্প্যাম করা হবে না।
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
