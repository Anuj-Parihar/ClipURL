import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { shortenUrl } from '../../services/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const UrlForm = ({ onShorten, setLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useLocalStorage('urlHistory', []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      const shortUrl = await shortenUrl(url);
      onShorten(shortUrl);
      setError('');
      
      // Add to history
      const newItem = {
        original: url,
        short: shortUrl,
        date: new Date().toISOString()
      };
      setHistory([newItem, ...history.slice(0, 19)]);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <TextField
  label="Enter URL to shorten"
  variant="outlined"
  fullWidth
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  error={!!error}
  helperText={error}
  placeholder="https://example.com"
  className="[&_.MuiOutlinedInput-root]:dark:border-gray-600"
  sx={{
    // Light mode styles
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#cbd5e1', // gray-300
      },
      '&:hover fieldset': {
        borderColor: '#94a3b8', // gray-400
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9E9E9E', // indigo-500
      },
    },
    // Dark mode styles
    '& .MuiOutlinedInput-root.dark': {
      '& fieldset': {
        borderColor: '#4b5563', // gray-600
      },
      '&:hover fieldset': {
        borderColor: '#6b7280', // gray-500
      },
      '&.Mui-focused fieldset': {
        borderColor: '#818cf8', // indigo-400
      },
    },
  }}
  InputProps={{
    className: 'dark:bg-gray-900 dark:text-white',
  }}
  InputLabelProps={{
    className: 'dark:text-gray-300',
    sx: {
      // Light mode
      color: '#64748b', // slate-500
      '&.Mui-focused': {
        color: '#9E9E9E', // indigo-500
      },
      // Dark mode
      '&.dark': {
        color: '#d1d5db', // gray-300
        '&.Mui-focused': {
          color: '#9E9E9E', // indigo-400
        },
      },
    },
  }}
  FormHelperTextProps={{
    className: 'dark:text-gray-400',
    sx: {
      // Error state
      '&.Mui-error': {
        color: '#ef4444', // red-500 (light)
        '&.dark': {
          color: '#f87171', // red-400 (dark)
        }
      }
    }
  }}
/>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Shorten URL
        </Button>
      </Box>
    </motion.div>
  );
};