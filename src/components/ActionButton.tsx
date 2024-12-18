import React from "react";
import { ActionButtonProps } from "../../type";

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

export default ActionButton;
