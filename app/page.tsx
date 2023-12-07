import Image from 'next/image'
import dbConnect from '@/lib/db-connect'
import TodoModel, { Todo } from '@/lib/todo-model'
import { Checkbox } from '@/components/ui/checkbox'

export default async function Home() {
  await dbConnect()
  const toDos = (await TodoModel.find({}).sort({
    _id: -1,
  })) as Todo[]

  return (
    <main className='flex min-h-screen flex-col items-center justify-evenly p-24'>
      {toDos.map((todo) => {
        return (
          <div className=' flex items-center' key={todo._id}>
            <p className='mr-4' style={todo.completed?{ textDecoration: 'line-through'}:{}}>{todo.title}</p>
            <Checkbox checked={todo.completed} />
          </div>
        )
      })}
    </main>
  )
}
