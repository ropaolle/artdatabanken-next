import Image from "next/image";

export default function Test() {
  return (
    <div className="flex items-center gap-12">
      <div>
        <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
      </div>
      <div>
        <Image src="/bird.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
      </div>
      <div>
        <Image src="/black-bird.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
      </div>
    </div>
  );
}
