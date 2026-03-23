import {useTranslation} from 'react-i18next';
import {Center, Image, Text} from '@chakra-ui/react';
import logo from '@/assets/logo.svg';

export function EmptyState() {
  const {t} = useTranslation();

  return (
    <Center flexDirection="column" py={16}>
      <Image src={logo} alt={t('app.logo_alt')} height="64px" mb={6} opacity={0.4} />
      <Text fontSize="heading.3" fontWeight="heading.2" color="#001141" mb={2}>
        {t('todos.empty.title')}
      </Text>
      <Text fontSize="text.base" color="#4D5667">
        {t('todos.empty.subtitle')}
      </Text>
    </Center>
  );
}
