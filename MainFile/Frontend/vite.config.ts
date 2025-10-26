import { defineConfig } from 'vite';
// 1. ✅ ต้อง Import plugin สำหรับ React
import react from '@vitejs/plugin-react'; 
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    // 2. ✅ ใช้ plugin React
    react(),
    tailwindcss(),
  ],

});
