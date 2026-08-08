-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "certifications" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "countryOfOrigin" TEXT,
ADD COLUMN     "datasheetUrl" TEXT,
ADD COLUMN     "hsCode" TEXT,
ADD COLUMN     "mpn" TEXT,
ADD COLUMN     "warrantyPeriod" TEXT;

-- CreateIndex
CREATE INDEX "Product_mpn_idx" ON "Product"("mpn");
