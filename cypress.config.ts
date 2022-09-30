import { defineConfig } from 'cypress';

export default defineConfig({
  nodeVersion: 'system',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
