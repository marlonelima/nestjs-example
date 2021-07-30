-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'user',
ALTER COLUMN "updated_at" DROP DEFAULT;
