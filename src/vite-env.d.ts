/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REVEAL_CODE?: string;
  readonly VITE_SLACK_SUMMARY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
