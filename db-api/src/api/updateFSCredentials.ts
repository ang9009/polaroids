import "dotenv/config";
import { setValue } from "node-global-storage";
import puppeteer, { Browser, Page } from "puppeteer";
import { sessionIdKey, synoTokenKey } from "../data/constants";

/**
 * Updates the FileStation session id and SYNO-TOKEN stored in localstorage.
 */
export const updateFSCredentials = async () => {
  console.log("Updating FileStation credentials...");
  const { FS_API_URL } = process.env;
  const url = `${FS_API_URL}/webman/index.cgi`;

  // Create headless browser and login
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // Submit login form and get syno token and session id
  await submitLoginForm(page);
  await updateSynoToken(page);
  await updateSessionId(browser);

  console.log(`Successfully updated FileStation credentials.`);
  await browser.close();
};

/**
 * Updates the session id by getting it from the browser's cookies.
 * @param browser the browser used to login
 */
async function updateSessionId(browser: Browser) {
  const cookies = await browser.cookies();
  if (cookies.length < 2) {
    throw Error("Expected 2 cookies, but got " + cookies.length);
  }
  const sessionIdCookie = cookies[1];
  setValue(sessionIdKey, sessionIdCookie.value);
}

type SynoTokenResponse = {
  SynoToken: string;
};

/**
 * Determines whether a response is a SynoTokenResponse.
 * @param synoTokenRes the response object in question
 * @returns whether it is a SynoTokenResponse
 */
const isSynoTokenResponse = (synoTokenRes: unknown): synoTokenRes is SynoTokenResponse => {
  return (synoTokenRes as SynoTokenResponse).SynoToken !== undefined;
};

/**
 * Waits for the syno token response, which is received after logging in successfully.
 * @param page the login page
 */
async function updateSynoToken(page: Page) {
  const synoTokenRes = await page.waitForResponse((res) => {
    const synoTokenRoute = "login.cgi";
    return res.url().includes(synoTokenRoute);
  });
  const synoTokenResBody = await synoTokenRes.json();
  if (isSynoTokenResponse(synoTokenResBody)) {
    setValue(synoTokenKey, synoTokenResBody.SynoToken);
  }
  await page.waitForSelector("#sds-desktop", { visible: true, timeout: 0 });
}

/**
 * Fills out and submits the login form on the login page.
 * @param page the login page
 */
async function submitLoginForm(page: Page) {
  const { FS_API_USERNAME, FS_API_PASSWORD } = process.env;

  const usernameField = await page.$("#login_username");
  const passwordField = await page.$("#login_passwd");
  if (!usernameField || !passwordField) {
    throw Error("Could not find username/password field");
  }
  await usernameField.type(FS_API_USERNAME!);
  await passwordField.type(FS_API_PASSWORD!);
  const rememberMeBtnId = "#ext-gen22";
  const submitBtnId = "#ext-gen23";
  await page.click(rememberMeBtnId);
  await page.click(submitBtnId);
}
