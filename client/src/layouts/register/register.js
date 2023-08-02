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
import PersonIcon from "@mui/icons-material/Person";
import signUpImg from "../../assets/svg/signUpImg.svg";
// import LoginAuthButton from '../Components/loginOauth';
// import { useGoogleLogin } from "@react-oauth/google";
// import google from '../../assets/images/google.svg';
// import { logIn } from '../../Api/Api';
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { setUserData } from '../../redux/slices/userSlice';
import { useDispatch } from "react-redux";
// import Cookies from 'js-cookie';
// import useMakeToast from '../../hooks/makeToast';

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
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
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
const Register = () => {
  // const navigate = useNavigate();
  // const makeToast = useMakeToast();
  const theme = useTheme();
  // const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const show = () => {
    setShowPass(!showPass);
  };
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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
                Sign Up
              </Typography>

              <Typography fontSize="15px" fontWeight={500} mb={0.7}>
                First Name
              </Typography>
              <CustomTextField
                autoComplete="off"
                id="emailField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon
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
                placeholder="John Wick"
                name="firstName"
                onChange={handleChange}
                value={userInfo?.firstName}
              />

              <Typography fontSize="15px" fontWeight={500} mb={0.7}>
                Last Name
              </Typography>
              <CustomTextField
                autoComplete="off"
                id="emailField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon
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
                placeholder="John Wick"
                name="lastName"
                onChange={handleChange}
                value={userInfo?.lastName}
              />

              <Typography fontSize="15px" fontWeight={500} mb={0.7}>
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
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={userInfo?.email}
              />

              <Typography fontSize="15px" fontWeight={500} mb={0.7} mt={2.5}>
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

              <Typography fontSize="15px" fontWeight={500} mb={0.7} mt={2.5}>
                Repeat Password
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
                placeholder="repeatPassword"
                name="repeatPassword"
                onChange={handleChange}
                value={userInfo?.repeatPassword}
                type={showPass ? "text" : "password"}
              />

              {/* <Typography
                fontWeight={500}
                color="#000"
                textAlign="right"
                mt={1}
              >
                Forgot Password?
              </Typography> */}

              <Button
                sx={{
                  width: "100%",
                  bgcolor: "#6C6C6C",
                  color: "#fff",
                  py: 1,
                  mt: 3,
                  textTransform: "capitalize",

                  "&:hover": {
                    bgcolor: "#6C6C6C",
                  },
                }}
                // onClick={handleSubmit}
                id="pressLogin"
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
                // onClick={() => navigate("/register")}
              >
                Already Have an Account
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
              <img src={signUpImg} alt="" style={{ width: "100%" }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;
