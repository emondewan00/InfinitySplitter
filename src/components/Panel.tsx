import React from "react";
import { PanelProps } from "../../type";
import ActionButton from "./ActionButton";
import Divider from "./Divider";

const Panel: React.FC<PanelProps> = ({
  id,
  panels,
  dispatch,
  hasMultipleScreens,
}) => {
  const panel = panels[id];

  let containerStyle = "";
  const applyStyle = (type: "row" | "column" | "panel" | "divider") => {
    switch (type) {
      case "row":
        containerStyle =
          "flex flex-row w-full h-full items-center justify-center row";
        break;

      case "column":
        containerStyle =
          "flex flex-col w-full h-full items-center justify-center column";
        break;

      case "panel":
        containerStyle = "flex items-center justify-center w-full h-full panel";
        break;
      default:
    }
    return containerStyle;
  };

  if (panel.type === "divider") {
    return <Divider panel={panel} />;
  }

  return (
    <div
      className={applyStyle(panel.type)}
      style={{ backgroundColor: panel.randomColor }}
    >
      {panel.children.length > 0
        ? panel.children.map((childId) => (
            <Panel
              key={childId}
              id={childId}
              panels={panels}
              dispatch={dispatch}
              hasMultipleScreens={hasMultipleScreens}
            />
          ))
        : panel.type === "panel" && (
            <div className="flex space-x-2">
              <ActionButton
                label="Vertical Split"
                onClick={() =>
                  dispatch({
                    type: "split",
                    payload: { id, direction: "v", color: panel.randomColor },
                  })
                }
                text="v"
              />
              <ActionButton
                label="Horizontal Split"
                onClick={() =>
                  dispatch({
                    type: "split",
                    payload: { id, direction: "h", color: panel.randomColor },
                  })
                }
                text="h"
              />
              {hasMultipleScreens && (
                <ActionButton
                  label="Remove Panel"
                  onClick={() =>
                    dispatch({
                      type: "delete",
                      payload: { id },
                    })
                  }
                  text="-"
                />
              )}
            </div>
          )}
    </div>
  );
};

export default Panel;
