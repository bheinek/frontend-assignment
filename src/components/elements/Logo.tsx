import {Image, type ImageProps} from '@chakra-ui/react';
import LogoSvg from '../../assets/logo.svg';
import {FC} from 'react';

export type Props = Omit<ImageProps, 'src' | 'alt'> & {
  size?: string | number;
};

export const Logo: FC<Props> = ({size = '77px', ...props}) => (
  <Image src={LogoSvg} alt="Zentask Logo" width={size} height="auto" {...props} />
);
