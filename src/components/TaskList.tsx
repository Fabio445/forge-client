import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Task } from "../interface/task.interface";
import TaskModal from "./TaskModal";

type TaskListProps = {
  tasks: Task[];
  onTaskClick: (task: any) => void;
  onDeleteTask: (taskId: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskClick,
  onDeleteTask,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Open the confirmation modal
  const handleConfirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
    setShowConfirm(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowConfirm(false);
  };

  return (
    <>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            className="d-flex justify-content-between align-items-center"
            onClick={() => onTaskClick(task)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <p>Status: {task.completed ? "Completed" : "Pending"}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleConfirmDelete(task);
              }}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Confirmation modal */}
      {taskToDelete && (
        <TaskModal
          show={showConfirm}
          handleClose={cancelDelete}
          handleSave={confirmDelete}
          title="Confirm Deletion"
          type="delete"
        >
          <p>
            Are you sure you want to delete the task{" "}
            <strong>{taskToDelete.title}</strong>?
          </p>
        </TaskModal>
      )}
    </>
  );
};

export default TaskList;
