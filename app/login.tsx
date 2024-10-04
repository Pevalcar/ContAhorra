import { LoginUI } from "@/components/Login/LoginUI";
import { UserInfoUI } from "@/components/Login/UserInfoUI";
import { Screen } from "@/components/Screen";
import { useStoreSesion } from "@/lib/store";
import React from "react";

export default function Login() {
  const user = useStoreSesion((state) => state.user);
  //TODO estilizar mas lindo
  return <Screen>{user === null ? <LoginUI /> : <UserInfoUI />}</Screen>;
}
