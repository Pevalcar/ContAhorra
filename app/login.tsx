import { LoginUI } from "@/components/Login/LoginUI";
import { UserInfoUI } from "@/components/Login/UserInfoUI";
import { Screen } from "@/components/Screen";
import { useSession } from "@/lib/providers/ctx";
import React from "react";

export default function Login() {
  const { session } = useSession();
  //TODO estilizar mas lindo
  return <Screen>{session === null ? <LoginUI /> : <UserInfoUI />}</Screen>;
}
