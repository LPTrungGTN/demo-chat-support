-- CreateTable
CREATE TABLE "staffs" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffStatus" (
    "staff_id" TEXT NOT NULL,
    "client_id" TEXT,
    "max_active_chats" INTEGER NOT NULL DEFAULT 10,
    "current_active_chats" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffStatus_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffCategory" (
    "staff_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "staffCategory_pkey" PRIMARY KEY ("staff_id","category_id")
);

-- CreateTable
CREATE TABLE "chatRooms" (
    "id" SERIAL NOT NULL,
    "happiness_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "chatRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatRoomUsers" (
    "chat_room_id" INTEGER NOT NULL,
    "staff_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chatRoomUsers_pkey" PRIMARY KEY ("chat_room_id","staff_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "staff_id" TEXT,
    "chat_room_id" INTEGER NOT NULL,
    "happiness_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staffs_username_key" ON "staffs"("username");

-- AddForeignKey
ALTER TABLE "staffStatus" ADD CONSTRAINT "staffStatus_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffCategory" ADD CONSTRAINT "staffCategory_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffCategory" ADD CONSTRAINT "staffCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRooms" ADD CONSTRAINT "chatRooms_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRoomUsers" ADD CONSTRAINT "chatRoomUsers_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chatRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatRoomUsers" ADD CONSTRAINT "chatRoomUsers_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chatRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
