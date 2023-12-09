import { create } from "@/lib/todoActions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const AddTodo = () => {
  return (
    <form action={create} className="">
      <input type="hidden" name="completed" defaultValue={true}/>
      <div className="flex">
       
        <Input
          name="input"
          type="text"
          placeholder="Add Todo..."
        />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default AddTodo;