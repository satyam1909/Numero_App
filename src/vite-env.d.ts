/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_TRACKING_ID?: string
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

