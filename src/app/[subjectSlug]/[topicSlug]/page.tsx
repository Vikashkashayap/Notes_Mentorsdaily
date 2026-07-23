import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicNotesBody } from "@/components/notes/TopicNotesBody";
import { TopicNotesEnhancements } from "@/components/notes/TopicNotesEnhancements";
import { TopicNotesFooterNav } from "@/components/notes/TopicNotesFooterNav";
import { TopicPageLayout } from "@/components/notes/TopicPageLayout";
import { EthicsTopicFooterNav } from "@/components/notes/EthicsTopicFooterNav";
import { EthicsTopicNotesBody } from "@/components/notes/EthicsTopicNotesBody";
import { MedievalTopicFooterNav } from "@/components/notes/MedievalTopicFooterNav";
import { MedievalTopicNotesBody } from "@/components/notes/MedievalTopicNotesBody";
import { ModernTopicFooterNav } from "@/components/notes/ModernTopicFooterNav";
import { ModernTopicNotesBody } from "@/components/notes/ModernTopicNotesBody";
import { WorldTopicFooterNav } from "@/components/notes/WorldTopicFooterNav";
import { WorldTopicNotesBody } from "@/components/notes/WorldTopicNotesBody";
import { WorldGeoTopicFooterNav } from "@/components/notes/WorldGeoTopicFooterNav";
import { WorldGeoTopicNotesBody } from "@/components/notes/WorldGeoTopicNotesBody";
import { buildTopicMetadata, publisherMetadata } from "@/lib/seo/metadata";
import { getChapterByTopicSlug } from "@/lib/seo/routes";
import {
  getAllTopicPaths,
  resolveSubjectFromParam,
} from "@/lib/seo/routes";
import { SUBJECT_SLUG } from "@/lib/seo/slugs";
import { isAncientTopicId, type AncientTopicId } from "@/lib/ancient-notes";
import { isEthicsTopicId, type EthicsTopicId } from "@/lib/ethics-notes";
import { isMedievalTopicId, type MedievalTopicId } from "@/lib/medieval-notes";
import { isModernTopicId, type ModernTopicId } from "@/lib/modern-notes";
import { isWorldTopicId, type WorldTopicId } from "@/lib/world-notes";
import { isWorldGeoTopicId, type WorldGeoTopicId } from "@/lib/worldgeo-notes";
import { isPolityTopicId, type PolityTopicId } from "@/lib/polity-notes";
import { isSocietyTopicId, type SocietyTopicId } from "@/lib/society-notes";
import { isSecurityTopicId, type SecurityTopicId } from "@/lib/security-notes";
import { isDisasterTopicId, type DisasterTopicId } from "@/lib/disaster-notes";
import { isScienceTopicId, type ScienceTopicId } from "@/lib/science-notes";
import { isCultureTopicId, type CultureTopicId } from "@/lib/culture-notes";
import {
  isPostindependenceTopicId,
  type PostindependenceTopicId,
} from "@/lib/postindependence-notes";
import { isEconomyTopicId, type EconomyTopicId } from "@/lib/economy-notes";
import {
  isEnvironmentTopicId,
  type EnvironmentTopicId,
} from "@/lib/environment-notes";
import {
  isGovernanceTopicId,
  type GovernanceTopicId,
} from "@/lib/governance-notes";
import { isIrTopicId, type IrTopicId } from "@/lib/ir-notes";
import { PolityTopicFooterNav } from "@/components/notes/PolityTopicFooterNav";
import { PolityTopicNotesBody } from "@/components/notes/PolityTopicNotesBody";
import { SocietyTopicFooterNav } from "@/components/notes/SocietyTopicFooterNav";
import { SocietyTopicNotesBody } from "@/components/notes/SocietyTopicNotesBody";
import { SecurityTopicFooterNav } from "@/components/notes/SecurityTopicFooterNav";
import { SecurityTopicNotesBody } from "@/components/notes/SecurityTopicNotesBody";
import { DisasterTopicFooterNav } from "@/components/notes/DisasterTopicFooterNav";
import { DisasterTopicNotesBody } from "@/components/notes/DisasterTopicNotesBody";
import { ScienceTopicFooterNav } from "@/components/notes/ScienceTopicFooterNav";
import { ScienceTopicNotesBody } from "@/components/notes/ScienceTopicNotesBody";
import { CultureTopicFooterNav } from "@/components/notes/CultureTopicFooterNav";
import { CultureTopicNotesBody } from "@/components/notes/CultureTopicNotesBody";
import { PostindependenceTopicFooterNav } from "@/components/notes/PostindependenceTopicFooterNav";
import { PostindependenceTopicNotesBody } from "@/components/notes/PostindependenceTopicNotesBody";
import { EconomyTopicFooterNav } from "@/components/notes/EconomyTopicFooterNav";
import { EconomyTopicNotesBody } from "@/components/notes/EconomyTopicNotesBody";
import { EnvironmentTopicFooterNav } from "@/components/notes/EnvironmentTopicFooterNav";
import { EnvironmentTopicNotesBody } from "@/components/notes/EnvironmentTopicNotesBody";
import { GovernanceTopicFooterNav } from "@/components/notes/GovernanceTopicFooterNav";
import { GovernanceTopicNotesBody } from "@/components/notes/GovernanceTopicNotesBody";
import { IrTopicFooterNav } from "@/components/notes/IrTopicFooterNav";
import { IrTopicNotesBody } from "@/components/notes/IrTopicNotesBody";

export const revalidate = 86400;

