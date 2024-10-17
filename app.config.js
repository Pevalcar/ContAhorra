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
      bundleIdentifier: "com.pevalcar.contahorra",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.pevalcar.contahorra",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
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
      fireBase: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
      },
      google: {
        webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
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
