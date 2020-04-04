# Migration `20200404231107-init`

This migration has been generated at 4/4/2020, 11:11:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."User" (
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    "id" TEXT NOT NULL  ,
    "instagram" TEXT NOT NULL  ,
    "updatedAt" DATE NOT NULL  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."Profile" (
    "id" TEXT NOT NULL  ,
    "name" TEXT NOT NULL  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."Company" (
    "id" TEXT NOT NULL  ,
    "latitude" INTEGER NOT NULL  ,
    "longitude" INTEGER NOT NULL  ,
    "name" TEXT NOT NULL  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."Offer" (
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    "description" TEXT NOT NULL  ,
    "discount" TEXT NOT NULL  ,
    "id" TEXT NOT NULL  ,
    "limitTime" DATE NOT NULL  ,
    "updatedAt" DATE NOT NULL  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."_OfferToUser" (
    "A" TEXT NOT NULL  ,
    "B" TEXT NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE UNIQUE INDEX "quaint"."User.instagram" ON "User"("instagram")

CREATE UNIQUE INDEX "quaint"."Company.name" ON "Company"("name")

CREATE UNIQUE INDEX "quaint"."_OfferToUser_AB_unique" ON "_OfferToUser"("A","B")

CREATE  INDEX "quaint"."_OfferToUser_B_index" ON "_OfferToUser"("B")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200404231107-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,42 @@
+datasource db {
+  provider = "sqlite"
+  url      = "file:./dev.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id               String   @default(uuid()) @id
+  instagram        String   @unique
+  profile          Profile?
+  createdAt        DateTime @default(now())
+  updatedAt        DateTime @updatedAt
+  subscribedOffers Offer[]  @relation(references: [id])
+}
+
+model Profile {
+  id   String @default(uuid()) @id
+  name String
+  user User   @relation(references: [id])
+}
+
+model Company {
+  id        String  @default(uuid()) @id
+  name      String  @unique
+  longitude Int
+  latitude  Int
+  offers    Offer[]
+}
+
+model Offer {
+  id          String   @default(uuid()) @id
+  description String
+  discount    String
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  limitTime   DateTime
+  company     Company  @relation(references: [id])
+  subscribers User[]   @relation(references: [id])
+}
```


