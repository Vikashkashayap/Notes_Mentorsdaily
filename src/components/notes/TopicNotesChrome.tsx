import { SiteNavbar } from "@/components/SiteNavbar";
import { getAncientChapter, type AncientTopicId } from "@/lib/ancient-notes";
import { subjectHubPath } from "@/lib/seo";

type TopicNotesChromeProps = {
  topicId: AncientTopicId;
};

/** @deprecated Use TopicPageLayout — kept for compatibility. */
export function TopicNotesChrome({ topicId }: TopicNotesChromeProps) {
  const chapter = getAncientChapter(topicId);

  return (
    <SiteNavbar
      variant="notes"
      breadcrumbs={[
        { label: "Home", href: "/" },
        {
          label: "Ancient History",
          href: subjectHubPath("ancient"),
        },
        { label: chapter?.title ?? topicId },
      ]}
      backHref={subjectHubPath("ancient")}
      backLabel="← Ancient History"
    />
  );
}
