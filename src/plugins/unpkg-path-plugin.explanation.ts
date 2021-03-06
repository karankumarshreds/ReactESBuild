import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      /**
       * @onResolve
       * ESbuild figures out where the index.js file is
       * using onResolve method and this step is called
       * onResolve step.
       * We have overridden and modified this method to
       * hijack the default behaviour of finding the
       * main file
       * **********************************************
       * We are overriding these methods because if we
       * don't, then ESBuild will try to start the
       * searching and the loading process from the
       * local file system as its default behaviour
       * which we do not want
       * **********************************************
       * @filter
       * Filter defines the regex to look for a specific
       * type of file name. This is because we can have
       * multiple onResolve methods based on  different
       * types of files we are dealing with
       * **********************************************
       * @namespace
       * This is somewhat similar to the filer property
       * Whichever file is tried to be searched using a
       * onResolve method can be assigned to a namespace
       * Which can be further used with the onLoad method
       * to target all the files searched by the onResolve
       * using its filter regex
       */
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        return { path: args.path, namespace: 'a' };
      });
      /**
       * @onLoad
       * This step is when ESbuild attempts to load the
       * index.js file
       * We have overridden this method to return our
       * own JSX if the file is attempted to load
       */
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
        // if esbuild is trying to load index.js
        // do not do your (esbuilds) own thing
        // rather return the jsx provided by us
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        }
        // and if you try and load anything besides the
        // index.js file, here it is, use and return this
        else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};
