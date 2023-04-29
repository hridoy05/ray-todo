import {
  Card,
  Box,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
const Task = ({ task, handleDelete }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {task.date.split("T")[0]}
            </Typography>
            <Typography sx={{ p: 0 }}>{task.type}</Typography>
            <Chip label={task.status} size="small" variant="outlined" />
            <Box sx={{ margin: "4px" }}>
              <Link style={{ textDecoration: "none" }} to={`/task/${task._id}`}>
                <Button variant="outlined">Edit</Button>
              </Link>

              <Button
                sx={{ marginLeft: "3px" }}
                variant="outlined"
                color="error"
                onClick={() => {
                  handleDelete(task._id);
                }}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
export default Task;
