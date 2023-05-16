import { List, ListItem, Button } from '@mui/material';
import { useContext } from 'react';
import { MovieParamsContext } from 'app/context/MovieParamsContext';
import useGetGenres from 'app/hooks/useGetGenres';
import { isGenres } from 'app/utils/typeCheckers';

function isButtonClicked(genres: string, value: string): boolean {
  return genres.includes(value);
}

export const FilterGenresComponent = () => {
  const { genres, setGenres, setPage } = useContext(MovieParamsContext);

  const dbGenres = useGetGenres();

  function handleAddGenre(e: React.ChangeEvent<unknown>) {
    const value = (e.target as HTMLButtonElement).value;
    setPage(1);

    if (genres === '') {
      setGenres(value);
      return;
    }
    const newGenres = genres + `,${value}`;

    setGenres(newGenres);
  }

  function handleRemoveGenre(e: React.ChangeEvent<unknown>) {
    const value = (e.target as HTMLButtonElement).value;
    setPage(1);

    if (genres.includes(value) && genres.startsWith(value)) {
      if (!genres.includes(',')) {
        setGenres('');
        return;
      }
      const newGenres = genres.replace(`${value},`, '');
      setGenres(newGenres);
      return;
    }
    if (genres.includes(value) && !genres.startsWith(value)) {
      const newGenres = genres.replace(`,${value}`, '');
      setGenres(newGenres);
      return;
    }
  }

  return (
    <List
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        maxHeight: '70%',
        overflow: 'auto',
      }}
    >
      {isGenres(dbGenres) &&
        dbGenres.map((genre) => (
          <ListItem key={genre.id}>
            <Button
              type="button"
              variant="contained"
              size="small"
              color={isButtonClicked(genres, genre.id) ? 'success' : 'primary'}
              sx={{ borderRadius: 10 }}
              value={genre.id}
              onClick={
                isButtonClicked(genres, genre.id)
                  ? handleRemoveGenre
                  : handleAddGenre
              }
            >
              {genre.name}
            </Button>
          </ListItem>
        ))}
    </List>
  );
};
