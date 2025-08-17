-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_productId_fkey";

-- DropForeignKey
ALTER TABLE "Cooking" DROP CONSTRAINT "Cooking_productId_fkey";

-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_productId_fkey";

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cooking" ADD CONSTRAINT "Cooking_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
