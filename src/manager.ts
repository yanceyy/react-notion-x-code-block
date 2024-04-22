type HandlerFunction = (element: Element) => void;
export type ObserverManagerProps = Pick<
  IntersectionObserverInit,
  "rootMargin" | "threshold"
>;

export class ObserverManager {
  private static instances: Map<string, ObserverManager> = new Map();

  private observer?: IntersectionObserver;
  private handlers: Map<Element, HandlerFunction>;

  static getInstance(options: ObserverManagerProps): ObserverManager {
    const key = `${options.rootMargin}-${options.threshold}`;
    if (!ObserverManager.instances.has(key))
      ObserverManager.instances.set(key, new ObserverManager(options));
    return ObserverManager.instances.get(key)!;
  }

  constructor(options: IntersectionObserverInit) {
    this.handlers = new Map();

    // Skip when SSR
    if (typeof window === "undefined") {
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const handler = this.handlers.get(entry.target);
        if (handler && entry.isIntersecting) {
          handler(entry.target);
        }
      });
    }, options);
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
