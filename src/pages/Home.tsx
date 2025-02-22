import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import api from "../api/axios";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await api.post("/tasks", newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setShowModal(false);
      setNewTask({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h1 className="text-center">To-Do List</h1>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </Button>

          {/* Modal per aggiungere task */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Completed</Form.Label>
                  <Form.Select
                    value={newTask.completed.toString()} // Convertiamo il booleano in stringa per il select
                    onChange={
                      (e) =>
                        setNewTask({
                          ...newTask,
                          completed: e.target.value === "true",
                        }) // Convertiamo la stringa in booleano
                    }
                  >
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddTask}>
                Add Task
              </Button>
            </Modal.Footer>
          </Modal>

          <h2 className="mt-4">Your Tasks</h2>
          <ul>
            {tasks.map((task: any) => (
              <li key={task.id}>
                <strong>{task.title}</strong>: {task.description}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