const RESERVED_SLUGS = new Set([
  "upsc-notes",
  "search",
  "api",
  "admin",
  "dashboard",
]);

type PageProps = {
  params: Promise<{ subjectSlug: string; topicSlug: string }>;
};

export function generateStaticParams() {
  return getAllTopicPaths().map(({ subjectKey, slug }) => ({
    subjectSlug: SUBJECT_SLUG[subjectKey],
    topicSlug: slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { subjectSlug, topicSlug } = await params;
  const subjectKey = resolveSubjectFromParam(subjectSlug);
  if (!subjectKey) return { title: "Not Found" };
  const chapter = getChapterByTopicSlug(subjectKey, topicSlug);
  if (!chapter || chapter.status !== "live") return { title: "Not Found" };
  return { ...buildTopicMetadata(subjectKey, chapter), ...publisherMetadata };
}

export default async function TopicPage({ params }: PageProps) {
  const { subjectSlug, topicSlug } = await params;
  if (RESERVED_SLUGS.has(subjectSlug)) notFound();
  const subjectKey = resolveSubjectFromParam(subjectSlug);
  if (!subjectKey) notFound();

  const chapter = getChapterByTopicSlug(subjectKey, topicSlug);
  if (!chapter || chapter.status !== "live") notFound();

  const isAncient =
    subjectKey === "ancient" && isAncientTopicId(chapter.id);
  const isMedieval =
    subjectKey === "medieval" && isMedievalTopicId(chapter.id);
  const isModern =
    subjectKey === "history" && isModernTopicId(chapter.id);
  const isWorld =
    subjectKey === "worldhistory" && isWorldTopicId(chapter.id);
  const isWorldGeo =
    subjectKey === "worldgeo" && isWorldGeoTopicId(chapter.id);
  const isEthics = subjectKey === "ethics" && isEthicsTopicId(chapter.id);
  const isPolity = subjectKey === "polity" && isPolityTopicId(chapter.id);
  const isSociety = subjectKey === "society" && isSocietyTopicId(chapter.id);
  const isSecurity = subjectKey === "security" && isSecurityTopicId(chapter.id);
  const isDisaster = subjectKey === "disaster" && isDisasterTopicId(chapter.id);
  const isScience = subjectKey === "science" && isScienceTopicId(chapter.id);
  const isCulture = subjectKey === "culture" && isCultureTopicId(chapter.id);
  const isPostindependence =
    subjectKey === "postindependence" &&
    isPostindependenceTopicId(chapter.id);
  const isEconomy = subjectKey === "economy" && isEconomyTopicId(chapter.id);
  const isEnvironment =
    subjectKey === "environment" && isEnvironmentTopicId(chapter.id);
  const isGovernance =
    subjectKey === "governance" && isGovernanceTopicId(chapter.id);
  const isIr = subjectKey === "ir" && isIrTopicId(chapter.id);

  if (isAncient) {
    const topicId = chapter.id as AncientTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <TopicNotesBody topicId={topicId} />
        <TopicNotesFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isMedieval) {
    const topicId = chapter.id as MedievalTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <MedievalTopicNotesBody topicId={topicId} />
        <MedievalTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isModern) {
    const topicId = chapter.id as ModernTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <ModernTopicNotesBody topicId={topicId} />
        <ModernTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isWorld) {
    const topicId = chapter.id as WorldTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <WorldTopicNotesBody topicId={topicId} />
        <WorldTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isWorldGeo) {
    const topicId = chapter.id as WorldGeoTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <WorldGeoTopicNotesBody topicId={topicId} />
        <WorldGeoTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isEthics) {
    const topicId = chapter.id as EthicsTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <EthicsTopicNotesBody topicId={topicId} />
        <EthicsTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isPolity) {
    const topicId = chapter.id as PolityTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <PolityTopicNotesBody topicId={topicId} />
        <PolityTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isSociety) {
    const topicId = chapter.id as SocietyTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <SocietyTopicNotesBody topicId={topicId} />
        <SocietyTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isSecurity) {
    const topicId = chapter.id as SecurityTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <SecurityTopicNotesBody topicId={topicId} />
        <SecurityTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isDisaster) {
    const topicId = chapter.id as DisasterTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <DisasterTopicNotesBody topicId={topicId} />
        <DisasterTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isScience) {
    const topicId = chapter.id as ScienceTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <ScienceTopicNotesBody topicId={topicId} />
        <ScienceTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isCulture) {
    const topicId = chapter.id as CultureTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <CultureTopicNotesBody topicId={topicId} />
        <CultureTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isPostindependence) {
    const topicId = chapter.id as PostindependenceTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <PostindependenceTopicNotesBody topicId={topicId} />
        <PostindependenceTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isEconomy) {
    const topicId = chapter.id as EconomyTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <EconomyTopicNotesBody topicId={topicId} />
        <EconomyTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isEnvironment) {
    const topicId = chapter.id as EnvironmentTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <EnvironmentTopicNotesBody topicId={topicId} />
        <EnvironmentTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isGovernance) {
    const topicId = chapter.id as GovernanceTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <GovernanceTopicNotesBody topicId={topicId} />
        <GovernanceTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  if (isIr) {
    const topicId = chapter.id as IrTopicId;
    return (
      <TopicPageLayout subjectKey={subjectKey} chapter={chapter}>
        <IrTopicNotesBody topicId={topicId} />
        <IrTopicFooterNav topicId={topicId} />
        <TopicNotesEnhancements />
      </TopicPageLayout>
    );
  }

  return <TopicPageLayout subjectKey={subjectKey} chapter={chapter} />;
}
