

-- Creamos la tabla

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS transacciones (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    title TEXT NOT NULL,
    balance REAL NOT NULL,
    type TEXT NOT NULL CHECK( type IN ('Gasto', 'Transferencia', 'Préstamo', 'Ingreso', 'Saldo') ),
    date INTEGER NOT NULL,
    description TEXT NOT NULL,
    category_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id),
    FOREIGN KEY(account_id) REFERENCES accounts(id)
);



INSERT INTO categories (id, name, icon) VALUES ('1', 'Alimentos', 'Shoping');
INSERT INTO categories (id, name, icon) VALUES ('2', 'Ingresos', 'Plus');
INSERT INTO categories (id, name, icon) VALUES ('3', 'Vivienda', 'Home');
INSERT INTO categories (id, name, icon) VALUES ('4', 'Transferencias', 'SwitchCamera');
INSERT INTO categories (id, name, icon) VALUES ('5', 'Ropa', 'Shoping');
INSERT INTO categories (id, name, icon) VALUES ('6', 'Reembolsos', 'ClipboardList');
INSERT INTO categories (id, name, icon) VALUES ('7', 'Entretenimiento', 'Disc');
INSERT INTO categories (id, name, icon) VALUES ('8', 'Préstamos', 'FileEdit');
INSERT INTO categories (id, name, icon) VALUES ('9', 'Servicios', 'Torch');
INSERT INTO categories (id, name, icon) VALUES ('10', 'Comidas fuera', 'Shoping');

SELECT * FROM categories;

INSERT INTO accounts (id, name, icon) VALUES ('1', 'Cuenta Bancaria', 'Wallet');
INSERT INTO accounts (id, name, icon) VALUES ('2', 'Cuenta de Ahorros', 'PiggyBank');   


INSERT INTO transacciones (id, title, balance, type, date, description, category_id, account_id) VALUES ('1', 'Compra supermercado', 50.75, 'Gasto', 1624317330000, 'Compra mensual en el supermercado', '1', '1');
INSERT INTO transacciones (id, title, balance, type, date, description, category_id, account_id) VALUES ('2', 'Salario', 1500, 'Ingreso', 1798051730000, 'Salario mensual', '2', '2');
INSERT INTO transacciones (id, title, balance, type, date, description, category_id, account_id) VALUES ('3', 'Pago alquiler', 600, 'Gasto', 1598051730000, 'Pago mensual de alquiler', '3', '1');  
INSERT INTO transacciones (id, title, balance, type, date, description, category_id, account_id) VALUES ('4', 'Transferencia entre cuentas', 200, 'Transferencia', 1598051830000, 'Transferencia de cuenta bancaria a cuenta de ahorros', '4', '2');
INSERT INTO transacciones (id, title, balance, type, date, description, category_id, account_id) VALUES ('5', 'Compra de ropa', 120, 'Gasto', 1632266130000, 'Compra de ropa en tienda', '5', '1');
INSERT INTO transacciones (id, title, balance, type, date, description, category_id, account_id) VALUES ('6', 'Reembolso amigo', 50, 'Ingreso', 1598052030000, 'Reembolso por préstamo', '6', '1');


