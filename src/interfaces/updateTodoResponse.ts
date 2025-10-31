export interface UpdateTodoResponse {
  message: string
  data: Todo
}

export interface Todo {
  id: string
  description: string
  completed: boolean
  createAt: Date
  updateAt: Date
}
