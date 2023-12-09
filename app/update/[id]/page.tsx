import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Metadata } from 'next'
import { updateTodo } from '@/lib/todoActions'
import dbConnect from '@/lib/db-connect'
import TodoModel, { Todo } from '@/lib/todo-model'

export const metadata: Metadata = {
  title: 'Update Todo',
}

const Update = async ({ params }: { params: { id: string } })=> {
  const { id } = params;  


  await dbConnect()
  const todo = await TodoModel.findById(id)
  return (
    <form
      action={updateTodo}
      className='p-24 max-sm:px-2 max-sm:py-4 flex flex-col justify-evenly gap-4'
    >
      <input
        type='hidden'
        name='id'
        value={id}
      />
      
      
   <div className="flex">
       
   <Input
     name="input"
     type="text"
     placeholder="Add Todo..."
     defaultValue={todo.title}
   />
   <Button type="submit">Update</Button>
 </div>
    </form>
  )
}

export default Update
