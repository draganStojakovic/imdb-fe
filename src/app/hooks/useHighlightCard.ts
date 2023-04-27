import { useState } from 'react';

export default function useHighlightCard() {
  const [mouseOver, setMouseOver] = useState<string>('');
  const [mouseOverBool, setMouseOverBool] = useState<boolean>(false);

  function checkIfMouseIsOnObject(
    objectId: string,
    currentObjectId: string
  ): boolean {
    if (objectId === currentObjectId) return true;
    return false;
  }

  return {
    checkIfMouseIsOnObject,
    setMouseOver,
    mouseOver,
    mouseOverBool,
    setMouseOverBool,
  };
}
