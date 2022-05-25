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