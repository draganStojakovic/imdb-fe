import { Button, Box } from '@mui/material';

type Props = {
  loadMore: () => void;
};

export const LoadMoreComponent = ({ loadMore }: Props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        type="button"
        sx={{ borderRadius: 20 }}
        variant="contained"
        size="small"
        onClick={() => loadMore()}
      >
        Load More
      </Button>
    </Box>
  );
};
