import { Box, Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { motion } from 'framer-motion';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <Container maxWidth="md" className="py-8 flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Typography variant="h1" className="text-9xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            404
          </Typography>
          <Typography variant="h4" className="mb-6 text-gray-800 dark:text-white">
            Oops! Page not found
          </Typography>
          <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Go Back Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};