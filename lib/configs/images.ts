import { TiposDeTransacciones } from "@/Types/types";
import { ArrowRightCircle, DollarSign, LucideIcon, ShoppingBag } from "lucide-react-native";

export const avatars = [
  "avatar_1",
  "avatar_2",
  "avatar_3",
  "avatar_4",
  "avatar_5",
  "avatar_6",
  "avatar_7",
  "avatar_8",
  "avatar_9",
  "avatar_10",
  "avatar_11",
  "avatar_12",
  "avatar_13",
];

export const IconTypes: Record<TiposDeTransacciones, LucideIcon> = {
  Gasto: ShoppingBag,
  Ingreso: DollarSign,
  Transferencia: ArrowRightCircle,
};

export const Iconos = [
  "Home",
  "Settings",
  "Plus",
  "List",
  "ClipboardList",
  "FileEdit",
  "PiggyBank",
  "SwitchCamera",
  "CameraFlip",
  "Torch",
  "Disc",
  "Close",
  "Shoping",
  "Wallet",
  "DarkMode",
  "Shoping",
  "Delete",
] as const;
