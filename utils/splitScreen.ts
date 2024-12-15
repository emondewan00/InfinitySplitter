import { PanelsMap } from "../type";
import randomColor from "./randomColor";

// Function to split panels vertically or horizontally
const splitPanel = (
    panels: PanelsMap,
    id: string,
    direction: "v" | "h",
    color: string
): PanelsMap => {
    const updatedPanels = { ...panels };
    const panel = updatedPanels[id];

    if (!panel) return updatedPanels;

    const child1Id = `${id}-1`;
    const child2Id = `${id}-2`;

    updatedPanels[child1Id] = {
        id: child1Id,
        type: "panel",
        randomColor: color,
        children: [],
    };
    updatedPanels[child2Id] = {
        id: child2Id,
        type: "panel",
        randomColor: randomColor(),
        children: [],
    };

    updatedPanels[id] = {
        ...panel,
        type: direction === "v" ? "column" : "row",
        children: [child1Id, child2Id],
    };

    return updatedPanels;
};

export default splitPanel;