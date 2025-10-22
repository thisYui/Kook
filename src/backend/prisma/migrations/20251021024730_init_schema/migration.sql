/*
  Warnings:

  - The `unit` column on the `ingredients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `token` on the `jwt_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `week_start` on the `meal_plan_meta` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `cuisine` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `total_time` on the `recipes` table. All the data in the column will be lost.
  - The `difficulty` column on the `recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `description` on the `reposts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jti]` on the table `jwt_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `notebooks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jti` to the `jwt_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day_start` to the `meal_plan_meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('REFRESH', 'ACCESS');

-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "unit" AS ENUM ('MILLIGRAM', 'GRAM', 'KILOGRAM', 'OUNCE', 'POUND', 'MILLILITER', 'LITER', 'CUP', 'TABLESPOON', 'TEASPOON', 'GALLON', 'PINCH', 'DASH', 'DROP', 'PIECE', 'SLICE', 'CLOVE', 'BUNCH', 'STALK', 'PACK', 'FRUIT');

-- AlterTable
ALTER TABLE "badges" ADD COLUMN     "icon_url" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_edited" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ingredient_catalog" ADD COLUMN     "category" VARCHAR(100),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ingredients" ADD COLUMN     "display_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_optional" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "unit",
ADD COLUMN     "unit" "unit";

-- AlterTable
ALTER TABLE "jwt_tokens" DROP COLUMN "token",
ADD COLUMN     "device_name" VARCHAR(100),
ADD COLUMN     "hashed_token" VARCHAR(255),
ADD COLUMN     "jti" VARCHAR(64) NOT NULL,
ADD COLUMN     "revoked_at" TIMESTAMP(3),
ADD COLUMN     "type" "token_type" NOT NULL DEFAULT 'REFRESH';

-- AlterTable
ALTER TABLE "meal_plan_meta" DROP COLUMN "week_start",
ADD COLUMN     "day_start" DATE NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "promt" TEXT;

-- AlterTable
ALTER TABLE "notebooks" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "content" TEXT,
ADD COLUMN     "read_at" TIMESTAMP(3),
ADD COLUMN     "title" VARCHAR(255);

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "country_code",
DROP COLUMN "cuisine",
ADD COLUMN     "comment_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notebook_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repost_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "rating_avg" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "recipe_version_maps" ADD COLUMN     "is_synced" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "synced_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "total_time",
ADD COLUMN     "calories" INTEGER,
ADD COLUMN     "cook_minute" INTEGER,
ADD COLUMN     "total_minute" INTEGER,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "difficulty",
ALTER COLUMN "total_steps" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "reposts" DROP COLUMN "description",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" VARCHAR(100) NOT NULL,
ADD COLUMN     "usage_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user_allergies" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "user_badges" ADD COLUMN     "revoked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "revoked_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_active" TIMESTAMP(3),
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "language" SET DEFAULT 'en',
ALTER COLUMN "theme" SET DEFAULT 'light';

-- CreateIndex
CREATE INDEX "badges_is_active_idx" ON "badges"("is_active");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_is_deleted_idx" ON "comments"("is_deleted");

-- CreateIndex
CREATE INDEX "follows_follower_id_idx" ON "follows"("follower_id");

-- CreateIndex
CREATE INDEX "follows_followee_id_idx" ON "follows"("followee_id");

-- CreateIndex
CREATE INDEX "ingredient_catalog_category_idx" ON "ingredient_catalog"("category");

-- CreateIndex
CREATE INDEX "ingredient_catalog_is_active_idx" ON "ingredient_catalog"("is_active");

-- CreateIndex
CREATE INDEX "ingredient_catalog_display_name_idx" ON "ingredient_catalog"("display_name");

-- CreateIndex
CREATE INDEX "ingredients_post_id_idx" ON "ingredients"("post_id");

-- CreateIndex
CREATE INDEX "ingredients_ingredient_key_idx" ON "ingredients"("ingredient_key");

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
CREATE INDEX "meal_plan_meta_user_id_idx" ON "meal_plan_meta"("user_id");

-- CreateIndex
CREATE INDEX "meal_plan_meta_is_active_idx" ON "meal_plan_meta"("is_active");

-- CreateIndex
CREATE INDEX "notebooks_user_id_idx" ON "notebooks"("user_id");

-- CreateIndex
CREATE INDEX "notebooks_post_id_idx" ON "notebooks"("post_id");

-- CreateIndex
CREATE INDEX "notebooks_is_deleted_idx" ON "notebooks"("is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "notebooks_user_id_post_id_key" ON "notebooks"("user_id", "post_id");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "notes"("user_id");

-- CreateIndex
CREATE INDEX "notes_post_id_idx" ON "notes"("post_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "post_tags_post_id_idx" ON "post_tags"("post_id");

-- CreateIndex
CREATE INDEX "post_tags_tag_id_idx" ON "post_tags"("tag_id");

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
CREATE INDEX "ratings_post_id_idx" ON "ratings"("post_id");

-- CreateIndex
CREATE INDEX "ratings_user_id_idx" ON "ratings"("user_id");

-- CreateIndex
CREATE INDEX "recipe_version_maps_recipe_id_idx" ON "recipe_version_maps"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_version_maps_is_synced_idx" ON "recipe_version_maps"("is_synced");

-- CreateIndex
CREATE INDEX "recipes_difficulty_idx" ON "recipes"("difficulty");

-- CreateIndex
CREATE INDEX "recipes_post_id_idx" ON "recipes"("post_id");

-- CreateIndex
CREATE INDEX "recipes_total_minute_idx" ON "recipes"("total_minute");

-- CreateIndex
CREATE INDEX "reposts_original_post_id_idx" ON "reposts"("original_post_id");

-- CreateIndex
CREATE INDEX "reposts_sharer_id_idx" ON "reposts"("sharer_id");

-- CreateIndex
CREATE INDEX "reposts_is_deleted_idx" ON "reposts"("is_deleted");

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
CREATE INDEX "user_allergies_user_id_idx" ON "user_allergies"("user_id");

-- CreateIndex
CREATE INDEX "user_badges_user_id_idx" ON "user_badges"("user_id");

-- CreateIndex
CREATE INDEX "user_badges_badge_id_idx" ON "user_badges"("badge_id");

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
