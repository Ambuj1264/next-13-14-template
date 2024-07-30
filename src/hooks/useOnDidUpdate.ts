import { useRef, useEffect } from "react";

const useOnDidUpdate = (
  cb: () => void,
  deps: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
  shouldSkipDidUpdate = false,
) => {
  const mounted = useRef<boolean>();
  useEffect(() => {
    if (shouldSkipDidUpdate) return;

    if (!mounted.current) {
      mounted.current = true;
    } else {
      cb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useOnDidUpdate;
