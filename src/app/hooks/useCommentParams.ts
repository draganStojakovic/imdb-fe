import { useState } from 'react';

export default function useCommentParams() {
  const [commentLimit, setCommentLimit] = useState(5);

  function loadMoreComments() {
    const newLimit = commentLimit + 5;
    setCommentLimit(newLimit);
  }

  return { commentLimit, setCommentLimit, loadMoreComments };
}
