/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SKU` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `companyBrand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageData` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cooking` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grow` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parts` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "SKU",
DROP COLUMN "companyBrand",
DROP COLUMN "createdAt",
DROP COLUMN "features",
DROP COLUMN "imageData",
DROP COLUMN "imageType",
DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "tags",
DROP COLUMN "updatedAt",
ADD COLUMN     "cooking" TEXT NOT NULL,
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "grow" TEXT NOT NULL,
ADD COLUMN     "ingredients" TEXT NOT NULL,
ADD COLUMN     "package" TEXT NOT NULL,
ADD COLUMN     "parts" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "productCertImages" TEXT[],
ADD COLUMN     "productImages" TEXT[],
ADD COLUMN     "properties" INTEGER[],
ADD COLUMN     "tag" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Guide" (
    "id" SERIAL NOT NULL,
    "water" DOUBLE PRECISION[],
    "rice" TEXT[],
    "finger" TEXT[],
    "step" TEXT[],
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WrapProcess" (
    "id" SERIAL NOT NULL,
    "step" TEXT[],
    "description" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "WrapProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guide_productId_key" ON "Guide"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "WrapProcess_productId_key" ON "WrapProcess"("productId");

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrapProcess" ADD CONSTRAINT "WrapProcess_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
