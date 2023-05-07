import { Button } from '@mui/material';

type Props = {
  views: string;
};

export const MovieViewsComponent = ({ views }: Props) => {
  return (
    <Button
      type="button"
      variant="outlined"
      size="small"
      disableRipple
      sx={{ borderRadius: 20, color: '#6C6C6C' }}
    >
      {views} | views
    </Button>
  );
};
