'use server'

import { revalidatePath } from 'next/cache'
import TodoModel from './todo-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import { redirect } from 'next/navigation'

export async function create(formData: FormData) {
  const todoSchema = z.object({
    title: z.string(),
    completed: z.string(),
  })

  const todoData = todoSchema.parse({
    title: formData.get('input'),
    completed: formData.get('completed'),
  })
  if (!todoData) {
    return { message: 'Form data is not valid' }
  }
  try {
    await dbConnect()
    const todo = new TodoModel(todoData)

    await todo.save()
    revalidatePath('/')
    return { message: `Created todo ${todoData.title}` }
  } catch {
    return { message: 'Failed to create todo' }
  } finally {
  }
}

export async function deleteTodo(formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    title: z.string().min(1),
  })
  const data = schema.parse({
    _id: formData.get('_id'),
    title: formData.get('name'),
  })

  try {
    await dbConnect()
    await TodoModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    console.log({ message: `Deleted Todo ${data.title}` })
    return { message: `Deleted Todo ${data.title}` }
  } catch (e) {
    return { message: 'Failed to delete Todo' }
  }
}

export const checkedTodo = async (formData: FormData) => {
  const newTodoData = {
    _id: formData.get('_id'),
  }

  try {
    await dbConnect()

    const TodoId = await TodoModel.findById({ _id: newTodoData._id })

    if (!TodoId) throw new Error('Todo not found')

    console.log(newTodoData._id)

    const filter = await TodoModel.findOne(TodoId)

    await TodoModel.updateOne({ _id: TodoId }, { completed: !filter.completed })
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    throw err
  } finally {
  }
}

export const updateTodo = async (formData: FormData) => {
  const userSchema = z.object({
    _id: z.string().min(1),
    title: z.string(),
  })

  const newTodoData = userSchema.parse({
    _id: formData.get('id'),
    title: formData.get('input'),
  })
  console.log(newTodoData.title)

  try {
    await dbConnect()

    let TodoId = await TodoModel.findById({ _id: newTodoData._id })

    if (!TodoId) throw new Error('Todo not found')

    await TodoModel.updateOne({ _id: TodoId }, newTodoData)
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    throw err
  } finally {
    redirect('/')
  }
}
