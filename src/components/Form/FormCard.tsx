import {Box, Heading, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {FC, ReactNode} from 'react';

type Props = {
  titleKey: string;
  descriptionKey?: string;
  children: ReactNode;
};

export const FormCard: FC<Props> = ({titleKey, descriptionKey, children}) => {
  const {t} = useTranslation();

  return (
    <Box bg="fill-white" borderRadius="16px" p={8} width="full" boxShadow="card">
      <VStack gap={6} align="stretch">
        <VStack gap={3} align="stretch">
          <Heading as="h2" fontSize="heading-2" fontWeight="heading-2" color="text-primary">
            {t(titleKey)}
          </Heading>
          {descriptionKey && (
            <Text fontSize="text-small" color="text-secondary" lineHeight="1.5">
              {t(descriptionKey)}
            </Text>
          )}
        </VStack>
        {children}
      </VStack>
    </Box>
  );
};
