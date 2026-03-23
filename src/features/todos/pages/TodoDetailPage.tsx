import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {toaster} from '@/utils/toaster';
import {
  useGetTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useIncompleteTodoMutation,
} from '../todoApi';
import {Header} from '../components/Header';
import iconBackwards from '@/assets/icons/icon-backwards.svg';

export function TodoDetailPage() {
  const {t} = useTranslation();
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {data: todo, isLoading} = useGetTodoQuery(id!);
  const [updateTodo, {isLoading: isUpdating}] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const [incompleteTodo] = useIncompleteTodoMutation();

  const schema = yup.object({
    title: yup.string().required(t('validation.required')),
    description: yup.string().defined().default(''),
  });

  type EditForm = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<EditForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (todo) {
      reset({title: todo.title, description: todo.description ?? ''});
    }
  }, [todo, reset]);

  const onSubmit = async (data: EditForm) => {
    try {
      await updateTodo({
        id: id!,
        title: data.title,
        description: data.description || undefined,
      }).unwrap();
      navigate('/todos');
    } catch {
      toaster.create({
        title: t('common.error'),
        description: t('todos.error.save'),
        type: 'error',
        duration: 5000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id!).unwrap();
      navigate('/todos');
    } catch {
      toaster.create({
        title: t('common.error'),
        description: t('todos.error.delete'),
        type: 'error',
        duration: 5000,
      });
    }
  };

  const handleToggleComplete = async () => {
    try {
      if (todo?.completed) {
        await incompleteTodo(id!).unwrap();
      } else {
        await completeTodo(id!).unwrap();
      }
    } catch {
      toaster.create({
        title: t('common.error'),
        description: t('todos.error.status'),
        type: 'error',
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <Box minHeight="100vh" bg="#F1F2F6">
        <Header />
        <Center py={16}>
          <Spinner color="#0F62FE" size="lg" />
        </Center>
      </Box>
    );
  }

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
          <Flex justify="space-between" align="center" mb={8}>
            <HStack gap={3}>
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
                {todo?.title ?? ''}
              </Text>
            </HStack>
            <button
              type="button"
              onClick={handleToggleComplete}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <Box
                width="24px"
                height="24px"
                borderRadius="50%"
                border="2px solid"
                borderColor={todo?.completed ? '#0F62FE' : '#CAD1DE'}
                bg={todo?.completed ? '#0F62FE' : 'transparent'}
              />
            </button>
          </Flex>

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
                  {t('todos.edit.task_name')}
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
                  {t('todos.edit.description')}
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
                <HStack gap={2}>
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
                    {t('todos.edit.discard')}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    color="#B71C1C"
                    fontSize="text.base"
                    fontWeight="text.alternative"
                    bg="transparent"
                    _hover={{bg: '#FDE8E8'}}
                    onClick={handleDelete}
                  >
                    {t('common.delete')}
                  </Button>
                </HStack>
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
                  loading={isUpdating}
                >
                  {t('todos.edit.submit')}
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
