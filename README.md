
nombre y atributos de la tabla


CREATE TABLE IF NOT EXISTS autor(
id SERIAL PRIMARY KEY NOT NULL,
primernombre VARCHAR(255) NOT NULL,
segundonombre VARCHAR(255) NOT NULL,
apellido VARCHAR(255) NOT NULL,
direccion VARCHAR(255) NOT NULL,
nacionalidad VARCHAR(255) NOT NULL,
editorial VARCHAR(255) NOT NULL
);

select * from autor