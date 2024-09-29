// Import the functions you need from the SDKs you need
import { DEVELOPMENT } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Analytics } from "firebase/analytics";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth, //@ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { Database, connectDatabaseEmulator, getDatabase } from "firebase/database";
import { Firestore, connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// extra: {
//       router: {
//         origin: false,
//       },
//       eas: {
//         projectId: "6e591dda-d45c-428f-b0df-e05941f564f4",
//       },
//       fireBase: {
//         apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//         authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//         projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//         storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//         appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
//         measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
//       },

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.fireBase?.apiKey,
  authDomain: Constants.expoConfig?.extra?.fireBase?.authDomain,
  projectId: Constants.expoConfig?.extra?.fireBase?.projectId,
  storageBucket: Constants.expoConfig?.extra?.fireBase?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.fireBase?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.fireBase?.appId,
  measurementId: Constants.expoConfig?.extra?.fireBase?.measurementId,
};
let app: FirebaseApp;
let auth: Auth;
let analytics: Analytics;
let db: Database;
let dbFirestore: Firestore;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  if (Platform.OS === "web") {
    auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
    });
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
  // analytics = getAnalytics(app);
  db = getDatabase(app);
  dbFirestore = getFirestore(app);
  console.log("Firebase App initialized");
} else {
  app = getApp();
  auth = getAuth();
  // analytics = getAnalytics();
  db = getDatabase();
  dbFirestore = getFirestore();
  console.log("Firebase App already initialized");
}
if (DEVELOPMENT) {
  const host = "192.168.1.2";
  connectAuthEmulator(auth, `http://${host}:9099`);
  connectDatabaseEmulator(db, host, 9000);
  connectFirestoreEmulator(dbFirestore, host, 8080);
  console.log("Connected to Firebase Emulators");
}

export { analytics, app, auth, db, dbFirestore };
