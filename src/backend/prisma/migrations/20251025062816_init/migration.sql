-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('VEGETABLES', 'MEAT_POULTRY', 'SEAFOOD', 'DAIRY_EGGS', 'GRAINS_LEGUMES', 'FRUITS', 'SPICES_HERBS', 'NUTS_SEEDS', 'BEVERAGES', 'BAKING_DESSERT', 'CANNED_PRESERVED', 'FROZEN', 'OTHERS', 'UNCATEGORIZED');

-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('REFRESH', 'ACCESS');

-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "unit" AS ENUM ('MILLIGRAM', 'GRAM', 'KILOGRAM', 'OUNCE', 'POUND', 'MILLILITER', 'LITER', 'CUP', 'TABLESPOON', 'TEASPOON', 'GALLON', 'PINCH', 'DASH', 'DROP', 'PIECE', 'SLICE', 'CLOVE', 'BUNCH', 'STALK', 'PACK', 'FRUIT');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('follow', 'comment', 'rating', 'badge', 'repost', 'system');

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "avatar_url" TEXT,
    "language" VARCHAR(10) DEFAULT 'en',
    "theme" VARCHAR(20) DEFAULT 'light',
    "bio" TEXT,
    "count_finished_recipes" INTEGER NOT NULL DEFAULT 0,
    "count_posts" INTEGER NOT NULL DEFAULT 0,
    "count_followers" INTEGER NOT NULL DEFAULT 0,
    "count_following" INTEGER NOT NULL DEFAULT 0,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "last_login" TIMESTAMP(3),
    "last_active" TIMESTAMP(3),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "ingredient_catalog" (
    "ingredient_key" TEXT NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'UNCATEGORIZED',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "ingredient_catalog_pkey" PRIMARY KEY ("ingredient_key")
);

-- CreateTable
CREATE TABLE "user_allergies" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "ingredient_key" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "user_allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jwt_tokens" (
    "jwt_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "jti" VARCHAR(64) NOT NULL,
    "type" "token_type" NOT NULL DEFAULT 'REFRESH',
    "hashed_token" VARCHAR(255),
    "user_agent" TEXT,
    "ip_address" VARCHAR(45),
    "exp" TIMESTAMP NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "jwt_tokens_pkey" PRIMARY KEY ("jwt_id")
);

-- CreateTable
CREATE TABLE "follows" (
    "follow_id" UUID NOT NULL,
    "follower_id" UUID NOT NULL,
    "followee_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("follow_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "short_description" TEXT,
    "rating_avg" DECIMAL(3,2) DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "image_url" TEXT,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "repost_count" INTEGER NOT NULL DEFAULT 0,
    "notebook_count" INTEGER NOT NULL DEFAULT 0,
    "reply_question_id" UUID,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" UUID NOT NULL,
    "image_url" TEXT,
    "question" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "recipe_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "total_minute" INTEGER,
    "cook_minute" INTEGER,
    "difficulty" "difficulty",
    "total_steps" INTEGER DEFAULT 0,
    "current_version" INTEGER NOT NULL DEFAULT 1,
    "calories" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("recipe_id")
);

