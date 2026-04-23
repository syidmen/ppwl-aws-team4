import { createApp } from "./index";
import { loadConfig } from "./config";
import { getPrisma } from "../prisma/dbPostgres.ts";

let app: ReturnType<typeof createApp>;

export const handler = async (event: any) => {
  await loadConfig();

  if (!app) {
    app = createApp(getPrisma);
  }

  console.log("[DATABASE_URL]:", process.env.DATABASE_URL);
  console.log("[FRONTEND_URL]:", process.env.FRONTEND_URL);

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