import { StyleSheet } from "react-native";

export interface ThemeColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  anccent: string;
  cardBackground: string;
  buttonTextColor: string;
  borderColor: string;
}

const colors: ThemeColors = {
  primary: "#eec3e8",
  text: "hsl(339, 20%, 20%)",
  secondary: "#c9ebf7ff",
  borderColor: "hsla(210,40%,80%)",
  background: "hsla(211, 81%, 94%, 1)",
  cardBackground: "hsl(210, 100%, 97%)",
  buttonTextColor: "black",
  anccent: "hsl(211, 86%, 70%)",
};

export const ligth = {
  colors: {
    primary: "rgb(136, 69, 136)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 214, 249)",
    onPrimaryContainer: "rgb(55, 0, 59)",
    secondary: "rgb(109, 88, 106)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(246, 219, 240)",
    onSecondaryContainer: "rgb(38, 22, 37)",
    tertiary: "rgb(130, 82, 71)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 218, 210)",
    onTertiaryContainer: "rgb(51, 17, 10)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(30, 26, 29)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(30, 26, 29)",
    surfaceVariant: "rgb(237, 222, 232)",
    onSurfaceVariant: "rgb(77, 68, 75)",
    outline: "rgb(127, 116, 124)",
    outlineVariant: "rgb(209, 195, 204)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(52, 47, 50)",
    inverseOnSurface: "rgb(248, 238, 242)",
    inversePrimary: "rgb(252, 172, 247)",
    elevation: {
      level0: "transparent",
      level1: "rgb(249, 242, 249)",
      level2: "rgb(246, 236, 246)",
      level3: "rgb(242, 231, 242)",
      level4: "rgb(241, 229, 241)",
      level5: "rgb(238, 226, 238)",
    },
    surfaceDisabled: "rgba(30, 26, 29, 0.12)",
    onSurfaceDisabled: "rgba(30, 26, 29, 0.38)",
    backdrop: "rgba(54, 46, 53, 0.4)",
  },
};

export const theme = {
  colors: {
    primary: "rgb(136, 69, 136)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 214, 249)",
    onPrimaryContainer: "rgb(55, 0, 59)",
    secondary: "rgb(109, 88, 106)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(246, 219, 240)",
    onSecondaryContainer: "rgb(38, 22, 37)",
    tertiary: "rgb(130, 82, 71)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 218, 210)",
    onTertiaryContainer: "rgb(51, 17, 10)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(30, 26, 29)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(30, 26, 29)",
    surfaceVariant: "rgb(237, 222, 232)",
    onSurfaceVariant: "rgb(77, 68, 75)",
    outline: "rgb(127, 116, 124)",
    outlineVariant: "rgb(209, 195, 204)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(52, 47, 50)",
    inverseOnSurface: "rgb(248, 238, 242)",
    inversePrimary: "rgb(252, 172, 247)",
    elevation: {
      level0: "transparent",
      level1: "rgb(249, 242, 249)",
      level2: "rgb(246, 236, 246)",
      level3: "rgb(242, 231, 242)",
      level4: "rgb(241, 229, 241)",
      level5: "rgb(238, 226, 238)",
    },
    surfaceDisabled: "rgba(30, 26, 29, 0.12)",
    onSurfaceDisabled: "rgba(30, 26, 29, 0.38)",
    backdrop: "rgba(54, 46, 53, 0.4)",
  },
};

export type Apptheme = typeof theme;

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },

  btnPrimary: {
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor: colors.borderColor,
  },
  btnTextPrimary: {
    marginBottom: 5,
    marginHorizontal: 10,
    alignItems: "center",
    color: colors.text,
    fontSize: 16,
  },
  btnPrimaryText: {
    color: theme.colors.onBackground,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.cardBackground,
    margin: 8,
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    minHeight: 150,
    minWidth: 150,
    gap: 10,
  },
});
