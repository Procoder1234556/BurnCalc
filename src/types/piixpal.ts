import type { DetailedHTMLProps, HTMLAttributes } from "react";

type PiixPalProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  pal?: string;
  on?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "piix-pal": PiixPalProps;
      "piix-sprite": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        sprite?: string;
      };
    }
  }
}

export {};
