alter table "public"."fav_num_history" alter column "user_id" drop not null;
alter table "public"."fav_num_history" add column "user_id" int4;
