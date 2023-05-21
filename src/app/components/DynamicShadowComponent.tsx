import { Box } from '@mui/material';
import { useState, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
  objectId: string;
};

export const DynamicShadow = ({ children, objectId }: Props) => {
  const [drawShadow, setDrawShadow] = useState<Array<string>>([]);

  const checkIfMouseIsOnObject = useCallback(() => {
    return drawShadow.includes(objectId);
  }, [drawShadow, objectId]);

  return (
    <Box
      onMouseOver={() => setDrawShadow((prevState) => [objectId, ...prevState])}
      onMouseLeave={() =>
        setDrawShadow((prevState) =>
          prevState.filter((obj) => obj !== objectId)
        )
      }
      sx={{
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: checkIfMouseIsOnObject()
            ? '0 0 8px rgba(0, 0, 0, 0.5)'
            : 'none',
          borderRadius: '4px',
        },
      }}
    >
      {children}
    </Box>
  );
};
