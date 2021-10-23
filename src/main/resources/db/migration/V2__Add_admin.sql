insert into users (login, password) values ('admin', 'admin');

insert into brokerage_accounts (name, user_id) VALUES ('admin_account_1', 1);
insert into brokerage_accounts (name, user_id) VALUES ('admin_account_2', 1);

insert into brokerage_account_securities (count, ticker, brokerage_account_id) VALUES ('110', 'GAZP', 1);
insert into brokerage_account_securities (count, ticker, brokerage_account_id) VALUES ('260', 'SIBN', 1);
insert into brokerage_account_securities (count, ticker, brokerage_account_id) VALUES ('230', 'TBIOA', 2);