type ModularizationBannerIllustrationProps = {
  variant: "new" | "legacy";
};

const ART = {
  new: {
    light: { src: "/banner-new-roles-light.jpg", width: 576, height: 341 },
    dark: { src: "/banner-illustration-new.png", width: 1024, height: 667 },
  },
  legacy: {
    light: { src: "/banner-legacy-roles-light.jpg", width: 576, height: 341 },
    dark: { src: "/banner-illustration-legacy.png", width: 1024, height: 692 },
  },
} as const;

export function ModularizationBannerIllustration({ variant }: ModularizationBannerIllustrationProps) {
  const art = ART[variant];

  return (
    <div className="um-modularization-banner__art">
      <img
        className="um-modularization-banner__illustration um-modularization-banner__illustration--light"
        src={art.light.src}
        alt=""
        aria-hidden
        width={art.light.width}
        height={art.light.height}
        decoding="async"
      />
      <img
        className="um-modularization-banner__illustration um-modularization-banner__illustration--dark"
        src={art.dark.src}
        alt=""
        aria-hidden
        width={art.dark.width}
        height={art.dark.height}
        decoding="async"
      />
    </div>
  );
}
