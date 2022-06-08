create table users (
id int identity,
name varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null,
avatar varchar(255)
)

create table objects(
id int identity,
owner_id int,
name varchar(255),
price money,
description varchar(255),
image varchar(255)
)

create table chat(
id int identity,
user1 int,
user2 int
)

create table message(
id int,
sender int,
message varchar(800),
date datetime
)

create table categorias(
id int identity,
name varchar(60)
)

insert into categorias(name) values ('Automóveis')
insert into categorias(name) values ('Móveis')
insert into categorias(name) values ('Eletrônicos')
insert into categorias(name) values ('Esportes e Lazer')
insert into categorias(name) values ('Artigos Infantis')
insert into categorias(name) values ('Animais de Estimação')
insert into categorias(name) values ('Moda e Beleza')
insert into categorias(name) values ('Comércio e Escritório')
insert into categorias(name) values ('Serviços')
insert into categorias(name) values ('Imóveis')