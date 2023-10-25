--Tabela para armazenar as informações das contas
CREATE TABLE IF NOT EXISTS contas (
	contaid bigserial constraint pk_contas PRIMARY KEY,
	descricaoConta VARCHAR(90),
	valorConta FLOAT,
	deleted boolean DEFAULT false
);

INSERT INTO contas VALUES
	(default, 'Pagamento de funcionário', 1640.00, false),
	(default, 'Energia elétrica', 544.83, false),
	(default, 'Materiais de limpeza', 200.00, false),
	(default, 'Aluguel', 20000.00, false), 
	(default, 'Água', 300.00, false)
	ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

INSERT INTO usuarios VALUES 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;