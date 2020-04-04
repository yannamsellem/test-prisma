# Migration `20200405004828-again-again`

This migration has been generated at 4/5/2020, 12:48:28 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200405003430-again..20200405004828-again-again
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
@@ -13,9 +13,9 @@
   profile          Profile?
   createdAt        DateTime  @default(now())
   updatedAt        DateTime  @updatedAt
   subscribedOffers Offer[]   @relation(references: [id])
-  companies        Company[] @relation(references: [id])
+  companies        Company[]
 }
 model Profile {
   id     String @default(uuid()) @id
```


