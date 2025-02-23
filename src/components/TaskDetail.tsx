import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { Task } from "../interface/task.interface";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-start"
      variant={task.completed ? "success" : "light"}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{task.title}</div>
        <small>{task.description}</small>
      </div>

      {/* Badge for priority */}
      <Badge
        bg={
          task.priority === "high"
            ? "danger"
            : task.priority === "medium"
            ? "warning"
            : "secondary"
        }
        pill
      >
        {task.priority}
      </Badge>

      {/* Badge for completion status */}
      <Badge
        bg={task.completed ? "success" : "secondary"}
        pill
        className="ms-2"
      >
        {task.completed ? "Done" : "Pending"}
      </Badge>
    </ListGroup.Item>
  );
};

export default TaskItem;
