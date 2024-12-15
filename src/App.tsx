import React, { useState } from "react";
import { PanelAction, PanelsMap, ActionButtonProps, PanelProps } from "../type/index"
import splitPanel from "../utils/splitScreen";
import deletePanel from "../utils/deletePanel";
import randomColor from "../utils/randomColor";


const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  text,
}) => (
  <button
    aria-label={label}
    className="bg-white text-black py-1 px-3 rounded hover:bg-gray-200 transition-colors"
    onClick={onClick}
  >
    {text}
  </button>
);


const Panel: React.FC<PanelProps> = ({
  id,
  panels,
  dispatch,
  hasMultipleScreens,
}) => {
  const panel = panels[id];
  if (!panel) return null;
  return (
    <div
      className={`
        ${panel.type === "row" ? "flex flex-row" : "flex flex-col"} 
        w-full h-full items-center justify-center
      `}
      style={{ backgroundColor: panel.randomColor }}
    >
      {panel.children.length > 0 ? (
        panel.children.map((childId) => (
          <Panel
            key={childId}
            id={childId}
            panels={panels}
            dispatch={dispatch}
            hasMultipleScreens={hasMultipleScreens}
          />
        ))
      ) : (
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

// Main App Component
const App: React.FC = () => {
  const [panels, setPanels] = useState<PanelsMap>
    ({
      root: {
        id: "root", type: "panel", children: [], randomColor: randomColor
          ()
      },
    });

  // Centralized dispatch function
  const dispatch = (action: PanelAction) => {
    setPanels((prevPanels) => {
      switch (action.type) {
        case "split":
          return splitPanel(
            prevPanels,
            action.payload.id,
            action.payload.direction,
            action.payload.color
          );
        case "delete":
          return deletePanel(prevPanels, action.payload.id);
        default:
          return prevPanels;
      }
    });
  };

  // Calculate panel count for multiple screen check
  const panelCount = Object.keys(panels).length;
  const hasMultipleScreens = panelCount > 1;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <Panel
        id="root"
        panels={panels}
        dispatch={dispatch}
        hasMultipleScreens={hasMultipleScreens}
      />
    </div>
  );
};

export default App;
