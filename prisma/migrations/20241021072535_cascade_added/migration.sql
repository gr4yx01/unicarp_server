-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_facultyId_fkey";

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
