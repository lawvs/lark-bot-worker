export type Webhook =
  | `https://open.feishu.cn/open-apis/bot/v2/hook/${string}`
  | `https://open.feishu.cn/open-apis/bot/hook/${string}`
  | `https://open.larksuite.com/open-apis/bot/v2/hook/${string}`
  | `https://open.larksuite.com/open-apis/bot/hook/${string}`;

export type TextMessage = {
  msg_type: "text";
  content: { text: string };
};

type TextTag = { tag: "text"; text: string; un_escape?: boolean };

type ATag = { tag: "a"; text: string; un_escape?: boolean; href: string };

type AtTag = {
  tag: "at";
  /**
   * open_id or user_id
   * @example
   * ```
   * ou_18eac85d35a26f989317ad4f02e8bbbb
   * ```
   */
  user_id: string;
};

/**
 * 	The unique image identifier. Obtain via the [Upload image](https://open.larksuite.com/document/ukTMukTMukTM/uEDO04SM4QjLxgDN) API.
 */
type ImageTag = {
  tag: "image";
  image_key: string;
  height: number;
  width: number;
};

type TagsData = TextTag | ATag | AtTag | ImageTag;

type PostMessageData = {
  title?: string;
  content: TagsData[];
};
//#region

export type PostMessage = {
  msg_type: "post";
  content: {
    post: {
      zh_cn?: PostMessageData;
      ja_jp?: PostMessageData;
      en_us?: PostMessageData;
    };
  };
};

export type ImageMessage = {
  msg_type: "image";
  content: {
    image_key: string;
  };
};

export type ShareChatMessage = {
  msg_type: "share_chat";
  open_id?: string;
  user_id?: string;
  email?: string;
  chat_id?: string;
  content: {
    share_chat_id: string;
  };
};

/**
 * See [Card builder](https://open.feishu.cn/tool/cardbuilder)
 */
export type InteractiveMessage = {
  msg_type: "interactive";
  card: Record<string, any>;
};

type MessageSign = {
  timestamp: string;
  sign: string;
};

export type Message =
  | TextMessage
  | PostMessage
  | ImageMessage
  | ShareChatMessage
  | InteractiveMessage;

export type MessageWithSign = Message & MessageSign;
