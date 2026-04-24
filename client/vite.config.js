import react from '@vitejs/plugin-react'; //Importing the engine so the vite understands react
import { defineConfig } from 'vite'; // This is a helper function so if mispell a setting then the editor will warn us. 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], //Activates the react plugin we imported above.
  server: {
    proxy: { // This tells the vite that the server acts as a proxy for our API calls. 
      // It forwards all calls starting with /api to the backend server.
      '/api': {
        target: 'http://localhost:5000', // The backend port
        changeOrigin: true, // This allows the vite to change the origin of the request to match the backend
        // This is needed to avoid CORS errors (which is when the browser blocks requests from one origin to another) 
      },
    },
  },
})
