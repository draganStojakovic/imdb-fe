import { useCallback, useState } from 'react';

export default function useHighlightCard() {
  const [mouseOver, setMouseOver] = useState<string>('');
  const [mouseOverBool, setMouseOverBool] = useState<boolean>(false);

  const checkIfMouseIsOnObject = useCallback(
    (objectId: string, currentObjectId: string): boolean => {
      return objectId === currentObjectId;
    },
    []
  );

  return {
    checkIfMouseIsOnObject,
    setMouseOver,
    mouseOver,
    mouseOverBool,
    setMouseOverBool,
  };
}
