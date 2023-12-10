import mongoose from 'mongoose'

export type Todo = {
  _id: string
  title: string
  completed: boolean
}

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const TodoModel = mongoose.models.Tasks || mongoose.model('Tasks', todoSchema)
export default TodoModel
