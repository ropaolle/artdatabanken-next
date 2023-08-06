import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <p>
        By{" "}
        <Link href="https://ropaolle.se/" target="_blank">
          {" "}
          RopaOlle{" "}
        </Link>
      </p>
    </div>
  );
}
