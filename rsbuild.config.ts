import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  plugins: [
    pluginReact(), 
    pluginSass(),
    pluginModuleFederation(moduleFederationConfig),
    pluginSvgr({mixedImport: true}),
  ],
  server: {
    port: 3001,
  },
});
