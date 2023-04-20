import { TextField } from '@mui/material';
import { useDebouncedEffect } from 'app/hooks/useDebouncedEffect';
import { isObjOfType } from 'app/utils/typeCheckers';
import { useState, useEffect } from 'react';

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchOMDbComponent = ({ setSearchTerm }: Props) => {
  const [searchedTerm, setSearchedTerm] = useState('');

  const debouncedSearchTerm = useDebouncedEffect(searchedTerm, 750);

  useEffect(() => {
    if (isObjOfType<string>(debouncedSearchTerm))
      setSearchTerm(() => debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <TextField
      fullWidth
      label="search..."
      type="text"
      onChange={(e) => {
        setSearchedTerm(e.target.value);
      }}
    />
  );
};
