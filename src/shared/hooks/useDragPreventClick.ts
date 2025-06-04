import { useState } from "react";

export const useDragPreventClick = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleClick,
    isDragging,
  };
};
