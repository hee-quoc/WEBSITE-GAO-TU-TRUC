/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bannerImageUrl` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Blog` table. All the data in the column will be lost.
  - The `tag` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `createdBy` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `content` on the `Blog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BlogImage" DROP CONSTRAINT "BlogImage_blogId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
DROP COLUMN "bannerImageUrl",
DROP COLUMN "id",
DROP COLUMN "published",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("slug");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
