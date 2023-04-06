import { Button, Box } from '@mui/material';

type Props = {
  commentLimit: number;
  loadMore: (loadMoreCommentsEvent: number) => void;
};

export const LoadMoreComponent = ({ loadMore, commentLimit }: Props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        type="button"
        sx={{ borderRadius: 20 }}
        variant="contained"
        size="small"
        onClick={() => {
          const newLimit = commentLimit + 5;
          loadMore(newLimit);
        }}
      >
        Load More
      </Button>
    </Box>
  );
};
