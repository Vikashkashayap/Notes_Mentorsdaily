"use client";

import { useEffect } from "react";

/** Binds interactive behaviour from imported topic HTML (self-tests, etc.). */
export function TopicNotesEnhancements() {
  useEffect(() => {
    document.querySelectorAll(".self-test-q").forEach((el) => {
      el.addEventListener("click", function (this: HTMLElement) {
        this.classList.toggle("open");
      });
    });
  }, []);

  return null;
}
