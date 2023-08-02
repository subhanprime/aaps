import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import {
  EmailOutlined,
  CheckCircle,
  Visibility,
  HttpsOutlined,
  VisibilityOff,
} from "@mui/icons-material";
import LoginImg from "../../assets/svg/LoginImg.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../api/api";

import { setUserData } from "../../redux/slices/userSlice";
import Cookies from "js-cookie";

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  fontFamily: "Roboto",
  fontWeight: "400",
  borderRadius: "10px",

  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
      boxShadow: "0 0 2px rgba(0,0,0,0.4)",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
      boxShadow: "0 0 2px rgba(0,0,0,0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
      boxShadow: "0 0 2px rgba(0,0,0,0.4)",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme.palette.background.primary,
    },
    color: theme.palette.background.primary,
    fontSize: "15px",
    height: "13px",
  },
  background: theme.palette.background.medium,
}));
const Login = () => {
  const navigate = useNavigate();
  // const makeToast = useMakeToast();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const show = () => {
    setShowPass(!showPass);
  };
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    console.log("userIfo", userInfo);
    const response = await login(userInfo);
    if (response?.data?.success === true) {
      console.log("response", response?.data);
      dispatch(setUserData(response?.data?.user));
      Cookies.set("access-token-ref", response?.data?.token);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        // backgroundImage: `url(${sign2})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "100% ",
        height: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          mt={6}
          mb={1}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
          spacing={5}
        >
          <Grid item xs={12} sm={7} md={5}>
            <Box
              sx={{
                bgcolor: `${theme.palette.background.hard}`,
                p: { xs: 2, md: 3 },
                borderRadius: "20px",
                boxShadow: "0px 0px 7px #ddd",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, mb: 2 }}>
                Get started
              </Typography>
              <Typography fontWeight={700} mb={0.7}>
                Email
              </Typography>

              <CustomTextField
                autoComplete="off"
                id="emailField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        sx={{ color: "#0A6EBD", cursor: "pointer" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start" sx={{ margin: "5px" }}>
                      <CheckCircle
                        sx={{ color: "#969696", cursor: "pointer" }}
                      />
                    </InputAdornment>
                  ),
                }}
                required={true}
                placeholder="Username/Email"
                name="email"
                onChange={handleChange}
                value={userInfo?.email}
              />

              <Typography fontWeight={700} mb={0.7} mt={2.5}>
                Password
              </Typography>

              <CustomTextField
                autoComplete="off"
                id="passwordField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HttpsOutlined sx={{ color: "#0A6EBD" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      onMouseDown={show}
                      sx={{ margin: "5px" }}
                    >
                      {!showPass ? (
                        <Visibility
                          sx={{ color: "#969696", cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityOff
                          sx={{ color: "#969696", cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                required={true}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={userInfo?.password}
                type={showPass ? "text" : "password"}
              />

              <Typography
                fontWeight={500}
                color="#000"
                textAlign="right"
                mt={1}
              >
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  width: "100%",
                  background:
                    "linear-gradient(180deg, #EB3A18 54.69%, #EB3A18 100%)",
                  color: "#fff",
                  py: 1,
                  mt: 3,
                  textTransform: "capitalize",

                  "&:hover": {
                    background:
                      "linear-gradient(180deg, #EB3A18 54.69%, #FF7D64 100%)",
                  },
                }}
                id="pressLogin"
                onClick={loginHandler}
              >
                Login
              </Button>
              <Button
                sx={{
                  width: "100%",
                  bgcolor: "#0A6EBD",
                  color: "#fff",
                  py: 1,
                  mt: 2,
                  mb: 5,
                  textTransform: "capitalize",
                  "&:hover": {
                    bgcolor: "#0A6EBD",
                  },
                }}
              >
                Create New Account
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <img src={LoginImg} alt="" style={{ width: "100%" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
