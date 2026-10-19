/**
 * Organisation logos, keyed by the exact name used in the dictionaries.
 * Sources (downloaded 19 Oct 2026, [USER] approved):
 *   Universitas Brawijaya: Wikimedia Commons, File:Logo Universitas Brawijaya.svg (256 px render → WebP)
 *   Garuda Indonesia: en.wikipedia, File:Garuda Indonesia Logo.svg (bird mark cropped via viewBox)
 *   SMA Negeri 3 Denpasar: id.wikipedia, Berkas:Logo SMAN 3 Denpasar.png (→ WebP)
 */
/** `wide`: a landscape mark; it gets less padding so it does not shrink to a sliver in a square tile. */
export type OrgLogo = { src: string; width: number; height: number; wide?: boolean };

export const orgLogos: Record<string, OrgLogo> = {
  "Garuda Indonesia": { src: "/images/logos/garuda-mark.png", width: 200, height: 87, wide: true },
  "PT TRAVLR GUIDES INDONESIA": { src: "/images/logos/travlr-mark.png", width: 200, height: 87, wide: true },
  "Universitas Brawijaya": { src: "/images/logos/brawijaya.webp", width: 160, height: 161 },
  "SMA Negeri 3 Denpasar": { src: "/images/logos/sman3-denpasar.webp", width: 160, height: 153 },
};
