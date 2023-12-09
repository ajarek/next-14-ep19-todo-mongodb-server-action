import Image from 'next/image'
import dbConnect from '@/lib/db-connect'
import TodoModel, { Todo } from '@/lib/todo-model'
import AddTodo from '@/components/shared/AddTodo'
import DeleteTodo from '@/components/shared/DeleteTodo'
import CheckedTodo from '@/components/shared/CheckedTodo'
import Link from 'next/link'

export default async function Home() {
  await dbConnect()
  const toDos = (await TodoModel.find({}).sort({
    _id: -1,
  })) as Todo[]

  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      <AddTodo/>
      {toDos.map((todo) => {
        return (
          <div className=' flex items-center py-4' key={todo._id}>
            <CheckedTodo  _id={todo._id.toString()}  label={todo.completed?'☑️':'🟪'}/>
            <p className='mx-4' style={todo.completed?{ textDecoration: 'line-through'}:{}}>{todo.title}</p>
            <Link className='text-2xl ' href={`/update/${todo._id}`}>🖊️</Link>
            <DeleteTodo
                  _id={todo._id.toString()}
                  title={todo.title}
                />
          </div>
        )
      })}
    </main>
  )
}
