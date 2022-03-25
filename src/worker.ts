import { createRobot } from "./lark/robot";
import type { Webhook } from "./lark/types";
import { handleGitlabWebhook } from "./gitlabHandler";

interface WorkerEnv {
  WEBHOOK?: Webhook;
  SECRET?: string;
}

const fetch: ExportedHandlerFetchHandler<WorkerEnv> = async (
  request,
  env,
  ctx
) => {
  if (!env.WEBHOOK) {
    throw new Error(
      "Specified secret 'WEBHOOK' not found in environment variables."
    );
  }

  const robot = createRobot({
    webhook: env.WEBHOOK,
    secret: env.SECRET,
  });

  return new Response(
    JSON.stringify(await handleGitlabWebhook(await request.json(), robot)),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const exportedHandler: ExportedHandler<WorkerEnv> = {
  fetch,
};

export default exportedHandler;
