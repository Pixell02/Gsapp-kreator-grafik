export type props = {
  [key: string]: string;
  pl: string;
  en: string;
  fr: string;
  de: string;
  es: string;
};

export type translationProps = {
  individualGraphics: props;
  themes: props;
  type: props;
};
