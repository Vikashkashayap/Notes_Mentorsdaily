"use client";

type TopicNotesPrintButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function TopicNotesPrintButton({
  className = "",
  children = "Print / PDF",
}: TopicNotesPrintButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.print()}
    >
      {children}
    </button>
  );
}