-- CreateTable
CREATE TABLE "recipe_version_maps" (
    "id" UUID NOT NULL,
    "recipe_id" UUID NOT NULL,
    "mongo_version" INTEGER NOT NULL,
    "is_synced" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced_at" TIMESTAMP(3),

    CONSTRAINT "recipe_version_maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "ingredient_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "ingredient_key" TEXT NOT NULL,
    "quantity" DECIMAL(10,2),
    "unit" "unit",
    "is_optional" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("ingredient_id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "rating_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "value" SMALLINT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "is_edited" BOOLEAN NOT NULL DEFAULT false,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "badges" (
    "badge_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "icon_url" TEXT,
    "criteria" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("badge_id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "badge_id" UUID NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reposts" (
    "repost_id" UUID NOT NULL,
    "original_post_id" UUID NOT NULL,
    "sharer_id" UUID NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "reposts_pkey" PRIMARY KEY ("repost_id")
);

-- CreateTable
CREATE TABLE "notebooks" (
    "notebook_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "notebooks_pkey" PRIMARY KEY ("notebook_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_plan_meta" (
    "plan_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "goal" TEXT,
    "prompt" TEXT,
    "day_start" DATE NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "meal_plan_meta_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" "notification_type" NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "notes" (
    "note_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "step_order" INTEGER,
    "content" TEXT NOT NULL,
    "color" INTEGER,
    "start_index" INTEGER,
    "end_index" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_is_deleted_idx" ON "users"("is_deleted");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_verified_idx" ON "users"("is_verified");

-- CreateIndex
CREATE INDEX "users_is_disabled_idx" ON "users"("is_disabled");

-- CreateIndex
CREATE INDEX "users_last_active_idx" ON "users"("last_active");

-- CreateIndex
CREATE INDEX "ingredient_catalog_category_idx" ON "ingredient_catalog"("category");

-- CreateIndex
CREATE INDEX "ingredient_catalog_is_active_idx" ON "ingredient_catalog"("is_active");

-- CreateIndex
CREATE INDEX "ingredient_catalog_display_name_idx" ON "ingredient_catalog"("display_name");

-- CreateIndex
CREATE INDEX "user_allergies_user_id_idx" ON "user_allergies"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_allergies_user_id_ingredient_key_key" ON "user_allergies"("user_id", "ingredient_key");

-- CreateIndex
CREATE UNIQUE INDEX "jwt_tokens_jti_key" ON "jwt_tokens"("jti");

-- CreateIndex
CREATE INDEX "jwt_tokens_user_id_idx" ON "jwt_tokens"("user_id");

-- CreateIndex
CREATE INDEX "jwt_tokens_jti_idx" ON "jwt_tokens"("jti");

-- CreateIndex
CREATE INDEX "jwt_tokens_type_idx" ON "jwt_tokens"("type");

-- CreateIndex
CREATE INDEX "jwt_tokens_exp_idx" ON "jwt_tokens"("exp");

-- CreateIndex
CREATE INDEX "jwt_tokens_revoked_idx" ON "jwt_tokens"("revoked");

-- CreateIndex
CREATE INDEX "follows_follower_id_idx" ON "follows"("follower_id");

-- CreateIndex
CREATE INDEX "follows_followee_id_idx" ON "follows"("followee_id");

-- CreateIndex
CREATE UNIQUE INDEX "follows_follower_id_followee_id_key" ON "follows"("follower_id", "followee_id");

-- CreateIndex
CREATE INDEX "posts_author_id_idx" ON "posts"("author_id");

-- CreateIndex
CREATE INDEX "posts_is_deleted_idx" ON "posts"("is_deleted");

-- CreateIndex
CREATE INDEX "posts_is_published_idx" ON "posts"("is_published");

-- CreateIndex
CREATE INDEX "posts_created_at_idx" ON "posts"("created_at");

-- CreateIndex
CREATE INDEX "posts_rating_avg_idx" ON "posts"("rating_avg");

-- CreateIndex
CREATE INDEX "posts_view_count_idx" ON "posts"("view_count");

-- CreateIndex
CREATE INDEX "posts_title_idx" ON "posts"("title");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_post_id_key" ON "recipes"("post_id");

-- CreateIndex
CREATE INDEX "recipes_difficulty_idx" ON "recipes"("difficulty");

-- CreateIndex
CREATE INDEX "recipes_post_id_idx" ON "recipes"("post_id");

-- CreateIndex
CREATE INDEX "recipes_total_minute_idx" ON "recipes"("total_minute");

-- CreateIndex
CREATE INDEX "recipe_version_maps_recipe_id_idx" ON "recipe_version_maps"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_version_maps_mongo_version_idx" ON "recipe_version_maps"("mongo_version");

-- CreateIndex
CREATE INDEX "recipe_version_maps_is_synced_idx" ON "recipe_version_maps"("is_synced");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_version_maps_recipe_id_mongo_version_key" ON "recipe_version_maps"("recipe_id", "mongo_version");

-- CreateIndex
CREATE INDEX "ingredients_post_id_idx" ON "ingredients"("post_id");

-- CreateIndex
CREATE INDEX "ingredients_ingredient_key_idx" ON "ingredients"("ingredient_key");

-- CreateIndex
CREATE INDEX "ratings_post_id_idx" ON "ratings"("post_id");

-- CreateIndex
CREATE INDEX "ratings_user_id_idx" ON "ratings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_post_id_user_id_key" ON "ratings"("post_id", "user_id");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_is_deleted_idx" ON "comments"("is_deleted");

-- CreateIndex
CREATE INDEX "badges_is_active_idx" ON "badges"("is_active");

-- CreateIndex
CREATE INDEX "user_badges_user_id_idx" ON "user_badges"("user_id");

-- CreateIndex
CREATE INDEX "user_badges_badge_id_idx" ON "user_badges"("badge_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_user_id_badge_id_key" ON "user_badges"("user_id", "badge_id");

-- CreateIndex
CREATE INDEX "reposts_original_post_id_idx" ON "reposts"("original_post_id");

-- CreateIndex
CREATE INDEX "reposts_sharer_id_idx" ON "reposts"("sharer_id");

-- CreateIndex
CREATE INDEX "reposts_is_deleted_idx" ON "reposts"("is_deleted");

-- CreateIndex
CREATE INDEX "notebooks_user_id_idx" ON "notebooks"("user_id");

-- CreateIndex
CREATE INDEX "notebooks_post_id_idx" ON "notebooks"("post_id");

-- CreateIndex
CREATE INDEX "notebooks_is_deleted_idx" ON "notebooks"("is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "notebooks_user_id_post_id_key" ON "notebooks"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_slug_idx" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_usage_count_idx" ON "tags"("usage_count");

-- CreateIndex
CREATE INDEX "tags_is_active_idx" ON "tags"("is_active");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- CreateIndex
CREATE INDEX "post_tags_post_id_idx" ON "post_tags"("post_id");

-- CreateIndex
CREATE INDEX "post_tags_tag_id_idx" ON "post_tags"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_tags_post_id_tag_id_key" ON "post_tags"("post_id", "tag_id");

-- CreateIndex
CREATE INDEX "meal_plan_meta_user_id_idx" ON "meal_plan_meta"("user_id");

-- CreateIndex
CREATE INDEX "meal_plan_meta_is_active_idx" ON "meal_plan_meta"("is_active");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "notes"("user_id");

-- CreateIndex
CREATE INDEX "notes_post_id_idx" ON "notes"("post_id");

-- AddForeignKey
ALTER TABLE "user_allergies" ADD CONSTRAINT "user_allergies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_allergies" ADD CONSTRAINT "user_allergies_ingredient_key_fkey" FOREIGN KEY ("ingredient_key") REFERENCES "ingredient_catalog"("ingredient_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jwt_tokens" ADD CONSTRAINT "jwt_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_reply_question_id_fkey" FOREIGN KEY ("reply_question_id") REFERENCES "questions"("question_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_version_maps" ADD CONSTRAINT "recipe_version_maps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipe_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_ingredient_key_fkey" FOREIGN KEY ("ingredient_key") REFERENCES "ingredient_catalog"("ingredient_key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("badge_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_original_post_id_fkey" FOREIGN KEY ("original_post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_sharer_id_fkey" FOREIGN KEY ("sharer_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebooks" ADD CONSTRAINT "notebooks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notebooks" ADD CONSTRAINT "notebooks_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_plan_meta" ADD CONSTRAINT "meal_plan_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
