# Migration `20200405001043-debug`

This migration has been generated at 4/5/2020, 12:10:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Profile" (
    "id" TEXT NOT NULL  ,
    "name" TEXT NOT NULL  ,
    "userId" TEXT NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

INSERT INTO "quaint"."new_Profile" ("id", "name") SELECT "id", "name" FROM "quaint"."Profile"

DROP TABLE "quaint"."Profile";

ALTER TABLE "quaint"."new_Profile" RENAME TO "Profile";

CREATE UNIQUE INDEX "quaint"."Profile_userId" ON "Profile"("userId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;

PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Offer" (
    "companyId" TEXT NOT NULL  ,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    "description" TEXT NOT NULL  ,
    "discount" TEXT NOT NULL  ,
    "id" TEXT NOT NULL  ,
    "limitTime" DATE NOT NULL  ,
    "updatedAt" DATE NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

INSERT INTO "quaint"."new_Offer" ("createdAt", "description", "discount", "id", "limitTime", "updatedAt") SELECT "createdAt", "description", "discount", "id", "limitTime", "updatedAt" FROM "quaint"."Offer"

DROP TABLE "quaint"."Offer";

ALTER TABLE "quaint"."new_Offer" RENAME TO "Offer";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200404231107-init..20200405001043-debug
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./dev.db"
 }
 generator client {
   provider = "prisma-client-js"
@@ -16,19 +16,20 @@
   subscribedOffers Offer[]  @relation(references: [id])
 }
 model Profile {
-  id   String @default(uuid()) @id
-  name String
-  user User   @relation(references: [id])
+  id     String @default(uuid()) @id
+  name   String
+  user   User   @relation(fields: [userId], references: [id])
+  userId String
 }
 model Company {
   id        String  @default(uuid()) @id
   name      String  @unique
   longitude Int
   latitude  Int
-  offers    Offer[]
+  offers    Offer[] @relation(references: [id])
 }
 model Offer {
   id          String   @default(uuid()) @id
@@ -36,7 +37,8 @@
   discount    String
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   limitTime   DateTime
-  company     Company  @relation(references: [id])
+  company     Company  @relation(fields: [companyId], references: [id])
+  companyId   String
   subscribers User[]   @relation(references: [id])
 }
```


