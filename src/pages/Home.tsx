import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

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
          onLogout();
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

  const handleUpdateTask = async () => {
    if (!selectedTask) return;
    try {
      const response = await api.put(`/tasks/${selectedTask.id}`, selectedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id ? response.data : task
        )
      );
      setSelectedTask(null);
      setShowEditModal(false); // Close the edit modal
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId && task.id !== taskId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Task
              </Button>
            </Col>
          </Row>

          {/* Modal to add a new task */}
          <TaskModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSave={handleAddTask}
            title="Create New Task"
            type="create"
          >
            <TaskForm task={newTask} setTask={setNewTask} type="create" />
          </TaskModal>

          {/* Modal to edit the selected task */}
          {selectedTask && (
            <TaskModal
              show={showEditModal}
              handleClose={() => {
                setShowEditModal(false);
                setSelectedTask(null);
              }}
              handleSave={handleUpdateTask}
              title="Edit Task"
              type="edit"
            >
              <TaskForm
                task={selectedTask}
                setTask={setSelectedTask}
                type="edit"
              />
            </TaskModal>
          )}

          <h2 className="mt-4">Your Tasks</h2>
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onTaskClick={(task) => {
                setSelectedTask(task);
                setShowEditModal(true);
              }}
              onDeleteTask={handleDeleteTask}
            />
          ) : (
            <p>No tasks to show</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
