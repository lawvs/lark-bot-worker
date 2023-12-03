/**
 * Ported from [How to get HMAC with Crypto Web API](https://stackoverflow.com/questions/47329132/how-to-get-hmac-with-crypto-web-api)
 */
const webCryptoHmacSha256 = async (secret: string, body = "") => {
  const enc = new TextEncoder();
  const algorithm = { name: "HMAC", hash: "SHA-256" };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    algorithm,
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(body),
  );
  const digest = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return digest;
};

/**
 * See [Security settings - Feishu](https://www.feishu.cn/hc/en-US/articles/360024984973#lineguid-n2ogCT)
 */
export const larkSign = async (
  secret: string,
  timestamp = String(Date.now()).slice(0, 10),
) => {
  const payload = `${timestamp}\n${secret}`;

  if (process.env.CF_WORKER) {
    // Cloudflare Workers
    const sign = await webCryptoHmacSha256(payload);
    return {
      sign,
      timestamp,
    };
  } else {
    // Node.js
    const crypto = await import("crypto");
    const sign = crypto.createHmac("sha256", payload).digest("base64");
    return {
      sign,
      timestamp,
    };
  }
};
