import React from 'react';
import { Button, Stack } from '@mui/material';
import { User } from '../../../types';

interface Props {
  user: User | null;
  published: boolean;
  isPublishing: boolean;
  isDeleting: boolean;
  onPublish: () => void;
  onDelete: () => void;
}

const AdminActions: React.FC<Props> = ({
  user,
  published,
  isPublishing,
  isDeleting,
  onPublish,
  onDelete,
}) => {
  return (
    <>
      {user && user.role === 'admin' && (
        <Stack direction="row" spacing={2}>
          {!published && (
            <Button size="small" disabled={isPublishing} onClick={onPublish}>
              {isPublishing ? 'Publishing' : 'Publish'}
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            disableElevation
            disabled={isDeleting}
            onClick={onDelete}
          >
            {isDeleting ? 'Deleting' : 'Delete'}
          </Button>
        </Stack>
      )}
    </>
  );
};

export default AdminActions;
