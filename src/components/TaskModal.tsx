// src/components/TaskModal.tsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

interface TaskModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  title: string;
  children: React.ReactNode;
}

const TaskModal: React.FC<TaskModalProps> = ({
  show,
  handleClose,
  handleSave,
  title,
  children,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
