export type PanelType = "panel" | "row" | "column" | "divider";

export interface Panel {
    id: string;
    type: PanelType;
    children: string[];
    randomColor: string;
    height?: string;
    width?: string;
}

export type PanelsMap = Record<string, Panel>;


export type SplitAction = {
    type: "split",
    payload: {
        id: string,
        direction: "v" | "h",
        color: string
    },
};

export type DeleteAction = {
    type: "delete",
    payload: {
        id: string,
    },
};

export type PanelAction = SplitAction | DeleteAction;


export interface ActionButtonProps {
    label: string;
    onClick: () => void;
    text: string;
}


export interface PanelProps {
    id: string;
    panels: PanelsMap;
    dispatch: (action: PanelAction) => void;
    hasMultipleScreens: boolean;
}