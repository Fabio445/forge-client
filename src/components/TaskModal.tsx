import React from "react";
import { Modal, Button } from "react-bootstrap";

interface TaskModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave?: () => void;
  title: string;
  children: React.ReactNode;
  type?: "create" | "edit" | "delete" | "view";
}

const TaskModal: React.FC<TaskModalProps> = ({
  show,
  handleClose,
  handleSave,
  title,
  children,
  type = "edit",
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {type === "delete" ? "Cancel" : "Cancel"}
        </Button>
        {type === "create" && handleSave && (
          <Button variant="success" onClick={handleSave}>
            Create Task
          </Button>
        )}
        {type === "edit" && handleSave && (
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        )}
        {type === "delete" && handleSave && (
          <Button variant="danger" onClick={handleSave}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
