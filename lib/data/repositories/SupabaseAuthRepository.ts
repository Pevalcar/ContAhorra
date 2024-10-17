import { supabase } from "@/lib/configs/supabase";
import { User } from "@/lib/domain/entities";
import { SupaBaseControlError } from "@/lib/domain/error/SupaBaseControlError";
import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default class SupabaseAuthRepository extends AuthRepositoryI {
  async login(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw SupaBaseControlError.getError(error.message);
    }

    if (!data.session) throw new Error("No user on the session!");
    const {
      data: datas,
      error: errors,
      status,
    } = await supabase.from("profiles").select("*").eq("id", data.session.user.id);
    if (errors && status !== 406) {
      throw SupaBaseControlError.getError(errors.message);
    }
    if (datas) {
      const user = User.fromSupabaseUser(data.user, datas[0]);

      return user;
    }
    //   const user = User.fromSupabaseUser(data);
    //   return user;
    return null;
  }
  async logout() {
    const { error } = await supabase.auth.signOut();
    GoogleSignin.signOut();
    if (error) {
      throw error;
    }
  }

  async register(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    if (data.user) {
      const {
        data: datas,
        error: errors,
        status,
      } = await supabase.from("profiles").select("*").eq("id", data.user.id);
      if (errors && status !== 406) {
        throw SupaBaseControlError.getError(errors.message);
      }
      if (datas) {
        const user = User.fromSupabaseUser(data.user, datas[0]);

        return user;
      }
    }
    return null;
  }

  async fetchUser(): Promise<User | null> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      return null;
    }
    if (!session) return null;
    const {
      data: datas,
      error: errors,
      status,
    } = await supabase.from("profiles").select("*").eq("id", session.user.id);
    if (errors && status !== 406) {
      throw errors;
    }
    if (datas) {
      const user = User.fromSupabaseUser(session.user, datas[0]);
      return user;
    }
    return null;
  }

  async updateProfile(displayName: string, photoURL: string): Promise<void> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    if (!session) throw new Error("No user on the session!");

    const { error: errorUpdate } = await supabase
      .from("profiles")
      .update({
        username: displayName,
        full_name: displayName,
        avatar_url: photoURL,
      })
      .eq("id", session.user.id)
      .select();
    if (errorUpdate) {
      console.log(" error en  updateProfile Supabase" + errorUpdate);
      throw SupaBaseControlError.getError(errorUpdate.message);
    }
  }
  async recoverPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
  }
  async sendEmailVerification(): Promise<void> {
    throw new Error("Revisa tu correo.");
  }

  async updatePassword(password: string, newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
  }

  async signInWhitGoogle(): Promise<User | null> {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.google.webClientId,
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });
        if (error) {
          throw error;
        }
        if (data) {
          const {
            data: datas,
            error: errors,
            status,
          } = await supabase.from("profiles").select("*").eq("id", data.user.id);
          if (errors && status !== 406) {
            throw errors;
          }
          if (datas) {
            const user = User.fromSupabaseUser(data.user, datas[0]);
            return user;
          }
        }
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw SupaBaseControlError.getError("Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw SupaBaseControlError.getError("In progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw SupaBaseControlError.getError("Play services not available");
      } else {
        throw SupaBaseControlError.getError("Some other error");
      }
    }
    return null;
  }
}
