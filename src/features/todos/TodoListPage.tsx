import {useRef, useState} from 'react';
import {Box, Button, Center, Flex, HStack, Image, Spinner, Text, VStack} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useGetMeQuery} from '../auth/authApi';
import {
  useListTodosQuery,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useIncompleteTodoMutation,
  Todo,
} from './todoApi';
import {formatDate} from '../shared/utils/formatDate';
import {toaster} from '../../components/Toaster';
import logo from '../../assets/logo.svg';
import iconMore from '../../assets/icons/icon-more.svg';
import iconEdit from '../../assets/icons/icon-edit.svg';
import iconDelete from '../../assets/icons/icon-delete.svg';

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

function EmptyState() {
  return (
    <Center flexDirection="column" py={16}>
      <Image src={logo} alt="Zentask" height="64px" mb={6} opacity={0.4} />
      <Text fontSize="heading.3" fontWeight="heading.2" color="#001141" mb={2}>
        You are amazing!
      </Text>
      <Text fontSize="text.base" color="#4D5667">
        There is no more task to do.
      </Text>
    </Center>
  );
}

function KebabMenu({todoId, onDelete}: {todoId: string; onDelete: () => void}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Box position="relative" ref={menuRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image src={iconMore} alt="Actions" width="20px" height="20px" />
      </button>

      {open && (
        <>
          <Box
            position="fixed"
            inset={0}
            zIndex={9}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
          <Box
            position="absolute"
            right={0}
            top="100%"
            bg="white"
            borderRadius="8px"
            boxShadow="md"
            border="1px solid #CAD1DE"
            py={1}
            zIndex={10}
            minWidth="120px"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                navigate(`/todos/${todoId}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                width: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#001141',
              }}
            >
              <Image src={iconEdit} alt="" width="16px" height="16px" />
              Edit
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                width: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#B71C1C',
              }}
            >
              <Image src={iconDelete} alt="" width="16px" height="16px" />
              Delete
            </button>
          </Box>
        </>
      )}
    </Box>
  );
}

function TodoItem({todo}: {todo: Todo}) {
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const [incompleteTodo] = useIncompleteTodoMutation();

  const handleToggle = async () => {
    try {
      if (todo.completed) {
        await incompleteTodo(todo.id).unwrap();
      } else {
        await completeTodo(todo.id).unwrap();
      }
    } catch {
      toaster.create({
        title: 'Error',
        description: 'Failed to update task',
        type: 'error',
        duration: 5000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id).unwrap();
    } catch {
      toaster.create({
        title: 'Error',
        description: 'Failed to delete task',
        type: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Flex align="flex-start" gap={3} py={3}>
      <button
        type="button"
        onClick={handleToggle}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        <Box
          width="24px"
          height="24px"
          borderRadius="50%"
          border="2px solid"
          borderColor={todo.completed ? '#0F62FE' : '#CAD1DE'}
          bg={todo.completed ? '#0F62FE' : 'transparent'}
        />
      </button>
      <Box flex={1} minWidth={0}>
        <Text fontSize="heading.3" fontWeight="heading.3" color="#001141">
          {todo.title}
        </Text>
        {!todo.completed && todo.description && (
          <Text fontSize="text.base" color="#4D5667" truncate>
            {todo.description}
          </Text>
        )}
      </Box>
      <KebabMenu todoId={todo.id} onDelete={handleDelete} />
    </Flex>
  );
}

export function TodoListPage() {
  const {data: user} = useGetMeQuery();
  const {data: todos, isLoading} = useListTodosQuery();

  const incompleteTodos = todos?.filter((t) => !t.completed) ?? [];
  const completedTodos = todos?.filter((t) => t.completed) ?? [];
  const isEmpty = todos && todos.length === 0;

  return (
    <Box minHeight="100vh" bg="#F1F2F6">
      <Header />

      <Box maxWidth="800px" mx="auto" px={6} pb={8}>
        <Box bg="white" borderRadius="16px" p={8} boxShadow="sm">
          <Flex justify="space-between" align="flex-start" mb={6}>
            <Box>
              <Text fontSize="heading.1" fontWeight="heading.1" color="#001141">
                Hello {user?.username ?? ''}!
              </Text>
              <Text fontSize="text.base" color="#4D5667">
                {formatDate(new Date())}
              </Text>
            </Box>
            <Button
              asChild
              height="36px"
              px={4}
              borderRadius="100px"
              bg="#0F62FE"
              color="white"
              fontSize="text.small"
              fontWeight="text.alternative"
              _hover={{bg: '#0043CE'}}
            >
              <RouterLink to="/todos/new">Add task +</RouterLink>
            </Button>
          </Flex>

          {isLoading && (
            <Center py={16}>
              <Spinner color="#0F62FE" size="lg" />
            </Center>
          )}

          {isEmpty && <EmptyState />}

          {!isLoading && !isEmpty && (
            <VStack align="stretch" gap={0}>
              {incompleteTodos.length > 0 && (
                <Box>
                  <Text fontSize="heading.2" fontWeight="heading.2" color="#001141" mb={2}>
                    To-do
                  </Text>
                  <VStack align="stretch" gap={0} divideY="1px" divideColor="#F1F2F6">
                    {incompleteTodos.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))}
                  </VStack>
                </Box>
              )}

              {completedTodos.length > 0 && (
                <Box mt={incompleteTodos.length > 0 ? 6 : 0}>
                  <Text fontSize="heading.2" fontWeight="heading.2" color="#001141" mb={2}>
                    Completed
                  </Text>
                  <VStack align="stretch" gap={0} divideY="1px" divideColor="#F1F2F6">
                    {completedTodos.map((todo) => (
                      <TodoItem key={todo.id} todo={todo} />
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
