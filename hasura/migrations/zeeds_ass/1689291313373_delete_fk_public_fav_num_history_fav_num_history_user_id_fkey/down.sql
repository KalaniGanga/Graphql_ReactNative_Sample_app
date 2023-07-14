alter table "public"."fav_num_history"
  add constraint "fav_num_history_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
