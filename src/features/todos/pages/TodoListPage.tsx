import {useTranslation} from 'react-i18next';
import {Box, Button, Center, Flex, Spinner, Text, VStack} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
import {useGetMeQuery} from '@/features/auth/authApi';
import {useListTodosQuery} from '../todoApi';
import {formatDate} from '@/utils/formatDate';
import {Header} from '../components/Header';
import {EmptyState} from '../components/EmptyState';
import {TodoItem} from '../components/TodoItem';

export function TodoListPage() {
  const {t} = useTranslation();
  const {data: user} = useGetMeQuery();
  const {data: todos, isLoading} = useListTodosQuery();

  const incompleteTodos = todos?.filter((td) => !td.completed) ?? [];
  const completedTodos = todos?.filter((td) => td.completed) ?? [];
  const isEmpty = todos && todos.length === 0;

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
          <Flex
            justify="space-between"
            align={{base: 'stretch', md: 'flex-start'}}
            mb={6}
            direction={{base: 'column', md: 'row'}}
            gap={{base: 3, md: 0}}
          >
            <Box>
              <Text fontSize="heading.1" fontWeight="heading.1" color="#001141">
                {t('todos.greeting', {username: user?.username ?? ''})}
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
              <RouterLink to="/todos/new">{t('todos.add_task')}</RouterLink>
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
                    {t('todos.section.todo')}
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
                    {t('todos.section.completed')}
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
