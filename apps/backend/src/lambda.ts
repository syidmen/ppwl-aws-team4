import { createApp } from "./index";
import { loadConfig } from "./config";       // SSM loader
import { getPrisma } from "../prisma/dbPostgres.ts"; // PostgreSQL

let app: ReturnType<typeof createApp>;

export const handler = async (event: any) => {
  await loadConfig(); // load SSM sekali, lalu di-cache

  if (!app) {
    app = createApp(getPrisma); // buat app setelah env ready
  }

  console.log("[DATABASE_URL]:", process.env.DATABASE_URL);

  const url = `https://${event.headers.host}${event.rawPath}${
    event.rawQueryString ? "?" + event.rawQueryString : ""
  }`;

  const response = await app.handle(
    new Request(url, {
      method: event.requestContext.http.method,
      headers: event.headers,
      body: event.body
        ? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8")
        : undefined,
    })
  );

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: await response.text(),
    isBase64Encoded: false,
  };
};