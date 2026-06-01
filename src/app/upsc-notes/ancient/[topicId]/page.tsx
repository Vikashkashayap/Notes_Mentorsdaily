import { notFound, redirect } from "next/navigation";
import {
  ancientTopicPath,
  isAncientTopicId,
} from "@/lib/ancient-notes";

type PageProps = {
  params: Promise<{ topicId: string }>;
};

export default async function LegacyAncientTopicRedirect({
  params,
}: PageProps) {
  const { topicId } = await params;
  if (!isAncientTopicId(topicId)) notFound();
  redirect(ancientTopicPath(topicId));
}
