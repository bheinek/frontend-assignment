export interface Todo {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId: string;
}

export interface TodoListResponse {
  todos: Todo[];
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}
