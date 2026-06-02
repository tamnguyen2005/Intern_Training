declare module "*.css";
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Bạn có thể thêm các biến VITE_ khác vào đây nếu có sau này
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
