# Migration `20200405003430-again`

This migration has been generated at 4/5/2020, 12:34:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Company" (
    "id" TEXT NOT NULL  ,
    "latitude" INTEGER NOT NULL  ,
    "longitude" INTEGER NOT NULL  ,
    "name" TEXT NOT NULL  ,
    "userId" TEXT NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

INSERT INTO "quaint"."new_Company" ("id", "latitude", "longitude", "name", "userId") SELECT "id", "latitude", "longitude", "name", "userId" FROM "quaint"."Company"

DROP TABLE "quaint"."Company";

ALTER TABLE "quaint"."new_Company" RENAME TO "Company";

CREATE UNIQUE INDEX "quaint"."Company.name" ON "Company"("name")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200405002515-debug-company..20200405003430-again
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
@@ -29,10 +29,10 @@
   name      String  @unique
   longitude Int
   latitude  Int
   offers    Offer[] @relation(references: [id])
-  user      User?   @relation(fields: [userId], references: [id])
-  userId    String?
+  user      User    @relation(fields: [userId], references: [id])
+  userId    String
 }
 model Offer {
   id          String   @default(uuid()) @id
```


