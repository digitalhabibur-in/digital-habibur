"use client"; // Required for form state and fetch API in Next.js

import React, { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ফর্মে সাবমিট করলে এই ফাংশনটি কাজ করবে
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 👉 আপনার দেওয়া গুগল শিটের ওয়েব অ্যাপ URL এখানে বসানো হয়েছে
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz-JVa4GJpWx8isx1GJHmzZrE2CPIsiZ3dUkthhb7-UgYsclcphwUTpzfr96rJlYRk/exec'; 

    try {
      // গুগল শিটে ডেটা পাঠানো হচ্ছে (CORS এরড় এড়াতে FormData ব্যবহার করা হলো)
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset(); // ফর্ম ক্লিয়ার করা
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // ৫ সেকেন্ড পর সাকসেস মেসেজ গায়েব করে দেওয়া
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <main>
      <section className="hero bg-dark" style={{ padding: '120px 0 80px' }}>
        <div className="hero-glow" style={{ top: '0' }}></div>
        <div className="container hero-content animate-fade-up" style={{ textAlign: 'center' }}>
          <span style={{ color: '#00A859', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'inline-block', marginBottom: '20px', background: 'rgba(0,168,89,0.1)', padding: '6px 12px', borderRadius: '50px' }}>
            <i className="fa-solid fa-paper-plane" style={{marginRight: '8px'}}></i> Let's Connect
          </span>
          <h1 style={{ marginBottom: '25px' }}>Ready to Start Your <span className="text-gradient">Project?</span></h1>
          <p style={{ fontSize: '1.15rem', color: '#a1a1aa', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
            Fill out the form below. The details will be sent directly to my secure database, and I will get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="bg-subtle" style={{ paddingBottom: '120px' }}>
        <div className="container">
          <div className="grid-2">
            
            {/* Left Side: Contact Information */}
            <div className="animate-fade-up">
              <h2 style={{ textAlign: 'left', marginBottom: '25px' }}>Contact Information</h2>
              <p style={{ marginBottom: '40px', fontSize: '1.05rem', color: '#8b949e', lineHeight: 1.8 }}>
                I am currently available for custom web development, WordPress ERPs, and automation projects. Reach out via email or fill out the form.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="icon-circle" style={{ margin: 0, width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Email Me</h4>
                    <p style={{ color: '#00A859', margin: 0, fontWeight: 600 }}>info@digitalhabibur.in</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="icon-circle" style={{ margin: 0, width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Call / WhatsApp</h4>
                    <p style={{ color: '#00A859', margin: 0, fontWeight: 600 }}>+91 9332361219</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="icon-circle" style={{ margin: 0, width: '50px', height: '50px', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Location</h4>
                    <p style={{ color: '#8b949e', margin: 0 }}>Nabadwip, Nadia, West Bengal, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: The Form (Connected to Google Sheets) */}
            <div className="glass-card animate-fade-up delay-1" style={{ padding: '50px' }}>
              <h3 style={{ marginBottom: '25px', fontSize: '1.5rem' }}>Send a Message</h3>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name or Company" required />
                <input type="tel" name="phone" placeholder="Phone No" required />
                <input type="email" name="email" placeholder="Email Address" required />
                <input type="text" name="service" placeholder="Service Needed (e.g. CRM, WordPress)" required />
                <textarea name="message" rows={5} placeholder="Tell me about your project or bottleneck..." required></textarea>
                
                {/* Error & Success Messages */}
                {errorMsg && <p style={{ color: '#ff5f56', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600 }}>{errorMsg}</p>}
                {isSuccess && <p style={{ color: '#00A859', marginBottom: '15px', fontSize: '0.9rem', fontWeight: 600, background: 'rgba(0,168,89,0.1)', padding: '10px', borderRadius: '6px' }}>✅ Message sent successfully! I will contact you soon.</p>}
                
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
