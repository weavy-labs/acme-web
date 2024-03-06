/**
 * Configuration and startup for the @web/dev-server using the KOA middleware for API endpoints.
 */

import "dotenv/config";
import { startDevServer } from "@web/dev-server";
import { esbuildPlugin } from "@web/dev-server-esbuild";
//import { importMapsPlugin } from "@web/dev-server-import-maps";

import koaMiddleware from "./koa-middleware.mjs";

const WEB_HOSTNAME = process.env.HOSTNAME || "localhost";
const WEB_PORT = parseInt(process.env.PORT) || 3000;
const HTTPS = process.env.HTTPS !== false && process.env.HTTPS !== "false";

const DEBUG = process.env.DEBUG || false;

if (!process.env.WEAVY_URL) {
  throw new Error("No WEAVY_URL defined in .env");
}

async function main() {
  const { server, koaApp, webSockets } = await startDevServer({
    config: {
      open: true,
      nodeResolve: true,
      //appIndex: './client/index.html',
      rootDir: "./client",
      debug: DEBUG,
      hostname: WEB_HOSTNAME,
      port: WEB_PORT,
      plugins: [
        /*importMapsPlugin({
          inject: {
            include: "/*.html",
            importMap: {
              imports: {
                "react": "https://esm.sh/react@18.2.0",
                "react-dom": "https://esm.sh/react-dom@18.2.0"
              },
            },
          },
        }),*/
        esbuildPlugin({
          js: true,
          ts: true,
          target: "auto",
        }),
        {
          name: "env-plugin",
          transform(context) {
            if (context.response.is("html")) {
              let html = context.body;
              html = html.replace("{WEAVY_URL}", process.env.WEAVY_URL);
              html = html.replace("{WEAVY_ZOOM_AUTH_URL}", process.env.WEAVY_ZOOM_AUTH_URL);
              html = html.replace("{WEAVY_CONFLUENCE_AUTH_URL}", process.env.WEAVY_CONFLUENCE_AUTH_URL);
              html = html.replace("{WEAVY_CONFLUENCE_PRODUCT_NAME}", process.env.WEAVY_CONFLUENCE_PRODUCT_NAME);
              return { body: html, transformCache: false };
            }
          },
        },
      ],
      http2: HTTPS,
      sslKey: process.env.HTTPS_PEM_KEY_PATH,
      sslCert: process.env.HTTPS_PEM_CERT_PATH,
    },
    readFileConfig: false,
  });

  // Needed for Socket.IO
  koaApp.server = server;

  koaApp.use(koaMiddleware(koaApp, webSockets.webSocketServer));
}

main();
