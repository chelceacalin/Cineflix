create table category
(
    id           uuid    not null primary key,
    name         varchar(255),
    idAvailable  boolean not null
);


create table movie
(
    id           uuid    not null primary key,
    catgory_id   varchar(255),
    description  varchar(255),
    director     varchar(255),
    is_available boolean not null,
    title        varchar(255),
    owner_id     varchar(255)
        constraint fk_owner_id references user_cineflix
);

create table movie_image_data
(
    id         uuid not null primary key,
    image_data bytea,
    name       varchar(255),
    type       varchar(255),
    movie_id   uuid
        constraint uk_movie_id unique
        constraint fk_movie_id references movie
);

create table movie_history
(
    id           uuid not null primary key,
    description  varchar(255),
    rating       integer,
    rented_date  date,
    rented_until date,
    movie_id     uuid
        constraint fk_movie_id references movie,
    user_id      varchar(255)
        constraint uk_user_id unique
        constraint fk_user_id references user_cineflix
);