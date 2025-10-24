/*
  Warnings:

  - You are about to drop the column `device_name` on the `jwt_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jwt_tokens" DROP COLUMN "device_name";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "count_following" INTEGER NOT NULL DEFAULT 0;
