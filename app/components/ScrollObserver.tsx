"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
  const pathname = usePathname(); // পেজ চেঞ্জ হলেও যাতে অ্যানিমেশন কাজ করে

  useEffect(() => {
    // Observer তৈরি করা হচ্ছে
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view'); // স্ক্রিনে এলেই অ্যানিমেশন প্লে হবে
          // observer.unobserve(entry.target); // আপনি চাইলে একবার অ্যানিমেশন হওয়ার পর থামিয়ে দিতে পারেন
        }
      });
    }, { threshold: 0.1 }); // সেকশনের ১০% স্ক্রিনে এলেই অ্যানিমেশন শুরু হবে

    // DOM রেন্ডার হওয়ার জন্য হালকা ডিলে (Delay)
    setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.animate-fade-up');
      hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect(); // মেমোরি লিক ঠেকানোর জন্য
  }, [pathname]);

  return null; // এটি ব্যাকগ্রাউন্ডে কাজ করবে, তাই স্ক্রিনে কিছু দেখাবে না
}