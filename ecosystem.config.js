module.exports = {
  apps: [
    {
      name: "ogt-admin",
      script: "./.output/server/index.mjs",
      exec_mode: "cluster",
      instances: 1, // run only one instance
      interpreter: "node",
    },
  ],
};
