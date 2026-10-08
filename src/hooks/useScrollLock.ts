import { useEffect } from "react";

export const useScrollLock = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const { documentElement: html, body } = document;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
    };
  }, [active]);
};
