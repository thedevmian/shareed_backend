/*
  Warnings:

  - You are about to drop the column `photo` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_photo_fkey";

-- DropIndex
DROP INDEX "Product_photo_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "photo";

-- CreateTable
CREATE TABLE "_Product_photo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Product_photo_AB_unique" ON "_Product_photo"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_photo_B_index" ON "_Product_photo"("B");

-- AddForeignKey
ALTER TABLE "_Product_photo" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_photo" ADD FOREIGN KEY ("B") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
