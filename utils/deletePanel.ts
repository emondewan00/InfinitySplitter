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
            // Remove the deleted panel from parent's children
            parentPanel.children = parentPanel.children.filter(
                (childId) => childId !== id
            );

            // If parent is left with only one child, simplify the structure
            if (parentPanel.children.length === 1) {
                const remainingChildId = parentPanel.children[0];
                const remainingChild = updatedPanels[remainingChildId];

                // Replace parent with its remaining child
                updatedPanels[key] = {
                    ...remainingChild,
                    id: key,
                };
                delete updatedPanels[remainingChildId];
            }
            break;
        }
    }

    return updatedPanels;
};

export default deletePanel