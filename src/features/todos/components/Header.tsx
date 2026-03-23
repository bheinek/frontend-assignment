import {useTranslation} from 'react-i18next';
import {Box, Flex, HStack, Image, Text} from '@chakra-ui/react';
import {useGetMeQuery} from '@/features/auth/authApi';
import logo from '@/assets/logo.svg';

export function Header() {
  const {t} = useTranslation();
  const {data: user} = useGetMeQuery();

  return (
    <Flex
      justify="space-between"
      align="center"
      px={6}
      py={4}
      width="100%"
      maxWidth="800px"
      mx="auto"
    >
      <Image src={logo} alt={t('app.logo_alt')} height="24px" />
      {user && (
        <HStack gap={2}>
          <Box
            width="32px"
            height="32px"
            borderRadius="50%"
            bg="#0F62FE"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontSize="text.small" fontWeight="heading.2">
              {user.username.charAt(0).toUpperCase()}
            </Text>
          </Box>
          <Text
            fontSize="text.small"
            fontWeight="text.alternative"
            color="#001141"
            display={{base: 'none', md: 'block'}}
          >
            {user.username}
          </Text>
        </HStack>
      )}
    </Flex>
  );
}
