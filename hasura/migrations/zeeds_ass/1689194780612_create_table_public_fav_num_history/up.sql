CREATE TABLE "public"."fav_num_history" ("id" serial NOT NULL, "number" text NOT NULL, "user_id" integer NOT NULL, "fav_num_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("fav_num_id") REFERENCES "public"."fav_num"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));