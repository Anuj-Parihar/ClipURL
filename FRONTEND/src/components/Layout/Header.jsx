import { AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import {ThemeToggle} from './ThemeToggle';

export const Header = () => {
  const { darkMode } = useTheme();

  return (
    <AppBar
      position="static"
      className={`${darkMode ? 'bg-gray-900' : 'bg-indigo-600'} shadow-lg`}
    >
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="font-bold">
          URL Shortener
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};