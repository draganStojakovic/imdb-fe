import { useState } from 'react';

export default function useEvent() {
  const [reloadCommentsEvent, setReloadCommentsEvent] = useState(false);

  return { reloadCommentsEvent, setReloadCommentsEvent };
}
