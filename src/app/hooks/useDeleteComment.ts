import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ICommentDelete, ICommentDeleteResponse } from 'app/types/IComment';
import { commentsService } from 'app/services/comments.service';
import { AxiosResponse } from 'axios';
import { isObjOfType } from 'app/utils/typeCheckers';
import { useContext } from 'react';
import { EventContext } from 'app/context/EventContext';

export default function useDeleteComment(
  commentId: string,
  movieId: string,
  userId: string
) {
  const { setReloadCommentsEvent } = useContext(EventContext);

  const { handleSubmit } = useForm<ICommentDelete>({
    defaultValues: {
      commentId: commentId,
      movieId: movieId,
      userId: userId,
    },
  });

  const { mutate } = useMutation(commentsService.deleteCommment, {
    onSuccess: (data: AxiosResponse<ICommentDeleteResponse>) => {
      if (isObjOfType<ICommentDeleteResponse>(data))
        setReloadCommentsEvent(true);
    },
  });

  const onSubmit: SubmitHandler<ICommentDelete> = async (data) => {
    mutate(data);
  };

  return {
    onSubmit,
    handleSubmit,
  };
}
