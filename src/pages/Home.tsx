import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../api/axios";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import axios from "axios";

type HomeProps = {
  onLogout: () => void;
};

const Home: React.FC<HomeProps> = ({ onLogout }) => {
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
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          localStorage.removeItem("token");
          onLogout(); // Call logout
        }
      }
    };

    fetchTasks();
  }, [onLogout]);

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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="text-center">To-Do List</h1>
            <Button variant="danger" onClick={onLogout}>
              Sign Out
            </Button>
          </div>

          <Button
            variant="primary"
            className="w-100"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </Button>

          {/* Modal with the form */}
          <TaskModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSave={handleAddTask}
            title="Add New Task"
          >
            <TaskForm task={newTask} setTask={setNewTask} />
          </TaskModal>

          <h2 className="mt-4">Your Tasks</h2>
          <TaskList tasks={tasks} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
