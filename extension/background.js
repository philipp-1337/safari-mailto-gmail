function decodeParam(value) {
  if (!value) return "";
  return decodeURIComponent(value.replace(/\+/g, " "));
}

function normalizeNewlines(value) {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function parseMailto(href) {
  const url = new URL(href);
  const params = new URLSearchParams(url.search);

  return {
    to: decodeParam(url.pathname || "").trim(),
    cc: normalizeNewlines(decodeParam(params.get("cc"))).trim(),
    bcc: normalizeNewlines(decodeParam(params.get("bcc"))).trim(),
    subject: normalizeNewlines(decodeParam(params.get("subject"))).trim(),
    body: normalizeNewlines(decodeParam(params.get("body"))).trim()
  };
}

function buildGmailComposeUrl(mailto) {
  const gmail = new URL("https://mail.google.com/mail/u/0/");
  gmail.searchParams.set("view", "cm");
  gmail.searchParams.set("fs", "1");

  if (mailto.to) gmail.searchParams.set("to", mailto.to);
  if (mailto.cc) gmail.searchParams.set("cc", mailto.cc);
  if (mailto.bcc) gmail.searchParams.set("bcc", mailto.bcc);
  if (mailto.subject) gmail.searchParams.set("su", mailto.subject);
  if (mailto.body) gmail.searchParams.set("body", mailto.body);

  return gmail.toString();
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (!message || message.type !== "mailto-click" || !message.href) return;

  try {
    const mailto = parseMailto(message.href);
    const gmailCompose = buildGmailComposeUrl(mailto);

    const sourceTabId = sender && sender.tab ? sender.tab.id : null;
    if (typeof sourceTabId === "number") {
      await browser.tabs.update(sourceTabId, { url: gmailCompose });
    } else {
      await browser.tabs.create({ url: gmailCompose });
    }
  } catch (error) {
    console.error("Failed to open Gmail compose", error);
  }
});
