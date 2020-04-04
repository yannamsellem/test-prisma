# Migration `20200405002045-add-company-to-user`

This migration has been generated at 4/5/2020, 12:20:45 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200405001043-debug..20200405002045-add-company-to-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,20 +1,21 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./dev.db"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id               String   @default(uuid()) @id
-  instagram        String   @unique
+  id               String    @default(uuid()) @id
+  instagram        String    @unique
   profile          Profile?
-  createdAt        DateTime @default(now())
-  updatedAt        DateTime @updatedAt
-  subscribedOffers Offer[]  @relation(references: [id])
+  createdAt        DateTime  @default(now())
+  updatedAt        DateTime  @updatedAt
+  subscribedOffers Offer[]   @relation(references: [id])
+  companies        Company[] @relation(references: [id])
 }
 model Profile {
   id     String @default(uuid()) @id
@@ -28,8 +29,9 @@
   name      String  @unique
   longitude Int
   latitude  Int
   offers    Offer[] @relation(references: [id])
+  user      User?   @relation(references: [id])
 }
 model Offer {
   id          String   @default(uuid()) @id
```


