const defaultAssetExts =
  require("metro-config/src/defaults/defaults").assetExts;
const { getDefaultConfig } = require("expo/metro-config");
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    resolver: {
      assetExts: [...defaultAssetExts, "PNG"],
    },
  };
})();
