'use client'

import { checkedTodo } from '@/lib/todoActions'

export default function CheckedTodo({
  _id,

  label,
}: {
  _id: string

  label: string
}) {
  return (
    <form
      action={async (formData) => {
        const res = await checkedTodo(formData)
      }}
    >
      <input
        type='hidden'
        name='_id'
        value={_id}
      />

      <button
        type='submit'
        className='max-lg:text-xl text-2xl btn btn-ghost'
      >
        {label}
      </button>
    </form>
  )
}
