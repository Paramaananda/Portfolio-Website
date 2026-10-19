import Image from "next/image";
import { orgLogos } from "@/content/logos";

/** Organisation logo on a white tile, so it reads on light, dark, and ember backgrounds. */
export function OrgLogo({ name, className = "size-10" }: { name: string; className?: string }) {
  const logo = orgLogos[name];
  if (!logo) return null;
  return (
    <span className={`grid shrink-0 place-items-center rounded-[10px] bg-white ring-1 ring-black/5 ${logo.wide ? "p-[3px]" : "p-1"} ${className}`}>
      <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="size-full object-contain" />
    </span>
  );
}
