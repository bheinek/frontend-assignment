import {Box, VStack} from '@chakra-ui/react';
import {Outlet} from 'react-router-dom';
import {Header} from '../components/elements/Header';

export const AuthLayout = () => (
  <Box minH="100vh" display="flex" flexDirection="column" bg="fill-secondary">
    <Header variant="centered" />
    <Box flex="1" display="flex" alignItems="flex-start" justifyContent="center" pt={12} p={4}>
      <VStack gap={6} width="full" maxW="480px">
        <Outlet />
      </VStack>
    </Box>
  </Box>
);
