-- CreateEnum
CREATE TYPE "AttributesEnum" AS ENUM ('WHOLE_NUMBER', 'VALUE_LIST');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "confirmationOTP" TEXT NOT NULL,
    "isEmailConfirmed" BOOLEAN NOT NULL,
    "otpExpiryTime" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attributes" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "attributeType" TEXT NOT NULL,
    "attributeName" TEXT NOT NULL,
    "attributeIconName" TEXT NOT NULL,
    "attributeIconUrl" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "attributeValue" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeValues" (
    "id" TEXT NOT NULL,
    "attributeValueName" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "attributesId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Attributes" ADD FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeValues" ADD FOREIGN KEY ("attributesId") REFERENCES "Attributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
