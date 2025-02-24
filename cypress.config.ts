import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3qv7gb',
  e2e: {
    baseUrl: 'http://localhost:3000', // Replace with your application's base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
