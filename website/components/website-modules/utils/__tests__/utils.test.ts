import { mockNav } from "@/mockdata";
import { capitalize, dateStr, isNew } from "../index";
import { getActiveHeading } from "../util";

describe("Utils test", () => {
  test("isNew", () => {
    const before = new Date(new Date().setDate(new Date().getDate() - 180));
    const after = new Date(new Date().setDate(new Date().getDate() - 89));

    expect(isNew(before.toString())).toBeFalsy();
    expect(isNew(after.toString())).toBeTruthy();
  });

  test("capitalize", () => {
    const str1 = "teststr";
    const str2 = "TESTSTR";
    const str3 = "tESTSTR";
    const str4 = "Teststr";

    expect(capitalize(str1)).toEqual("Teststr");
    expect(capitalize(str2)).toEqual("TESTSTR");
    expect(capitalize(str3)).toEqual("TESTSTR");
    expect(capitalize(str4)).toEqual("Teststr");
  });

  test("dateStr", () => {
    const date = "2022-06-09T11:05:48Z";
    const date2 = "2021-03-02T12:05:48Z";

    expect(dateStr(date)).toEqual("9. juni 2022");
    expect(dateStr(date2)).toEqual("2. mars 2021");
  });

  test("getActiveHeading", () => {
    const active = getActiveHeading(
      mockNav,
      "designsystem/side/oversikt-guider"
    );
    const active2 = getActiveHeading(mockNav, "designsystem/side/invalidpage");
    expect(active._key).toEqual("b8739a954c22");
    expect(active2).toBeNull();
  });
});

export {};
