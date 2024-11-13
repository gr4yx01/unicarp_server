-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "facultyId" TEXT,
ADD COLUMN     "level" "AcademicLevel";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
