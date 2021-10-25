create table towns(
    id serial not null primary key, 
    town text not null ,
    startswith text not null);

create table registration_numbers(
    id serial not null primary key,
 reg_number varchar(15), 
 town_id int, 
 foreign key (town_id) references towns(id));
 
 INSERT INTO towns(town, startswith) VALUES ('Cape Town', 'CA');
 INSERT INTO towns(town, startswith) VALUES ('Stellenbosch', 'CL');
 INSERT INTO towns(town, startswith) VALUES ('Wellington', 'CN');

