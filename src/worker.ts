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

  // See https://stackoverflow.com/questions/58491003/how-to-get-the-current-date-in-a-cloudflares-worker
  const timestamp = String(Date.now()).slice(0, 10);

  const robot = createRobot({
    webhook: env.WEBHOOK,
    secret: env.SECRET,
    timestamp,
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
