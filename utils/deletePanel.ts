import { PanelsMap } from "../type";

// Function to delete a specific panel
const deletePanel = (panels: PanelsMap, id: string): PanelsMap => {
  const updatedPanels = { ...panels };

  // Find and remove the panel
  delete updatedPanels[id];

  // Remove the panel from its parent's children
  for (const key in updatedPanels) {
    const parentPanel = updatedPanels[key];
    if (parentPanel.children.includes(id)) {
      let dividerId = "";
      let remainingChildId = "";

      // get divider and remaining child id from parent
      parentPanel.children.forEach((p) => {
        if (p === id) {
          console.log(id, p);
        } else if (updatedPanels[p].type === "divider") {
          dividerId = p;
        } else {
          remainingChildId = p;
        }
      });

      //  filter out the regaining panel
      parentPanel.children = parentPanel.children.filter(
        (p) => p !== id && updatedPanels[p].type !== "divider"
      );

      const remainingChild = updatedPanels[remainingChildId];
      // Replace parent with its remaining child
      updatedPanels[key] = {
        ...remainingChild,
        id: key,
      };

      // Remove the divider and remaining child
      delete updatedPanels[remainingChildId];
      delete updatedPanels[dividerId];
      break;
    }
  }

  return updatedPanels;
};

export default deletePanel;
