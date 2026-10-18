/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      src?: string;
      alt?: string;
      "camera-controls"?: boolean | string;
      "disable-zoom"?: boolean | string;
      "touch-action"?: string;
      "shadow-intensity"?: string;
      exposure?: string;
      style?: React.CSSProperties;
    }, HTMLElement>;
  }
}
