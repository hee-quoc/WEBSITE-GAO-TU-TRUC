/*
  Warnings:

  - The `tag` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `tag` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "tag" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];