import {apiSlice} from '../../app/api';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId: string;
}

interface TodoListResponse {
  todos: Todo[];
}

interface CreateTodoRequest {
  title: string;
  description?: string;
}

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listTodos: builder.query<Todo[], void>({
      query: () => '/api/todo/list',
      transformResponse: (response: TodoListResponse) => response.todos,
      providesTags: ['Todo'],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (body) => ({
        url: '/api/todo',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {useListTodosQuery, useCreateTodoMutation} = todoApi;
