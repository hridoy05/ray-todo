import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../services/api";
import { setTask } from "../redux/TaskSlice";
import { Box, Container } from "@mui/system";
import Header from "../components/Header";
import Taskform from "../components/Taskform";
const Task = () => {
  const { id } = useParams();
  const [currentTask, setCurrentTask] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchTask() {
      await axios
        .get(`/api/v1/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCurrentTask(res.data.task);
          dispatch(setTask(res.data.task));
        });
    }
    fetchTask();
  }, [id, dispatch, token]);

  if (!currentTask) {
    return;
  }
  return (
    <Box>
      <Header />
      <Container>
        <Taskform task={currentTask} />
      </Container>
    </Box>
  );
};
export default Task;
