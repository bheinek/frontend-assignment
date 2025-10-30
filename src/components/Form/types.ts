import type {InputProps} from '@chakra-ui/react';

export type FormFieldConfig = {
  name: string;
  labelText: string;
  placeholderText: string;
  type?: InputProps['type'];
  required?: boolean;
};
