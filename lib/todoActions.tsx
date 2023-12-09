"use server";
import { revalidatePath } from "next/cache";
import TodoModel from './todo-model'
import dbConnect from './db-connect'
import { z } from 'zod'

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

export async function deleteProduct(formData: FormData) {
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
    console.log({ message: `Deleted product ${data.title}` })
    return { message: `Deleted product ${data.title}` }
  } catch (e) {
    return { message: 'Failed to delete product' }
  }
}

export const checkedTodo = async (formData: FormData ) => {
 

  const newProductData = {
    _id: formData.get('_id'),
    
    
  }
  
  
  try {
    await dbConnect()
    
   const productId = await TodoModel.findById({ _id: newProductData._id })

    if (!productId) throw new Error('product not found')

    console.log(newProductData.completed);
    
  const filter=await TodoModel.findOne(productId)
    
    await TodoModel.updateOne({ _id:productId },{completed:!filter.completed})
    revalidatePath('/')
    return { success: true }
  } catch (err) {
    throw err
  }
  finally {
   
  }
}
