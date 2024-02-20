import type {} from '@redux-devtools/extension' // required for devtools typing
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const colors = ['#63CFFD', '#FF9447', '#FD6363', '#6FFAC0', '#AC6FFe'] as const

export interface Todo {
  id: number
  title: string
  content: string
  completed: boolean
  color: (typeof colors)[number]
}

interface State {
  todoList: Record<Todo['id'], Todo>
  addTodo: (data: Pick<Todo, 'title' | 'color'>) => Todo
  toggleTodo: (data: Pick<Todo, 'id'>) => Todo
  removeTodo: (data: Pick<Todo, 'id'>) => Todo['id']
}

export const useTodoListStore = create<State>()(
  devtools(
    persist(
      immer((set, get) => ({
        todoList: {},
        addTodo: (data) => {
          const newTodo = {
            ...data,
            id: Date.now(),
            content: '',
            completed: false,
          }
          set((state) => {
            state.todoList[newTodo.id] = newTodo
          })
          return newTodo
        },
        toggleTodo: ({ id }) => {
          set((state) => {
            state.todoList[id].completed = !state.todoList[id].completed
          })
          return get().todoList[id]
        },
        removeTodo: ({ id }) => {
          set((state) => {
            delete state.todoList[id]
          })
          return id
        },
      })),
      {
        name: 'todo-list',
      },
    ),
  ),
)
