import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Box, Button, Flex, HStack, Image, Input, Text, Textarea, VStack} from '@chakra-ui/react';
import {toaster} from '@/components/Toaster';
import {useCreateTodoMutation} from './todoApi';
import {useGetMeQuery} from '@/features/auth/authApi';
import logo from '@/assets/logo.svg';
import iconBackwards from '@/assets/icons/icon-backwards.svg';

function Header() {
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

export function TodoCreatePage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [createTodo, {isLoading}] = useCreateTodoMutation();

  const schema = yup.object({
    title: yup.string().required(t('validation.required')),
    description: yup.string().defined().default(''),
  });

  type CreateForm = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CreateForm) => {
    try {
      await createTodo({
        title: data.title,
        description: data.description || undefined,
      }).unwrap();
      navigate('/todos');
    } catch {
      toaster.create({
        title: t('common.error'),
        description: t('todos.error.create'),
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box minHeight="100vh" bg="#F1F2F6">
      <Header />

      <Box maxWidth="800px" mx="auto" px={{base: 0, md: 6}} pb={8}>
        <Box
          bg="white"
          borderRadius={{base: 0, md: '16px'}}
          p={{base: 4, md: 8}}
          boxShadow={{base: 'none', md: 'sm'}}
        >
          <HStack gap={3} mb={8}>
            <button
              type="button"
              onClick={() => navigate('/todos')}
              style={{
                background: 'transparent',
                border: '1px solid #CAD1DE',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image src={iconBackwards} alt={t('common.back')} width="16px" height="16px" />
            </button>
            <Text fontSize="heading.1" fontWeight="heading.1" color="#001141">
              {t('todos.create.heading')}
            </Text>
          </HStack>

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
                  {t('todos.create.task_name')}
                </Text>
                <Input
                  {...register('title')}
                  borderColor={errors.title ? '#E32C1E' : '#CAD1DE'}
                  borderRadius="8px"
                  height="44px"
                  fontSize="text.base"
                  _focus={{borderColor: '#0F62FE', boxShadow: 'none'}}
                />
                {errors.title && (
                  <Text color="#B71C1C" fontSize="text.small" mt={1}>
                    {errors.title.message}
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
                  {t('todos.create.description')}
                </Text>
                <Textarea
                  {...register('description')}
                  borderColor="#CAD1DE"
                  borderRadius="8px"
                  fontSize="text.base"
                  rows={4}
                  _focus={{borderColor: '#0F62FE', boxShadow: 'none'}}
                />
              </Box>

              <Flex justify="space-between" align="center" pt={4}>
                <Button
                  type="button"
                  variant="ghost"
                  color="#001141"
                  fontSize="text.base"
                  fontWeight="text.alternative"
                  bg="transparent"
                  _hover={{bg: '#F1F2F6'}}
                  onClick={() => navigate('/todos')}
                >
                  {t('todos.create.discard')}
                </Button>
                <Button
                  type="submit"
                  height="44px"
                  px={6}
                  borderRadius="100px"
                  bg="#0F62FE"
                  color="white"
                  fontSize="text.base"
                  fontWeight="text.alternative"
                  _hover={{bg: '#0043CE'}}
                  loading={isLoading}
                >
                  {t('todos.create.submit')}
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
