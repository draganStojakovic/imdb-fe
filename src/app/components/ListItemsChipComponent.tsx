import { IGenre } from 'app/types/IGenre';
import { Stack, Chip } from '@mui/material';

type Props = {
  list: IGenre[];
  direction: 'row' | 'column';
};

export const ListItemsChipComponent = ({ list, direction }: Props) => {
  return (
    <Stack direction={direction} spacing={2}>
      {list.map((object, i) => (
        <Chip key={i} label={object.name} variant="outlined" />
      ))}
    </Stack>
  );
};
