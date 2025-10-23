/*
  Warnings:

  - You are about to alter the column `jti` on the `jwt_tokens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `VarChar(64)`.
  - You are about to alter the column `hashed_token` on the `jwt_tokens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(512)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "jwt_tokens" ALTER COLUMN "jti" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "hashed_token" SET DATA TYPE VARCHAR(255);
