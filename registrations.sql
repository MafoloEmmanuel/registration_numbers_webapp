create table towns(
    id serial not null primary key, 
    town text not null ,
    startswith text not null);


create table registration_numbers(
    id serial not null primary key,
 reg_number varchar(15), 
 town_id int, 
 foreign key (town_id) references towns(id));
 