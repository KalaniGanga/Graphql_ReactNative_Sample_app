alter table "public"."fav_num" alter column "user_id" drop not null;
alter table "public"."fav_num" add column "user_id" int4;
