import { describe, expect, vi, test } from "vitest";
import { handleGitlabWebhook } from "../gitlabHandler";
import type { LarkRobot } from "../lark/robot";
import note from "./fixtures/note.json";

describe("gitlab", () => {
  test("should send data match snapshot", async () => {
    const mockRobot: LarkRobot = {
      send: vi.fn((...args) => {
        expect(args).toMatchSnapshot();
        return Promise.resolve({ code: 1, msg: "" });
      }),
    };
    await handleGitlabWebhook(note, mockRobot);
    expect(mockRobot.send).toBeCalledTimes(1);
  });
});
