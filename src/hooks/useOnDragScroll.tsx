import { useEffect, RefObject, useState, useCallback, useRef } from "react";

const useOnDragScroll = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const startX = useRef<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsMouseDown(true);
      if (!ref.current) return;
      startX.current = e.pageX - ref.current.offsetLeft;
      setScrollLeft(ref.current.scrollLeft);
    },
    [ref],
  );

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!ref.current) return;
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 3;
      if (isMouseDown) {
        // eslint-disable-next-line no-param-reassign
        ref.current.scrollLeft = scrollLeft - walk;
      }
    },
    [ref, isMouseDown, scrollLeft, startX],
  );

  useEffect(() => {
    const currentRef = ref?.current; // Copy ref.current to a variable

    currentRef?.addEventListener("mouseup", onMouseUp);
    currentRef?.addEventListener("mousedown", onMouseDown);
    currentRef?.addEventListener("mousemove", onMouseMove);
    currentRef?.addEventListener("mouseleave", onMouseUp);

    return () => {
      // Use the variable for cleanup
      currentRef?.removeEventListener("mouseup", onMouseUp);
      currentRef?.removeEventListener("mousedown", onMouseDown);
      currentRef?.removeEventListener("mousemove", onMouseMove);
      currentRef?.removeEventListener("mouseleave", onMouseUp);
    };
  }, [ref, onMouseDown, onMouseMove]);
};

export default useOnDragScroll;
