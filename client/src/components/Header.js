import {
  Box,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";
import { toast } from "react-toastify";
const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      height="50px"
      backgroundColor="#242B54"
      padding="0 20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box fontSize="20px">
        <Link to="/home" style={{ textDecoration: "none", color: "#fff" }}>
          Task up
        </Link>
        <Link
          to="/task/create"
          style={{ textDecoration: "none", marginLeft: "2px" }}
        >
          <Button sx={{ color: "#fff" }} color="primary">
            Task create
          </Button>
        </Link>
      </Box>
      <Box display="flex" alignItems="center" gap="10px">
        <Select
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          value={user.name}
        >
          <MenuItem value={user.name}>
            <Box color="#fff">{user.name}</Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setLogout());
              toast.success("logout sucessfully");
              navigate("/");
            }}
          >
            Logout
          </MenuItem>
        </Select>
      </Box>
    </Box>
  );
};
export default Header;
