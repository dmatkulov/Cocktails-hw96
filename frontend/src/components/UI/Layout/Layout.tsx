import React from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';
import { Box, Container } from '@mui/material';
import ToastMessage from '../../ToastContainer/ToastMessage';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100vh',
        position: 'relative',
      }}
    >
      <header
        style={{ position: 'sticky', left: 0, right: 0, top: 0, zIndex: 1000 }}
      >
        <AppToolbar />
      </header>
      <main>
        <ToastMessage />
        <Box component="section">{children}</Box>
      </main>
    </Container>
  );
};

export default Layout;
