import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'fiap_mf_main',
  exposes: {
    './MainPage': './src/components/MainPage/MainPage.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  getPublicPath: 'http://localhost:3001/',
});
