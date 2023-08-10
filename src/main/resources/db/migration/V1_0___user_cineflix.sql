create table user_cineflix
(
    id         varchar(255) not null primary key,
    first_name varchar(255),
    last_name  varchar(255),
    email      varchar(255),
    is_active  boolean,
    role       varchar(255)
        constraint user_cineflix_role_check
            check ((role)::text = ANY (ARRAY [('ADMIN'::character varying)::text, ('USER'::character varying)::text]))
    );
