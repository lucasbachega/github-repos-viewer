import { useEffect } from "react";

export interface UseKeyShortcutOptions {
  meta?: boolean;
  ctrl?: boolean;
}

export function useKeyShortcut(
  key: string,
  callback: () => void,
  options: UseKeyShortcutOptions = {},
) {
  const { meta = true, ctrl = true } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const modifierOk = (meta && e.metaKey) || (ctrl && e.ctrlKey);
      if (modifierOk && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, meta, ctrl, callback]);
}
