/**
 * Lightweight event tracking wrapper.
 * Sends to Plausible (window.plausible) if the script is loaded, and
 * always logs to console in development for visibility/debugging.
 *
 * Canonical event catalogue (see brief §7):
 * hero_cta_click, problem_entry_click, solution_view, system_view_open,
 * system_scroll_complete, nav_whatwesolve_open, quickscan_start,
 * quickscan_step_{n}, quickscan_abandon_{n}, quickscan_complete,
 * quickscan_result_to_book, booking_submitted, content_download, insight_read
 */

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;

  if (window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[track]", event, props ?? {});
  }
}
