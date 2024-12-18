import { useCallback, useEffect, useRef, useState } from "react";
import { Panel } from "../../type";

const Divider = ({ panel }: { panel: Panel }) => {
  const [isResizing, setIsResizing] = useState(false);
  const dividerRef = useRef(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !dividerRef.current) return;

      const divider = dividerRef.current as HTMLDivElement;
      const container = divider?.parentElement as HTMLDivElement;
      const containerRect = container?.getBoundingClientRect();
      const mouseX = e.clientX - containerRect?.left;
      const containerWidth = containerRect?.width - 20;
      const containerHeight = containerRect?.height - 20;
      const mouseY = e.clientY - containerRect?.top;
      const childNodes = container.childNodes;
      const leftPanel = childNodes[0] as HTMLElement;
      const rightPanel = childNodes[2] as HTMLElement;

      if (container.className.includes("row")) {
        // Calculate percentage and clamp between 10% and 90%
        const newWidthPercentage = Math.max(
          10,
          Math.min(90, (mouseX / containerWidth) * 100)
        );

        if (leftPanel && rightPanel) {
          leftPanel.style.width = `${newWidthPercentage}%`;
          rightPanel.style.width = `${100 - newWidthPercentage}%`;
        }
      } else {
        const newHeightPercentage = Math.max(
          10,
          Math.min(90, (mouseY / containerHeight) * 100)
        );

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
  }, []);

  useEffect(() => {
    // Add event listeners when resizing starts
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={dividerRef}
      onMouseDown={() => setIsResizing(true)}
      className={`flex w-full h-full  divider ${panel.id}`}
      style={{
        backgroundColor: panel?.randomColor,
        width: panel?.width,
        height: panel?.height,
        minHeight: panel?.height,
        minWidth: panel?.width,
      }}
    ></div>
  );
};

export default Divider;
