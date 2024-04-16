type HandlerFunction = (element: Element) => void;

class ObserverManager {
  private observer?: IntersectionObserver;
  private handlers: Map<Element, HandlerFunction>;

  constructor() {
    this.handlers = new Map();

    // Skip when SSR
    if (typeof window === "undefined") {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const handler = this.handlers.get(entry.target);
          if (handler && entry.isIntersecting) {
            handler(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1
      }
    );
  }

  // Return unobserve callback directly
  observe(element: Element, handler: HandlerFunction): () => void {
    this.handlers.set(element, handler);
    this.observer?.observe(element);

    return () => this.unobserve(element);
  }

  unobserve(element: Element): void {
    this.handlers.delete(element);
    this.observer?.unobserve(element);
  }
}

export const observerManager = new ObserverManager();
