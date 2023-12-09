import { create } from '@/lib/todoActions'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const AddTodo = () => {
  return (
    <form
      action={create}
      className='w-full'
    >
      <input
        type='hidden'
        name='completed'
      />
      <div className='flex items-center'>
        <Input
          name='input'
          type='text'
          placeholder='Add Todo...'
        />
        <Button type='submit' size={'lg'}>Add</Button>
      </div>
    </form>
  )
}

export default AddTodo
