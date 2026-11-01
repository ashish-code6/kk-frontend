export type HomeBanner = {
  slot: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  caption: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  isActive: boolean;
};

export type HomeBannerResponse = {
  success: boolean;
  message?: string;
  data?: HomeBanner[];
};
