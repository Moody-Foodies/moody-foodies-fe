// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://7a97657d-b4dd-468a-960b-563f46161622.mock.pstmn.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});