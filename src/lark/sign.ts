export const larkSign = async (
  secret: string,
  timestamp = String(Date.now()).slice(0, 10)
) => {
  const payload = `${timestamp}\n${secret}`;

  if (process.env.CF_WORKER) {
    // Cloudflare Worker
    const signBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(payload)
    );
    const sign = btoa(String.fromCharCode(...new Uint8Array(signBuffer)));
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
