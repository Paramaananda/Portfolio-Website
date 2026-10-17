/**
 * Language-neutral facts. Every value here must come from a source file:
 *   [PDF]   content/portfolio-garuda.pdf (portfolio deck, Garuda Indonesia submission)
 *   [USER]  given directly in the brief
 * Anything unclear is listed in content/PERLU-KONFIRMASI.md.
 */
export const profile = {
  name: "I Putu Paramaananda Tanaya", // [PDF]
  shortName: "Paramaananda", // [PDF] given name
  university: "Universitas Brawijaya", // [PDF] "Alumni of"
  email: "anandtanaya22@gmail.com", // [PDF]
  links: {
    linkedin: "https://www.linkedin.com/in/paramaananda-tanaya", // [USER] [PDF]
    github: "https://github.com/Paramaananda", // [PDF] page 9 link
    instagram: "https://www.instagram.com/paramaananda/", // [USER] 17 Oct 2026
  },
  portrait: {
    src: "/images/portrait-graduation.webp", // [PDF] cover photo, background removed in source
    width: 885,
    height: 1983,
  },
} as const;
