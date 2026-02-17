"use client";

import { useEffect } from "react";

function extractTargetUrl(source) {
  if (!source) return "";
  return source.src || source.href || source.currentSrc || "";
}

function isBlockedResourceUrl(url = "") {
  if (!url) return false;
  return (
    url.includes("youtubei/v1/log_event") ||
    url.includes("youtube.com/youtubei/") ||
    url.includes("doubleclick.net")
  );
}

function isBlockedByClient(reason, event) {
  const message = typeof reason === "string" ? reason : reason?.message || "";
  if (typeof message === "string" && message.includes("ERR_BLOCKED_BY_CLIENT")) {
    return true;
  }

  const reasonUrl = extractTargetUrl(reason?.target);
  if (isBlockedResourceUrl(reasonUrl)) return true;

  const eventUrl = extractTargetUrl(event?.target);
  if (isBlockedResourceUrl(eventUrl)) return true;

  if (
    event?.type === "unhandledrejection" &&
    Object.prototype.toString.call(reason) === "[object Event]"
  ) {
    return true;
  }

  return false;
}

export default function ClientRuntimeGuards() {
  useEffect(() => {
    const onUnhandledRejection = (event) => {
      if (isBlockedByClient(event?.reason, event)) {
        event.preventDefault();
      }
    };

    const onWindowError = (event) => {
      if (isBlockedByClient(event?.error, event)) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onWindowError, true);

    return () => {
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onWindowError, true);
    };
  }, []);

  return null;
}
