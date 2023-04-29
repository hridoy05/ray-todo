import { Box, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";
const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      height="50px"
      backgroundColor="#ED4E31"
      padding="0 20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box fontSize="20px" fontWeight="bold">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button sx={{ color: "#FFE1DC" }}>Task up</Button>
        </Link>
        <Link
          to="/task/create"
          style={{ textDecoration: "none", marginLeft: "2px" }}
        >
          <Button sx={{ color: "#FFE1DC" }} color="primary">
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
          <MenuItem sx={{ color: "#ED4E31" }} value={user.name}>
            {user.name}
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setLogout());
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
