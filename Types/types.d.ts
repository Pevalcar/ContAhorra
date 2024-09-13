export type Transaccion = {
  readonly id: string;
  title?: string;
  balance: number;
  type: TiposDeTransacciones;
  date: number;
  description?: string;
  category?: string;
  account?: string;
};

export type Categoria = {
  readonly id?: string;
  readonly name: string;
  icon: MyIconos;
};

export type TiposDeTransacciones =
  | "Ingreso"
  | "Gasto"
  | "Préstamo"
  | "Transferencia";

export type Cuenta = {
  readonly id?: string;
  readonly name: string;
  icon: MyIconos;
};

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

export type localization = "es" | "en";
