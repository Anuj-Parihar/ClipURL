import { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
import { 
  ContentCopy, 
  OpenInNew, 
  History as HistoryIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const UrlHistory = () => {
  const [history] = useLocalStorage('urlHistory', []);
  const [expanded, setExpanded] = useState(false);

  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-md mt-6"
    >
      <Box className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="h6" className="font-semibold dark:text-white">
            <HistoryIcon className="mr-2" />
            Recent Links
          </Typography>
          <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
            {expanded ? 'Hide' : `Show (${history.length})`}
          </Typography>
        </div>

        {expanded && (
          <List className="mt-2">
            {history.map((item, index) => (
              <div key={index}>
                <ListItem className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <ListItemText
                    primary={
                      <a 
                        href={item.short} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {item.short.split('/').pop()}
                      </a>
                    }
                    secondary={
                      <span className="truncate text-gray-600 dark:text-gray-300">
                        {item.original}
                      </span>
                    }
                    className="truncate"
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => navigator.clipboard.writeText(item.short)}
                      className="dark:text-white"
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < history.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
      </Box>
    </motion.div>
  );
};