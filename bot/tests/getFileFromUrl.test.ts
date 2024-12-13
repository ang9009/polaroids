import { expect, test } from "vitest";
import { getFileFromUrl } from "./../src/features/event-triggers/api/";

test("validateFSResponse returns expected object", async () => {
  const fileName = "fileName";
  const url =
    "https://cdn.discordapp.com/attachments/1295512415118688427/1314970407400505374/" +
    "Screenshot_2024-12-06_at_11.59.05_PM.png?" +
    "ex=6755b520&is=675463a0&hm=a9f2763d7d3b209711019a38f4596606fe318b86f94cacddec58fcde88b155c9&";
  const file = await getFileFromUrl(url, fileName);

  expect(file.name).toBe(fileName);
});
