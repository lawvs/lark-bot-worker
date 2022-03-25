# Lark Bot Worker

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lawvs/lark-bot-worker)

Lark/Feishu bot on Cloudflare Workers.

# Config

```sh
CF_API_TOKEN=xxx
CF_ACCOUNT_ID=xxx
# Optional
CF_ZONE_ID=xxx

# Lark/Feishu bot webhook
WEBHOOK=https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxxxxxx
# (Optional) Lark/Feishu bot signature secret
SECRET=xxxxxxxxxxxx
```

## References

- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Webhook events | GitLab](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html)
