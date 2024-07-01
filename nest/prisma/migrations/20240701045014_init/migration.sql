-- DropForeignKey
ALTER TABLE "chatRooms" DROP CONSTRAINT "chatRooms_category_id_fkey";

-- AlterTable
ALTER TABLE "chatRooms" ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chatRooms" ADD CONSTRAINT "chatRooms_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
