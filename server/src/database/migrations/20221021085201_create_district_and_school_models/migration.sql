-- CreateTable
CREATE TABLE "District" (
    "emailDomain" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("emailDomain")
);

-- CreateTable
CREATE TABLE "School" (
    "name" TEXT NOT NULL,
    "emailDomain" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("name","emailDomain")
);

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_emailDomain_fkey" FOREIGN KEY ("emailDomain") REFERENCES "District"("emailDomain") ON DELETE RESTRICT ON UPDATE CASCADE;
