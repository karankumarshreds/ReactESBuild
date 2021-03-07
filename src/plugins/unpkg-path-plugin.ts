import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        return { path: args.path, namespace: 'a' };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              // tiny-test-package exists on internet
              // this will by default look for package 
              // inside node_modules on our filesystem
              // unless we override the onLoad method
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
      });
    },
  };
};

/**
 * using external package that exports 'hi there!'
 * https://unpkg.com/tiny-test-pkg@1.0.0/index.js
 */
