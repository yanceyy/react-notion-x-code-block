import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useCodeBlock } from "./context/codeBlock";
import { codeToHtml } from "shiki";
import { ObserverManager } from "../manager";

export function Content() {
  const { lang, content, intersectionObserverOptions, lazyRendering, themes } =
    useCodeBlock();
  const [code, setCode] = useState<string | undefined>(undefined);
  const codeRef = useRef<HTMLPreElement | null>(null);
  const observerManager = useMemo(() => {
    return ObserverManager.getInstance(intersectionObserverOptions);
  }, [intersectionObserverOptions]);

  const renderCodeToHtml = useCallback(async () => {
    const htmlCode = await codeToHtml(content, {
      lang: lang.toLowerCase(),
      themes
    });

    setCode(htmlCode);

    if (codeRef.current) {
      observerManager.unobserve(codeRef.current);
    }
  }, [content, themes, observerManager, lang]);

  useEffect(() => {
    // if code is not null (means the highlighted codes have been rendered), we don't want to observe it again
    if (code) return;

    const element = codeRef.current;
    let unobservedElement = null;

    if (lazyRendering) {
      if (element) {
        unobservedElement = observerManager.observe(element, renderCodeToHtml);
      }
    } else {
      renderCodeToHtml();
    }

    return () => {
      unobservedElement?.();
    };
  }, [renderCodeToHtml, lazyRendering, code, observerManager]);

  return !code ? (
    <pre ref={codeRef}>{content}</pre>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: code }} />
  );
}
