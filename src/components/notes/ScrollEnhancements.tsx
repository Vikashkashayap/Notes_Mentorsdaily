"use client";

import { useEffect } from "react";

export function ScrollEnhancements() {
  useEffect(() => {
    const jumpTop = document.getElementById("jumpTop");
    const topicLinks = document.querySelectorAll<HTMLAnchorElement>("#topicNav a");
    const topicSections = document.querySelectorAll<HTMLElement>(".topic-section");
    const navProgress = document.getElementById("navProgress");

    const onScroll = () => {
      if (!jumpTop) return;
      if (window.scrollY > 600) jumpTop.classList.add("visible");
      else jumpTop.classList.remove("visible");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    jumpTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target as HTMLElement;
          const id = section.id;
          const num = section.dataset.topic;
          topicLinks.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
          if (navProgress && num) {
            navProgress.textContent = `Topic ${num} / 12`;
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    topicSections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
