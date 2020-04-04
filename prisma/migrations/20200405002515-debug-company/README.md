# Migration `20200405002515-debug-company`

This migration has been generated at 4/5/2020, 12:25:15 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "quaint"."Company" ADD COLUMN "userId" TEXT   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200405002045-add-company-to-user..20200405002515-debug-company
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
@@ -29,9 +29,10 @@
   name      String  @unique
   longitude Int
   latitude  Int
   offers    Offer[] @relation(references: [id])
-  user      User?   @relation(references: [id])
+  user      User?   @relation(fields: [userId], references: [id])
+  userId    String?
 }
 model Offer {
   id          String   @default(uuid()) @id
```


