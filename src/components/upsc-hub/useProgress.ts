"use client";

import { useCallback, useEffect, useState } from "react";
import { PROGRESS_STORAGE_KEY } from "@/lib/upsc-syllabus";

export function useProgress() {
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setDoneSet(new Set(arr));
      }
    } catch {
      setDoneSet(new Set());
    }
    setReady(true);
  }, []);

  const toggleDone = useCallback((id: string) => {
    setDoneSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(
          PROGRESS_STORAGE_KEY,
          JSON.stringify([...next]),
        );
      } catch {
        /* ignore quota errors */
      }
      return next;
    });
  }, []);

  return { doneSet, toggleDone, ready };
}
