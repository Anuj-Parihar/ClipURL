import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ContentCopy, 
  OpenInNew, 
  CheckCircle 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export const UrlResult = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setOpenSnackbar(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openUrl = () => {
    window.open(shortUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mt-6"
    >
      <Box className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Your shortened URL
        </h3>
        <div className="flex items-center gap-2">
          <TextField
            value={shortUrl}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
              className: 'dark:text-white'
            }}
            className="dark:bg-gray-700"
          />
          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
            <IconButton
              onClick={copyToClipboard}
              color={copied ? 'success' : 'primary'}
              className="dark:text-white"
            >
              {copied ? <CheckCircle /> : <ContentCopy />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Open in new tab">
            <IconButton
              onClick={openUrl}
              color="primary"
              className="dark:text-white"
            >
              <OpenInNew />
            </IconButton>
          </Tooltip>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.location.reload()}
            className="dark:text-white dark:border-white"
          >
            Shorten another URL
          </Button>
        </div>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          URL copied to clipboard!
        </Alert>
      </Snackbar>
    </motion.div>
  );
};