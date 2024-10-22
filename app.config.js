import "dotenv/config";

export default {
  expo: {
    name: "cont-ahorra",
    slug: "cont-ahorra",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.pevalcar.contahorra",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "@react-native-google-signin/google-signin",
      "expo-router",
      "expo-localization",
      [
        "expo-asset",
        {
          assets: [
            "./assets/images/avatars/avatar_1.jpg",
            "./assets/images/avatars/avatar_2.jpg",
            "./assets/images/avatars/avatar_3.jpg",
            "./assets/images/avatars/avatar_4.jpg",
            "./assets/images/avatars/avatar_5.jpg",
            "./assets/images/avatars/avatar_6.jpg",
            "./assets/images/avatars/avatar_7.jpg",
            "./assets/images/avatars/avatar_8.jpg",
            "./assets/images/avatars/avatar_9.jpg",
            "./assets/images/avatars/avatar_10.jpg",
            "./assets/images/avatars/avatar_11.jpg",
            "./assets/images/avatars/avatar_12.jpg",
            "./assets/images/avatars/avatar_13.jpg",
          ],
        },
      ],
      [
        "expo-dev-launcher",
        {
          launchMode: "most-recent",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "6e591dda-d45c-428f-b0df-e05941f564f4",
      },
      google: {
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/6e591dda-d45c-428f-b0df-e05941f564f4",
    },
  },
};
