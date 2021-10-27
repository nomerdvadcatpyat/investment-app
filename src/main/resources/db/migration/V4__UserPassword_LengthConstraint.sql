alter table users
add constraint user_password_length
CHECK (char_length(password) > 0);