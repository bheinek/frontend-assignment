import {Box, Heading, HStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {FC, ReactNode} from 'react';
import {Logo} from './Logo';

type Props = {
  variant?: 'centered' | 'split';
  rightContent?: ReactNode;
};

export const Header: FC<Props> = ({variant = 'centered', rightContent}) => {
  const {t} = useTranslation();
  const isCentered = variant === 'centered';

  return (
    <Box
      as="header"
      py={4}
      px={isCentered ? 0 : 6}
      borderBottomWidth={isCentered ? '0' : '1px'}
      borderBottomColor={isCentered ? 'transparent' : 'border-gray'}
      bg={isCentered ? 'transparent' : 'fill-white'}
      width="100%"
    >
      {isCentered ? (
        <HStack gap={2} justify="center">
          <Logo size={20} />
          <Heading as="h1" fontSize="text-base" fontWeight="text-base" color="text-primary">
            {t('app.brand')}
          </Heading>
        </HStack>
      ) : (
        <HStack justify="space-between" align="center">
          <HStack gap={3}>
            <Logo size={24} />
            <Heading as="h1" fontSize="heading-3" fontWeight="heading-3" color="text-primary">
              {t('app.brand')}
            </Heading>
          </HStack>
          {rightContent && <Box>{rightContent}</Box>}
        </HStack>
      )}
    </Box>
  );
};
