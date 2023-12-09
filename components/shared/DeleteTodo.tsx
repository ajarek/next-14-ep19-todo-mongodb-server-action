'use client'

import { deleteTodo } from '@/lib/todoActions'

export default function DeleteTodo({
  _id,
  title,
}: {
  _id: string
  title: string
}) {
  return (
    <form
      action={async (formData) => {
        const res = await deleteTodo(formData)
        console.log(res.message)
      }}
    >
      <input
        type='hidden'
        name='_id'
        value={_id}
      />
      <input
        type='hidden'
        name='name'
        value={title}
      />
      <button
        type='submit'
        className='max-lg:text-xl text-2xl btn btn-ghost'
      >
        🗑️
      </button>
    </form>
  )
}