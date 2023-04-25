import { useState } from 'react';

export default function useHighlightCard() {
  const [mouseOver, setMouseOver] = useState<string>('');

  function checkIfMouseIsOverCard(
    mousedOverMovieId: string,
    currentMovieId: string
  ): boolean {
    if (mousedOverMovieId === currentMovieId) return true;
    return false;
  }

  return { checkIfMouseIsOverCard, setMouseOver, mouseOver };
}
