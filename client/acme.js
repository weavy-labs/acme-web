import "bootstrap";
import { Weavy } from "@weavy/uikit-web";
export * as default from "./components/acme-layout.js";

console.log("Configuring weavy...")

const tokenFactory = async (refresh) => {
  let response = await fetch(`/api/token${refresh ? "?refresh=true" : ""}`);

  if (response.ok) {
    let data = await response.json();
    return data.access_token;
  } else {
    throw new Error("Could not get access token from server!");
  }
};

const weavy = new Weavy();

weavy.url = WEAVY_URL;

weavy.tokenFactory = tokenFactory;

weavy.locales = [
  ["xx-pirate", () => import("./locales/xx-pirate.js")]
];

document.addEventListener("locale", (e) => {
  weavy.locale = e.detail.locale;
});

const storedLocale = localStorage.getItem("locale");
if (storedLocale) {
  weavy.locale = storedLocale;
}

// eslint-disable-next-line no-undef
globalThis.weavy = weavy;

console.log("Weavy configured");