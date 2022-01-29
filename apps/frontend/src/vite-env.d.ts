/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
