import { Categoria, Cuenta, Perfil, Transaccion } from "@/lib/domain/entities";

const DB_Transacciones: Transaccion[] = [
  new Transaccion({
    id: "1",
    balance: 50.75,
    type: "Gasto",
    date: 1727740800, // 1 de octubre de 2024
    description: "Compra mensual en el supermercado",
    categoryID: "1",
    accountID: "1",
    userOwnerID: "1",
  }),
  new Transaccion({
    id: "2",
    balance: 1500,
    type: "Ingreso",
    date: 1728172800, // 5 de octubre de 2024
    description: "Salario mensual",
    categoryID: "2",
    accountID: "2",
    userOwnerID: "1",
  }),
  new Transaccion({
    id: "3",
    balance: 600,
    type: "Gasto",
    date: 1728604800, // 10 de octubre de 2024
    description: "Pago mensual de alquiler",
    categoryID: "3",
    accountID: "1",
    userOwnerID: "1",
  }),
  new Transaccion({
    id: "4",
    balance: 200,
    type: "Gasto",
    date: 1728604800, // 10 de octubre de 2024 (repetido)
    description: "Transferencia de cuenta bancaria a cuenta de ahorros",
    categoryID: "4",
    accountID: "2",
  }),
  new Transaccion({
    id: "5",
    balance: 120,
    type: "Gasto",
    date: 1729036800, // 15 de octubre de 2024
    description: "Compra de ropa en tienda",
    categoryID: "5",
    accountID: "1",
  }),
  new Transaccion({
    id: "6",
    balance: 1000,
    type: "Transferencia",
    date: 1729468800, // 20 de octubre de 2024
    description: "Pago de préstamo personal",
    categoryID: "6",
    accountID: "3",
  }),
  new Transaccion({
    id: "7",
    balance: 15000,
    type: "Transferencia",
    date: 1729468800, // 20 de octubre de 2024 (repetido)
    description: "Pago inicial de préstamo automotriz",
    categoryID: "6",
    accountID: "3",
  }),
  new Transaccion({
    id: "8",
    balance: 8000,
    type: "Gasto",
    date: 1729900800, // 25 de octubre de 2024
    description: "Pago mensual de préstamo estudiantil",
    categoryID: "6",
    accountID: "4",
  }),
  new Transaccion({
    id: "9",
    balance: 50000,
    type: "Gasto",
    date: 1730332800, // 28 de octubre de 2024
    description: "Pago mensual de préstamo hipotecario",
    categoryID: "6",
    accountID: "4",
  }),
  new Transaccion({
    id: "10",
    balance: 12000,
    type: "Gasto",
    date: 1730332800, // 28 de octubre de 2024 (repetido)
    description: "Pago mensual de préstamo hipotecario",
    categoryID: "6",
    accountID: "4",
  }),
  new Transaccion({
    id: "11",
    balance: 12000,
    type: "Gasto",
    date: 1728104400, // 28 de octubre de 2024 (repetido)
    description: "Pago mensual de préstamo hipotecario",
    categoryID: "6",
    accountID: "4",
  }),
  new Transaccion({
    id: "12",
    balance: 12000,
    type: "Gasto",
    date: 1733374800, // 28 de octubre de 2024 (repetido)
    description: "Pago mensual de préstamo hipotecario",
    categoryID: "6",
    accountID: "4",
  }),
  new Transaccion({
    id: "15",
    balance: 12000,
    type: "Gasto",
    date: 1728104400, // 28 de octubre de 2024 (repetido)
    description: "Pago mensual de préstamo hipotecario",
    categoryID: "6",
    accountID: "4",
  }),
];

const DB_Categorias: Categoria[] = [
  new Categoria({
    id: "1",
    name: "Alimentos",
    icon: "Shoping",
    userOwnerID: "1",
    type: "Gasto",
    uptodataBase: false,
  }),
  new Categoria({
    id: "2",
    name: "Ingresos",
    icon: "Plus",
    type: "Ingreso",
    userOwnerID: "1",
    uptodataBase: false,
  }),
  new Categoria({
    id: "3",
    name: "Vivienda",
    icon: "Home",
    type: "Gasto",
    userOwnerID: "1",
    uptodataBase: false,
  }),
  new Categoria({
    id: "4",
    name: "Transferencias",
    icon: "SwitchCamera",
    userOwnerID: "1",
    type: "Gasto",
    uptodataBase: false,
  }),
  new Categoria({
    id: "5",
    name: "Ropa",
    icon: "Shoping",
    type: "Gasto",
    userOwnerID: "1",
    uptodataBase: false,
  }),
  new Categoria({
    id: "6",
    name: "Reembolsos",
    icon: "ClipboardList",
    userOwnerID: "1",
    type: "Ingreso",
    uptodataBase: false,
  }),
  new Categoria({
    id: "7",
    name: "Entretenimiento",
    icon: "Disc",
    userOwnerID: "1",
    type: "Gasto",
    uptodataBase: false,
  }),
  new Categoria({
    id: "8",
    name: "Préstamos",
    icon: "FileEdit",
    type: "Transferencia",
    userOwnerID: "1",
    prestamo: true,
    uptodataBase: false,
  }),
  new Categoria({
    id: "17",
    name: "Transferencias",
    icon: "FileEdit",
    type: "Transferencia",
    userOwnerID: "1",
    uptodataBase: false,
  }),
  new Categoria({
    id: "9",
    name: "Servicios",
    icon: "Torch",
    type: "Gasto",
    userOwnerID: "1",
    uptodataBase: false,
  }),
  new Categoria({
    id: "10",
    name: "Comidas fuera",
    icon: "Shoping",
    type: "Gasto",
    userOwnerID: "1",
    uptodataBase: false,
  }),
];
const DB_Cuentas: Cuenta[] = [
  new Cuenta({
    id: "1",
    name: "Cuenta Bancaria",
    icon: "Wallet",
    userOwnerID: "1",
    uptodataBase: false,
    grupal: false,
  }),
  new Cuenta({
    id: "2",
    name: "Cuenta de Ahorros",
    icon: "PiggyBank",
    userOwnerID: "1",
    uptodataBase: false,
    grupal: true,
  }),
];

export const DB_PERFILES: Perfil[] = [
  new Perfil({
    id: "1",
    name: "Andry",
    avatar_url: "avatar_1",
    userOwnerID: "1",
    userReferredID: "1",
    uptodataBase: false,
  }),
  new Perfil({
    id: "2",
    name: "Pedry",
    avatar_url: "avatar_2",
    userOwnerID: "1",
    userReferredID: "1",
    uptodataBase: false,
  }),
  new Perfil({
    id: "3",
    name: "Mariluz",
    avatar_url: "avatar_3",
    userOwnerID: "1",
    userReferredID: "1",
    uptodataBase: false,
  }),
];

export { DB_Transacciones, DB_Categorias, DB_Cuentas };
