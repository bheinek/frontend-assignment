import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate, Link as RouterLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Box, Button, Center, Input, Text, VStack, Link, Image} from '@chakra-ui/react';
import {toaster} from '../../components/Toaster';
import {useRegisterMutation} from './authApi';
import {credentialsSet} from './authSlice';
import logo from '../../assets/logo.svg';
import iconShow from '../../assets/icons/icon-show.svg';
import iconHide from '../../assets/icons/icon.hide.svg';

const schema = yup.object({
  username: yup.string().required('This field is mandatory.'),
  password: yup.string().required('This field is mandatory.'),
});

type RegisterForm = yup.InferType<typeof schema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, {isLoading}] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await registerUser(data).unwrap();
      dispatch(
        credentialsSet({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        })
      );
      navigate('/todos');
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'data' in err
          ? (err as {data: {error?: string}}).data?.error || 'Registration failed'
          : 'Registration failed';
      toaster.create({
        title: 'Error',
        description: message,
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Center minHeight="100vh" bg="#F1F2F6" px={4}>
      <VStack gap={6} width="100%" maxWidth="460px">
        <Image src={logo} alt="Zentask" height="32px" />

        <Box bg="white" borderRadius="16px" p={10} width="100%" boxShadow="sm">
          <VStack gap={6} align="stretch">
            <Box>
              <Text fontSize="heading.1" fontWeight="heading.1" color="#0F62FE" mb={2}>
                Create your account
              </Text>
              <Text fontSize="text.base" color="#4D5667">
                Join Zentask to start organizing your tasks. Fill in your details below to get
                started.
              </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap={5} align="stretch">
                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontSize="text.small"
                    fontWeight="text.alternative"
                    color="#001141"
                    mb={1}
                  >
                    <Text as="span" color="#E32C1E">
                      *
                    </Text>{' '}
                    Username
                  </Text>
                  <Input
                    {...register('username')}
                    borderColor={errors.username ? '#E32C1E' : '#CAD1DE'}
                    borderRadius="8px"
                    height="44px"
                    fontSize="text.base"
                    _focus={{borderColor: '#0F62FE', boxShadow: 'none'}}
                  />
                  {errors.username && (
                    <Text color="#B71C1C" fontSize="text.small" mt={1}>
                      {errors.username.message}
                    </Text>
                  )}
                </Box>

                <Box>
                  <Text
                    as="label"
                    display="block"
                    fontSize="text.small"
                    fontWeight="text.alternative"
                    color="#001141"
                    mb={1}
                  >
                    <Text as="span" color="#E32C1E">
                      *
                    </Text>{' '}
                    Password
                  </Text>
                  <Box position="relative" width="100%">
                    <Input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      borderColor={errors.password ? '#E32C1E' : '#CAD1DE'}
                      borderRadius="8px"
                      height="44px"
                      fontSize="text.base"
                      pr="44px"
                      _focus={{borderColor: '#0F62FE', boxShadow: 'none'}}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src={showPassword ? iconHide : iconShow}
                        alt={showPassword ? 'Hide password' : 'Show password'}
                        width="20px"
                        height="20px"
                      />
                    </button>
                  </Box>
                  {errors.password && (
                    <Text color="#B71C1C" fontSize="text.small" mt={1}>
                      {errors.password.message}
                    </Text>
                  )}
                </Box>

                <Button
                  type="submit"
                  width="100%"
                  height="48px"
                  borderRadius="100px"
                  bg="#0F62FE"
                  color="white"
                  fontSize="text.base"
                  fontWeight="text.alternative"
                  _hover={{bg: '#0043CE'}}
                  loading={isLoading}
                >
                  Register &nbsp;→
                </Button>
              </VStack>
            </form>

            <Center>
              <Text fontSize="text.small" color="#4D5667">
                Already have an account?{' '}
                <Link asChild color="#0F62FE" fontWeight="text.alternative">
                  <RouterLink to="/login">Log in</RouterLink>
                </Link>
              </Text>
            </Center>
          </VStack>
        </Box>
      </VStack>
    </Center>
  );
}
