-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "reply_question_id" UUID;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "count_finished_recipes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "count_followers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "count_posts" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "questions" (
    "question_id" UUID NOT NULL,
    "image_url" TEXT,
    "question" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_reply_question_id_fkey" FOREIGN KEY ("reply_question_id") REFERENCES "questions"("question_id") ON DELETE SET NULL ON UPDATE CASCADE;
