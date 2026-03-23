import {useTranslation} from 'react-i18next';
import {Box, Flex, Text} from '@chakra-ui/react';
import {
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useIncompleteTodoMutation,
} from '../todoApi';
import {toaster} from '@/utils/toaster';
import {KebabMenu} from './KebabMenu';
import type {Todo} from '../types';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({todo}: TodoItemProps) {
  const {t} = useTranslation();
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
        title: t('common.error'),
        description: t('todos.error.update'),
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
        title: t('common.error'),
        description: t('todos.error.delete'),
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
