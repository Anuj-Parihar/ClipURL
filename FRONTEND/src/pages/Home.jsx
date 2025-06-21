import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../components/Layout/Header';
import { UrlForm } from '../components/UrlShortener/UrlForm';
import { UrlResult } from '../components/UrlShortener/UrlResult';
import { UrlHistory } from '../components/UrlShortener/UrlHistory';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { AnimatedContainer } from '../components/common/AnimatedContainer';

export const Home = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Box className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Container maxWidth="md" className="py-8">
        <AnimatedContainer>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-white">
              Shorten Your Links
            </h1>
            <p className="text-lg mb-8 text-center text-gray-600 dark:text-gray-300">
              Fast, free, and easy to use URL shortener
            </p>

            {loading ? (
              <LoadingSpinner size={60} />
            ) : shortUrl ? (
              <>
                <UrlResult shortUrl={shortUrl} />
                <UrlHistory />
              </>
            ) : (
              <UrlForm 
                onShorten={setShortUrl} 
                setLoading={setLoading} 
              />
            )}
          </div>
        </AnimatedContainer>
      </Container>
    </Box>
  );
};