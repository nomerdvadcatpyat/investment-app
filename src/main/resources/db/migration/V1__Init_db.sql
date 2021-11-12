create table roles (
   role varchar(255),
   primary key (role)
);

create table users (
    id int8 generated by default as identity,
    username varchar(255) not null unique,
    password varchar(255) not null,
    role varchar(255) not null,
    primary key (id),
    foreign key (role) references roles(role)
);

create table brokerage_accounts (
    id int8 generated by default as identity,
    name varchar(255) not null,
    user_id int8 not null,
    primary key (id),
    foreign key (user_id) references users(id)
);

create table brokerage_account_securities (
    id int8 generated by default as identity,
    count int8 not null,
    ticker varchar(255) not null unique,
    brokerage_account_id int8 not null,
    primary key (id),
    foreign key (brokerage_account_id) references brokerage_accounts(id)
);