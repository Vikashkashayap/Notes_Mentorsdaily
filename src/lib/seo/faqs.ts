import type { Chapter } from "@/lib/upsc-syllabus/types";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";
import { SYLLABUS_DATA } from "@/lib/upsc-syllabus/data";
import { UPSC_EXAM_YEAR } from "./constants";

export type FaqItem = {
  question: string;
  answer: string;
};

export function generateTopicFaqs(
  subjectKey: SubjectKey,
  chapter: Chapter,
): FaqItem[] {
  const subject = SYLLABUS_DATA[subjectKey];
  const tags = (chapter.tags ?? []).slice(0, 3).join(", ");

  return [
    {
      question: `Why is ${chapter.title} important for UPSC ${UPSC_EXAM_YEAR}?`,
      answer: `${chapter.title} is part of ${subject.name} (${subject.paper}). It carries high weightage in Prelims (${chapter.prelims}/15 relevance) and Mains (${chapter.mains}/10). ${chapter.sub}`,
    },
    {
      question: `How should I prepare ${chapter.title} for UPSC Prelims?`,
      answer: `Focus on factual clarity, PYQs, and ${tags || "core concepts"}. Read this note once for structure, then revise with MCQ practice and current-affairs linkages for UPSC Prelims ${UPSC_EXAM_YEAR}.`,
    },
    {
      question: `How is ${chapter.title} asked in UPSC Mains?`,
      answer: `Mains questions on ${chapter.title} often need analytical answers linking constitutional/statutory framework with examples. Use headings, diagrams, and recent developments while staying within ${subject.paper} syllabus scope.`,
    },
    {
      question: `What are the most important topics within ${chapter.title}?`,
      answer: `Key areas include: ${chapter.sub}. Tags to prioritise: ${(chapter.tags ?? []).slice(0, 6).join(", ") || chapter.title}.`,
    },
    {
      question: `How long does it take to complete ${chapter.title} notes?`,
      answer: `Estimated reading time is ${chapter.readTime} minutes. Allow 2–3 revision cycles and PYQ practice for exam-ready retention before UPSC ${UPSC_EXAM_YEAR}.`,
    },
    {
      question: `Which books should I refer along with these ${chapter.title} notes?`,
      answer: `Pair these notes with standard references for ${subject.name} (NCERT/Laxmikanth/RS Sharma as applicable), previous year papers, and Mentors Daily test series for integrated Prelims + Mains preparation.`,
    },
  ];
}
