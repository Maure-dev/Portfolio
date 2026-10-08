import "@testing-library/jest-dom/vitest";
import "../i18n/i18n";

// jsdom doesn't implement matchMedia; several components rely on it.
if (typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// jsdom has no IntersectionObserver: report every target as visible at once
// so Reveal/stat counters render their content in tests.
if (typeof window.IntersectionObserver !== "function") {
  class ImmediateIntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0];
    constructor(private readonly callback: IntersectionObserverCallback) {}
    observe(target: Element) {
      const rect = target.getBoundingClientRect();
      this.callback(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            target,
            time: 0,
            boundingClientRect: rect,
            intersectionRect: rect,
            rootBounds: null,
          },
        ],
        this as unknown as IntersectionObserver
      );
    }
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver =
    ImmediateIntersectionObserver as unknown as typeof IntersectionObserver;
}

// jsdom logs "Not implemented: window.scrollTo"; the shell calls it on navigation.
Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
  configurable: true,
});
