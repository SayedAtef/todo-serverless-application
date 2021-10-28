import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'
import { parseUserId } from '../auth/utils'

const s3BucketName = process.env.S3_BUCKET_NAME
const todosAccess = new TodosAccess()

export async function getTodos(jwtToken: string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken)
  return todosAccess.getTodos(userId)
}

export function createTodo(
  createTodoRequest: CreateTodoRequest,
  id: string
): Promise<TodoItem> {
  const userId = id
  const todoId = uuid.v4()
  return todosAccess.createTodo({
    userId,
    todoId,
    createdAt: new Date().getTime().toString(),
    done: false,
    attachmentUrl: `https://${s3BucketName}.s3.us-east-2.amazonaws.com/${todoId}`,
    ...createTodoRequest
  })
}

export function updateTodo(
  updateTodoRequest: UpdateTodoRequest,
  todoId: string,
  jwtToken: string
): Promise<TodoUpdate> {
  const userId = parseUserId(jwtToken)
  return todosAccess.updateTodo(updateTodoRequest, todoId, userId)
}

export function deleteTodo(todoId: string, jwtToken: string): Promise<string> {
  const userId = parseUserId(jwtToken)
  return todosAccess.deleteTodo(todoId, userId)
}

export function generateUploadUrl(todoId: string): Promise<string> {
  return todosAccess.generateUploadUrl(todoId)
}
