-- DropIndex
DROP INDEX "Topic_title_description_idx";

-- CreateIndex
CREATE INDEX "Topic_title_idx" ON "Topic"("title");

-- CreateIndex
CREATE INDEX "Topic_description_idx" ON "Topic"("description");
