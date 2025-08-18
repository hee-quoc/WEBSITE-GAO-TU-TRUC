/*
  Warnings:

  - Added the required column `features` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "features" TEXT NOT NULL;
