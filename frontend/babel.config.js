module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        useBuiltIns: "usage", // 필요한 것만
        corejs: 3,
        modules: false, // es6(false) vs commonjs(true)
      }
    ]
  ]

  const plugins = [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          imgs: "./pulic/images",
        }
      }
    ]
  ]

  return {
    presets,
    plugins
  }
};