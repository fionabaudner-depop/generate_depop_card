import Link from "next/link";
import styles from "./BackLink.module.css";

type Props = {
  href?: string;
  label?: string;
};

export function BackLink({ href = "/", label = "Prototypes" }: Props) {
  return (
    <Link href={href} className={styles.backLink}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M11 7H3M7 3 3 7l4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Link>
  );
}
