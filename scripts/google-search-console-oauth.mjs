import fs from "node:fs";
import http from "node:http";
import { URL } from "node:url";

const scope = "https://www.googleapis.com/auth/webmasters.readonly";
const defaultRedirectUri = "http://127.0.0.1:8765/oauth/callback";
const args = process.argv.slice(2);
const helpRequested = args.includes("--help") || args.includes("-h");
const clientPath = getArg("--client") || process.env.GOOGLE_OAUTH_CLIENT_JSON_PATH;
const codeArg = getArg("--code");
const redirectUri = getArg("--redirect-uri") || defaultRedirectUri;
const writeEnvPath = getArg("--write-env");
const printUrlOnly = args.includes("--print-url");

if (helpRequested || !clientPath) {
  console.error("Usage: node scripts/google-search-console-oauth.mjs --client /path/to/client_secret.json [--code CODE]");
  console.error("Options:");
  console.error("  --redirect-uri URL     Defaults to http://127.0.0.1:8765/oauth/callback");
  console.error("  --print-url            Print the Google authorization URL and exit");
  console.error("  --write-env PATH       Write GOOGLE_OAUTH_* values to an untracked env file after authorization");
  process.exit(helpRequested ? 0 : 1);
}

const config = JSON.parse(fs.readFileSync(clientPath, "utf8"));
const client = config.web || config.installed;

if (!client?.client_id || !client?.client_secret) {
  console.error("The client JSON must contain a web or installed OAuth client.");
  process.exit(1);
}

if (!client.redirect_uris?.includes(redirectUri)) {
  console.error(`Warning: OAuth client redirect_uris does not include ${redirectUri}`);
  console.error("Add it in Google Cloud Console before opening the authorization URL, or pass an allowed --redirect-uri.");
  console.error("");
}

if (codeArg) {
  const token = await exchangeCode(codeArg);
  printTokenInstructions(token);
} else {
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", client.client_id);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scope);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("Open this URL in the Google account that owns Search Console:");
  console.log(authUrl.toString());
  if (printUrlOnly) process.exit(0);
  console.log("");
  console.log(`Waiting for callback on ${redirectUri} ...`);

  const code = await waitForCode(new URL(redirectUri));
  const token = await exchangeCode(code);
  printTokenInstructions(token);
}

async function exchangeCode(code) {
  const body = new URLSearchParams({
    client_id: client.client_id,
    client_secret: client.client_secret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const token = await response.json();
  if (!response.ok) {
    throw new Error(token.error_description || token.error || `Token exchange failed: ${response.status}`);
  }
  return token;
}

function waitForCode(callbackUrl) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url || "/", callbackUrl.origin);
      if (requestUrl.pathname !== callbackUrl.pathname) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const error = requestUrl.searchParams.get("error");
      const code = requestUrl.searchParams.get("code");
      response.writeHead(error ? 400 : 200, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(error ? `Authorization failed: ${error}` : "Authorization complete. You can close this tab.");
      server.close();

      if (error) reject(new Error(error));
      else if (code) resolve(code);
      else reject(new Error("Missing OAuth code."));
    });

    server.listen(Number(callbackUrl.port || 8765), callbackUrl.hostname, () => {});
  });
}

function printTokenInstructions(token) {
  if (!token.refresh_token) {
    console.log("Google did not return a refresh_token. Re-run with prompt=consent or remove the app grant in Google Account permissions.");
    return;
  }

  if (writeEnvPath) {
    const clientJsonB64 = Buffer.from(JSON.stringify(config)).toString("base64");
    fs.appendFileSync(
      writeEnvPath,
      [
        "",
        "# Google Search Console OAuth for GEO/SEO automation",
        `GOOGLE_OAUTH_CLIENT_JSON_B64=${clientJsonB64}`,
        `GOOGLE_OAUTH_REFRESH_TOKEN=${token.refresh_token}`,
        "",
      ].join("\n"),
    );
    console.log("");
    console.log(`OAuth values were written to ${writeEnvPath}. Do not commit this file.`);
  }

  console.log("");
  console.log("Refresh token received. Do not paste it into chat.");
  console.log("Set it with:");
  console.log("wrangler secret put GOOGLE_OAUTH_REFRESH_TOKEN");
  console.log("");
  console.log("Also base64 the OAuth client JSON and set:");
  console.log("wrangler secret put GOOGLE_OAUTH_CLIENT_JSON_B64");
}

function getArg(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
}
