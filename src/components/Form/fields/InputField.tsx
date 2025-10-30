import {Field, Input, Text} from '@chakra-ui/react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {FormFieldConfig} from '../types';

type Props = FormFieldConfig;

export const InputField: FC<Props> = ({
  name,
  labelText,
  placeholderText,
  type = 'text',
  required = false,
}) => {
  const {t} = useTranslation();

  return (
    <Field.Root required={required}>
      <Text
        as="label"
        fontSize="text-small"
        fontWeight="text-alternative"
        color="text-primary"
        mb={1.5}
        display="block"
      >
        {t(labelText)}{' '}
        {required && (
          <Text as="span" color="text-danger">
            *
          </Text>
        )}
      </Text>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={t(placeholderText)}
        size="md"
        borderColor="border-gray"
        _hover={{borderColor: 'border-brand'}}
        _focus={{
          borderColor: 'border-brand',
          boxShadow: '0 0 0 1px {colors.border-brand}',
        }}
      />
    </Field.Root>
  );
};
