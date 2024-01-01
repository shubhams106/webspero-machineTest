import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Logout, NotificationsActive, ViewWeek } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import axios from "axios";
import { useEffect } from "react";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

const Navbar = (props) => {
  const { onNavOpen } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickProfile = () => {
    navigate(`/profile/${localStorage.getItem("userId")}`);
  };
  const logOutUser = () => {
    dispatch(clearUser());

    toast.success("logout sucessfully");
    navigate("/login");
  };

  const user = useSelector((state) => state?.user);

  // const Lggeduser = async () => {
  //   const response = await axios.get(
  //     `http://localhost:5000/api/users/${userId}`
  //   );
  //   console.log(response, "response from get userApi");
  // };

  // useEffect(() => {
  //   Lggeduser();
  // }, []);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!true && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <ViewWeek />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Home">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Home
              </Typography>
            </Tooltip>
            <Tooltip title="Name">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {user?.name}
              </Typography>
            </Tooltip>
            <Tooltip title="Email">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {user?.email}
              </Typography>
            </Tooltip>
            <Tooltip title="phone">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {user?.phone}
              </Typography>
            </Tooltip>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Get nearBy Friends">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate("/nearest-users")}
              >
                Get nearBy Friends
              </Typography>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={logOutUser}>
                <SvgIcon fontSize="small">
                  <Logout />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Avatar
              title="Edit Profile"
              onClick={onClickProfile}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
export default Navbar;
