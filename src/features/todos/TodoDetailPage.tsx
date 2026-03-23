import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate, useParams} from 'react-router-dom';
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
import {toaster} from '../../components/Toaster';
import {
  useGetTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useIncompleteTodoMutation,
} from './todoApi';
import {useGetMeQuery} from '../auth/authApi';
import logo from '../../assets/logo.svg';
import iconBackwards from '../../assets/icons/icon-backwards.svg';

const schema = yup.object({
  title: yup.string().required('This field is mandatory.'),
  description: yup.string().defined().default(''),
});

type EditForm = yup.InferType<typeof schema>;

function Header() {
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
      <Image src={logo} alt="Zentask" height="24px" />
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
          <Text fontSize="text.small" fontWeight="text.alternative" color="#001141">
            {user.username}
          </Text>
        </HStack>
      )}
    </Flex>
  );
}

export function TodoDetailPage() {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const {data: todo, isLoading} = useGetTodoQuery(id!);
  const [updateTodo, {isLoading: isUpdating}] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const [incompleteTodo] = useIncompleteTodoMutation();

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
        title: 'Error',
        description: 'Failed to save changes',
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
        title: 'Error',
        description: 'Failed to delete task',
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
        title: 'Error',
        description: 'Failed to update task status',
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

      <Box maxWidth="800px" mx="auto" px={6} pb={8}>
        <Box bg="white" borderRadius="16px" p={8} boxShadow="sm">
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
                <Image src={iconBackwards} alt="Back" width="16px" height="16px" />
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
                  Task name
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
                  Description (Optional)
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
                    Discard changes
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
                    Delete
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
                  Save changes &nbsp;✓
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
