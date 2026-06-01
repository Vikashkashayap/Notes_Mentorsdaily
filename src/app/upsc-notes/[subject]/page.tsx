import { redirect, notFound } from "next/navigation";
import { SUBJECT_SLUG } from "@/lib/seo/slugs";
import { isValidSubjectKey } from "@/lib/upsc-syllabus";
import type { SubjectKey } from "@/lib/upsc-syllabus/types";

type PageProps = {
  params: Promise<{ subject: string }>;
};

export default async function LegacySubjectRedirect({ params }: PageProps) {
  const { subject } = await params;
  if (!isValidSubjectKey(subject)) notFound();
  if (subject === "all") redirect("/");
  redirect(`/${SUBJECT_SLUG[subject as SubjectKey]}`);
}
