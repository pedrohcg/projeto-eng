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

insert into categories(name) values ('Cars')
insert into categories(name) values ('Computers')
insert into categories(name) values ('Furniture')
insert into categories(name) values ('Kitchen')
insert into categories(name) values ('Smartphones')
insert into categories(name) values ('Gaming')
