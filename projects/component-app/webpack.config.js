const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "componentApp",
    publicPath: "auto",
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      // library: { type: "module" },

      // For remotes (please adjust)
      name: "componentApp",
      filename: "remoteEntry.js",
      exposes: {
        // './CustomTableModule': './projects/component-app/src/app/components/custom-table/custom-table.module.ts',
        './CustomTableComponent': './projects/component-app/src/app/components/custom-table/custom-table.component.ts',
      },

      // For hosts (please adjust)
      // remotes: {
      //     "hostApp": "http://localhost:4200/remoteEntry.js",
      //     "grafikApp": "http://localhost:4001/remoteEntry.js",
      //     "employeeApp": "http://localhost:4002/remoteEntry.js",

      // },

      shared: share({
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

        // "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ],
};
