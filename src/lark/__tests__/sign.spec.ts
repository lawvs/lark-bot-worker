import { beforeEach, describe, expect, test } from "vitest";
import { larkSign } from "../sign";

const SECRET = "testSecret";
const TIMESTAMP = "1648200000";
const SIGNATURE = "EeVMWFkWdx3NMASalfC7OEOJike0pXAY3MbTk9I1ouA=";

describe("sign", () => {
  beforeEach(async () => {
    delete process.env.CF_WORKER;
  });

  test("is node sign correct", async () => {
    const signData = await larkSign(SECRET, TIMESTAMP);
    expect(signData.timestamp).toBe(TIMESTAMP);
    expect(signData.sign).toBe(SIGNATURE);
  });

  test("is worker sign correct", async () => {
    process.env.CF_WORKER = "1";
    const signData = await larkSign(SECRET, TIMESTAMP);
    expect(signData.timestamp).toBe(TIMESTAMP);
    expect(signData.sign).toBe(SIGNATURE);
  });

  test("is node sign data correct", async () => {
    const signData = await larkSign(SECRET, TIMESTAMP);
    expect(signData).toStrictEqual({
      timestamp: TIMESTAMP,
      sign: SIGNATURE,
    });
  });

  test("is worker sign data correct", async () => {
    process.env.CF_WORKER = "1";
    const signData = await larkSign(SECRET, TIMESTAMP);
    expect(signData).toStrictEqual({
      timestamp: TIMESTAMP,
      sign: SIGNATURE,
    });
  });
});
