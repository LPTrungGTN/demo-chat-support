-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_staff_id_fkey";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "staff_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
