/*
  Warnings:

  - You are about to drop the column `authorId` on the `books` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_authorId_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "authorId",
ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
