import React, { useState } from "react";
import { PanelAction, PanelsMap } from "../type/index";
import splitPanel from "../utils/splitScreen";
import deletePanel from "../utils/deletePanel";
import randomColor from "../utils/randomColor";
import Panel from "./components/Panel";

// Main App Component
const App: React.FC = () => {
  const [panels, setPanels] = useState<PanelsMap>({
    root: {
      id: "root",
      type: "panel",
      children: [],
      randomColor: randomColor(),
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
