import React from "react";
import TaskDetail from "./TaskDetail";
import { Task } from "../interface/task.interface";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks found. Add some tasks!</p>;
  }

  return (
    <ul className="list-group mt-3">
      {tasks.map((task) => (
        <TaskDetail key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
