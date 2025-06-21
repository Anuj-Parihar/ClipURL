import { CircularProgress } from '@mui/material';

export const LoadingSpinner = ({ size = 24 }) => (
  <div className="flex justify-center items-center p-4">
    <CircularProgress size={size} />
  </div>
);