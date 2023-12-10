import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Metadata } from 'next'
import { updateTodo } from '@/lib/todoActions'
import dbConnect from '@/lib/db-connect'
import TodoModel, { Todo } from '@/lib/todo-model'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Update Todo',
}

const Update = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  await dbConnect()
  const todo = await TodoModel.findById(id)
  return (
    <form
      action={updateTodo}
      className='p-24 max-sm:px-2  flex flex-col justify-evenly '
    >
      <input
        type='hidden'
        name='id'
        value={id}
      />

      <div className='flex flex-col items-center'>
        <div className='text-3xl font-extrabold uppercase mb-6'>
          Update ToDo
        </div>
        <div className='w-full flex items-center justify-between  p-2 '>
          <Input
            name='input'
            type='text'
            placeholder='Add Todo...'
            defaultValue={todo.title}
          />
          <Button
            type='submit'
            size={'lg'}
            className='text-xl'
          >
            Update
          </Button>
        </div>
        <div className='mt-10'>
          <Link
            className='bg-violet-500 text-white hover:bg-violet-400 px-6  py-4 rounded-lg  text-xl'
            href='/'
          >
            Close
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Update
