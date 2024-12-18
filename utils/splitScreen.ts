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
    const child3Id = `${id}-3`;
    updatedPanels[child1Id] = {
        id: child1Id,
        type: "panel",
        randomColor: color,
        children: [],

    };
    updatedPanels[child2Id] = {
        id: child2Id,
        type: "divider",
        randomColor: "black",
        children: [],
        width: direction === "v" ? "100%" : "20px ",
        height: direction === "h" ? "100%" : "20px ",
    }
    updatedPanels[child3Id] = {
        id: child3Id,
        type: "panel",
        randomColor: randomColor(),
        children: [],
    };

    updatedPanels[id] = {
        ...panel,
        type: direction === "v" ? "column" : "row",
        children: [child1Id, child2Id, child3Id],
    };

    return updatedPanels;
};

export default splitPanel;