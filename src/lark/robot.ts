import { larkSign } from "./sign";
import type { Message, MessageWithSign, Webhook } from "./types";

export type RobotOptions = {
  webhook: Webhook;
  signSecret?: string;
  timestamp?: string;
};

const defaultOptions = {} as const;

export const createRobot = (options: RobotOptions) => {
  options = { ...defaultOptions, ...options };

  /**
   * See [Use bots in groups - lark](https://www.larksuite.com/hc/en-US/articles/360048487736) or [Use bots in groups - feishu](https://www.feishu.cn/hc/en-US/articles/360024984973)
   */
  const sendRaw = async (
    data: Message | MessageWithSign
  ): Promise<{ code: number; msg: string }> => {
    const resp = await fetch(options.webhook, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp.json();
  };

  const send = async (data: Message) => {
    if (options.signSecret) {
      const signData = await larkSign(options.signSecret, options.timestamp);
      const dataWithSign = {
        ...data,
        ...signData,
      };
      return sendRaw(dataWithSign);
    }
    return sendRaw(data);
  };

  return {
    send,
    // sendRaw,
  };
};

export type LarkRobot = ReturnType<typeof createRobot>;
