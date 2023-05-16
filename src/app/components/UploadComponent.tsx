import { Box, Button, ListItem, Typography, Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { uploadService } from 'app/services/upload.service';
import { IPoster } from 'app/types/IPoster';
import { isPoster, isPosterDelete } from 'app/utils/typeCheckers';
import { IError } from 'app/types/IError';
import { isErrors } from 'app/utils/typeCheckers';

type Props = {
  setPoster: React.Dispatch<React.SetStateAction<IPoster | null>>;
  setErrors: React.Dispatch<React.SetStateAction<IError | null>>;
  error: IError | null;
  poster: IPoster | null;
};

export const UploadComponent = ({
  setPoster,
  setErrors,
  error,
  poster,
}: Props) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const formData = new FormData();
    e.target.files && formData.append('poster', e.target?.files[0]);
    uploadService
      .UploadFile(formData)
      .then((data) => isPoster(data) && setPoster(data))
      .catch((err) => isErrors(err) && setErrors(err));
  }

  function deleteFile(posterId: string) {
    uploadService
      .DeleteFile(posterId)
      .then((data) => isPosterDelete(data) && setPoster(null))
      .catch((err) => isErrors(err) && setPoster(null));
  }

  return (
    <Stack direction="row" spacing={0}>
      <ListItem>
        <Box sx={{ marginRight: '1rem' }}>
          <input
            ref={uploadInputRef}
            type="file"
            name="poster"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => uploadImage(e)}
          />
          <Button
            disabled={isPoster(poster)}
            onClick={() =>
              uploadInputRef.current && uploadInputRef.current.click()
            }
            variant="contained"
          >
            Upload
          </Button>
        </Box> 
        {isPoster(poster) && (
          <Stack direction="row" spacing={2}>
            <IconButton
              aria-label="delete"
              onClick={() => deleteFile(poster.id)}
            >
              ✖️
            </IconButton>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                marginRight: '2rem',
              }}
            >
              Image uploaded successfully!
            </Typography>
          </Stack>
        )}
        {isErrors(error) && (
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left',
            }}
          >
            {error.errors[0].msg}
          </Typography>
        )}
      </ListItem>
    </Stack>
  );
};
