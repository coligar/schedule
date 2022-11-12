/*
  Warnings:

  - You are about to drop the column `name` on the `Schedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "day" DATETIME NOT NULL,
    "starttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("area", "createdAt", "day", "endtime", "id", "order", "starttime", "type", "updatedAt", "userId") SELECT "area", "createdAt", "day", "endtime", "id", "order", "starttime", "type", "updatedAt", "userId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
