// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
 output: 'server',
 integrations: [
   sanity({
     projectId: 'ox03cu5z',
     dataset: 'production',
     useCdn: true,
     apiVersion: '2024-05-01',
   })
 ],
 vite: {
   plugins: [tailwindcss()],
   optimizeDeps: {
     exclude: ['react', 'react-dom']
   }
 }
});
