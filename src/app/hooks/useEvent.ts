import { useState } from 'react';

export default function useEvent() {
  const [reloadCommentsEvent, setReloadCommentsEvent] = useState(false);
  const [loadMoreCommentsEvent, setLoadMoreCommentsEvent] = useState(5);

  return {
    reloadCommentsEvent,
    setReloadCommentsEvent,
    loadMoreCommentsEvent,
    setLoadMoreCommentsEvent,
  };
}
