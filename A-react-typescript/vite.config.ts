import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: './', // для того что бы url файлов css и js при билде прописывался корректно то корневой папки
	plugins: [react()],
	server: {
		host: 'localhost',
		port: 3001,
	},
})
