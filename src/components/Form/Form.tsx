import {Button, Stack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {FC} from 'react';
import {FormFieldConfig} from './types';
import {InputField} from './fields/InputField';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  formFields?: FormFieldConfig[];
  submitButtonText: string;
};

export const Form: FC<Props> = ({onSubmit, isLoading = false, formFields, submitButtonText}) => {
  const {t} = useTranslation();

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={5}>
        {formFields?.map((formField) => (
          <InputField key={formField.name} {...formField} />
        ))}
        <Button
          type="submit"
          bg="fill-brand"
          color="text-white"
          borderRadius="100px"
          size="md"
          width="full"
          mt={2}
          _hover={{bg: 'fill-brand-hover'}}
          fontSize="text-base"
          fontWeight="text-alternative"
          loading={isLoading}
        >
          {t(submitButtonText)} →
        </Button>
      </Stack>
    </form>
  );
};
