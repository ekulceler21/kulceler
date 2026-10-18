/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      src?: string;
      alt?: string;
      "auto-rotate"?: boolean | "";
      "camera-controls"?: boolean | "";
      "disable-zoom"?: boolean | "";
      "interaction-prompt"?: string;
      style?: React.CSSProperties;
    }, HTMLElement>;
  }
}
