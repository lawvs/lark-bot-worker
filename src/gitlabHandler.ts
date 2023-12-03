import type { LarkRobot } from "./lark/robot";
import type { WebhookEvents } from "gitlab-event-types";

/**
 * See https://open.feishu.cn/tool/cardbuilder?from=howtoguide
 */
export const makeInteractiveCard = ({
  title,
  content,
  url,
  at,
  atAll,
}: {
  title: string;
  content: string;
  url?: string;
  /**
   * Custom bot only supports `@users` using open_id;
   */
  at?: string[];
  atAll?: boolean;
}) =>
  ({
    config: {
      wide_screen_mode: true,
    },

    header: {
      template: "purple",
      title: {
        tag: "plain_text",
        content: title,
      },
    },

    elements: [
      {
        tag: "markdown",
        content,
      },

      at && {
        tag: "div",
        text: {
          content: at.map((email) => `<at email=${email}></at>`).join(" "),
          tag: "lark_md",
        },
      },

      atAll && {
        tag: "div",
        text: {
          content: "<at id=all></at>",
          tag: "lark_md",
        },
      },

      url && {
        actions: [
          {
            tag: "button",
            text: {
              content: "立即查看",
              tag: "plain_text",
            },
            type: "primary",
            url,
          },
        ],
        tag: "action",
      },
    ].filter(Boolean),
  }) as const;

export const handleGitlabWebhook = async (
  event: WebhookEvents,
  robot: LarkRobot,
) => {
  if ("object_kind" in event && event.object_kind === "note") {
    const card = makeInteractiveCard({
      title: `${event.project.name} 有新的评论`,
      content: [
        event.merge_request?.title ? `**${event.merge_request.title}**` : "",
        event.object_attributes.note,
      ]
        .filter(Boolean)
        .join("\n"),
      url: event.object_attributes.url,
    });

    const resp = await robot.send({
      msg_type: "interactive",
      card,
    });
    return resp;
  }
  console.error("Unknown event:", event);
};
