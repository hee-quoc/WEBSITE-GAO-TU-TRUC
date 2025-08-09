/*
  Warnings:

  - You are about to drop the column `cooking` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `WrapProcess` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wrapProcess` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WrapProcess" DROP CONSTRAINT "WrapProcess_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cooking",
ADD COLUMN     "wrapProcess" TEXT NOT NULL;

-- DropTable
DROP TABLE "WrapProcess";

-- CreateTable
CREATE TABLE "Cooking" (
    "id" SERIAL NOT NULL,
    "step" TEXT[],
    "description" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Cooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cooking_productId_key" ON "Cooking"("productId");

-- AddForeignKey
ALTER TABLE "Cooking" ADD CONSTRAINT "Cooking_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
