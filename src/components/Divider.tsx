import { useCallback, useEffect, useRef, useState } from "react";
import { Panel } from "../../type";

const Divider = ({ panel }: { panel: Panel }) => {
  const [isResizing, setIsResizing] = useState(false);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<HTMLSpanElement | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !dividerRef.current) return;

      const divider = dividerRef.current as HTMLDivElement;
      const container = divider?.parentElement as HTMLDivElement;
      const containerRect = container?.getBoundingClientRect();
      const dividerRect = divider.getBoundingClientRect();
      const mouseX = e.clientX - containerRect?.left;
      const mouseY = e.clientY - containerRect?.top;
      const containerWidth = containerRect?.width - 20;
      const containerHeight = containerRect?.height - 20;

      const childNodes = container.childNodes;
      const leftPanel = childNodes[0] as HTMLElement;
      const rightPanel = childNodes[2] as HTMLElement;

      if (container.className.includes("row")) {
        const newWidthPercentage = Math.max(
          10,
          Math.min(90, (mouseX / containerWidth) * 100)
        );

        if (positionRef.current) {
          const position = positionRef.current as HTMLSpanElement;
          position.innerText = newWidthPercentage.toFixed(2) + "%";

          // Calculate position relative to divider
          position.style.left = `${e.clientX - dividerRect.left}px`;
          position.style.top = `${e.clientY - dividerRect.top}px`;
        }

        if (leftPanel && rightPanel) {
          leftPanel.style.width = `${newWidthPercentage}%`;
          rightPanel.style.width = `${100 - newWidthPercentage}%`;
        }
      } else {
        const newHeightPercentage = Math.max(
          10,
          Math.min(90, (mouseY / containerHeight) * 100)
        );

        if (positionRef.current) {
          const position = positionRef.current as HTMLSpanElement;
          position.innerText = newHeightPercentage.toFixed(2) + "%";

          // Calculate position relative to divider
          position.style.left = `${e.clientX - dividerRect.left}px`;
          position.style.top = `${e.clientY - dividerRect.top}px`;
        }

        if (leftPanel && rightPanel) {
          leftPanel.style.height = `${newHeightPercentage}%`;
          rightPanel.style.height = `${100 - newHeightPercentage}%`;
        }
      }
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    if (positionRef.current) {
      positionRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    if (isResizing) {
      if (positionRef.current) {
        positionRef.current.style.display = "block";
      }
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={dividerRef}
      onMouseDown={() => setIsResizing(true)}
      className={`flex w-full h-full divider ${panel.id} justify-center items-center group relative`}
      style={{
        backgroundColor: panel?.randomColor,
        width: panel?.width,
        height: panel?.height,
        minHeight: panel?.height,
        minWidth: panel?.width,
      }}
    >
      <span
        className="bg-white text-sm absolute hidden"
        ref={positionRef}
        style={{
          transform: "translate(-50%, -100%)", // Position above the cursor
        }}
      >
        50%
      </span>
    </div>
  );
};

export default Divider;
