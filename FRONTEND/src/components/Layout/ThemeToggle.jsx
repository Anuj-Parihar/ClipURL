import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};