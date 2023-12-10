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
    <main className='flex min-h-screen flex-col items-center justify-start p-24 max-sm:px-4'>
      <span className='text-3xl font-extrabold uppercase'>To-do-app</span>
      <h1 className=' text-3xl font-extrabold uppercase mb-5 text-center'>
        Next.js 14
        <span className='text-violet-500 ml-2'>Server Actions</span>
      </h1>
      <div className='flex justify-center flex-col items-center max-w-[1000px] gap-4 '>
        <AddTodo />
        {toDos.map((todo) => {
          return (
            <div
              className='w-full flex items-center justify-between  p-2 border border-violet-500 rounded-lg'
              key={todo._id}
            >
              <div className='flex items-center'>
                <CheckedTodo
                  _id={todo._id.toString()}
                  label={todo.completed ? '☑️' : '🟪'}
                />
                <p
                  className='mx-4'
                  style={
                    todo.completed ? { textDecoration: 'line-through' } : {}
                  }
                >
                  {todo.title}
                </p>
              </div>
              <div className='flex items-center'>
                <Link
                  className='text-2xl mr-4'
                  href={`/update/${todo._id}`}
                >
                  🖊️
                </Link>
                <DeleteTodo
                  _id={todo._id.toString()}
                  title={todo.title}
                />
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
