import useGenres from 'app/hooks/useGenres';
import { List, ListItem, Button } from '@mui/material';
import { useContext } from 'react';
import { MovieParamsContext } from 'app/context/MovieParamsContext';

export const FilterGenresComponent = () => {
  const { getGenres } = useGenres();
  const { genres, setGenres, setPage } = useContext(MovieParamsContext);

  function isButtonClicked(genres: string, value: string) {
    if (genres.includes(value)) return true;
    return false;
  }

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
      {getGenres() &&
        getGenres()?.map((genre) => (
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
