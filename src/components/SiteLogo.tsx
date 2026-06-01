import Image from "next/image";
import Link from "next/link";
import { UPSC_HUB_PATH } from "@/lib/upsc-syllabus";

type SiteLogoProps = {
  /** Show full horizontal logo or compact MD icon only */
  variant?: "full" | "icon";
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  variant = "full",
  className = "",
  priority = false,
}: SiteLogoProps) {
  if (variant === "icon") {
    return (
      <Link href={UPSC_HUB_PATH} className={`site-logo site-logo--icon ${className}`.trim()}>
        <Image
          src="/favicon.png"
          alt="Mentors Daily"
          width={36}
          height={36}
          priority={priority}
        />
      </Link>
    );
  }

  return (
    <Link href={UPSC_HUB_PATH} className={`site-logo site-logo--full ${className}`.trim()}>
      <Image
        src="/images/mentors-daily-logo.png"
        alt="Mentors Daily — UPSC Notes"
        width={200}
        height={56}
        priority={priority}
        className="site-logo__img"
      />
    </Link>
  );
}
