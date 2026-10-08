import { prefersReducedMotion } from "./motion";

export const scrollToTopAndFocusMain = () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  document.getElementById("main")?.focus({ preventScroll: true });
};
