import React from "react";
import { Form } from "react-bootstrap";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

interface TaskFormProps {
  task: Task;
  setTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, setTask }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: name === "completed" ? value === "true" : value,
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter task title"
          value={task.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          placeholder="Enter task description"
          value={task.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Completed</Form.Label>
        <Form.Select
          name="completed"
          value={task.completed.toString()}
          onChange={handleChange}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default TaskForm;
