/*
  Warnings:

  - A unique constraint covering the columns `[authToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_authToken_key" ON "users"("authToken");
