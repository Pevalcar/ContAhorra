export interface TransactionTotal {
  totalExpenses: number;
  totalIncome: number;
  totalTransferences: number;
  totalPrestamos: number;
}

export type TiposDeTransacciones = "Ingreso" | "Gasto" | "Préstamo" | "Transferencia";

export type MyIconos =
  | "Home"
  | "Settings"
  | "Plus"
  | "List"
  | "ClipboardList"
  | "FileEdit"
  | "PiggyBank"
  | "SwitchCamera"
  | "CameraFlip"
  | "Torch"
  | "Disc"
  | "Close"
  | "Shoping"
  | "Wallet"
  | "DarkMode"
  | "Shoping"
  | "Delete";
