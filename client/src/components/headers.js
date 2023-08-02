import { Box, Typography } from "@mui/material";
import logo from "../assets/svg/logo.png";
import { NavLink } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ReportIcon from "@mui/icons-material/Report";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import GavelIcon from "@mui/icons-material/Gavel";
import PolicyIcon from "@mui/icons-material/Policy";
import VerifiedIcon from "@mui/icons-material/Verified";
const Headers = () => {
  const [shortNav, setShortNav] = useState(false);

  if (!shortNav) {
    return (
      <>
        <Box
          sx={{
            height: "100%",
            minWidth: "80px",
            background: "#69C3F9",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            borderRadius: "7px",
          }}
        >
          <Box p={1}>
            <NavLink to="/">
              <img src={logo} width="60px" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => setShortNav(true)}
          >
            {/* <NavLink
              to="/user"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#F24C3D" : "#fff",
              })}
              >
              </NavLink> */}
            <MenuIcon fontSize="large" />
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/user"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <PersonIcon fontSize="large" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/post"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <WysiwygIcon fontSize="large" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/report"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <ReportIcon fontSize="large" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/userReport"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <PersonOffIcon fontSize="large" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/termsConditions"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <GavelIcon fontSize="large" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/privacyPolicy"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <PolicyIcon fontSize="large" />
            </NavLink>
          </Box>

          <Box
            mb={1}
            sx={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <NavLink
              to="/verified-docs"
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#EB3A18" : "#fff",
                // background: isActive ? "#7600dc" : "#f0f0f0",
                // width: "100%",
                // display
              })}
            >
              <VerifiedIcon fontSize="large" />
            </NavLink>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        py={2}
        px={1.5}
        sx={{
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          height: "100%",
          minWidth: "250px",
          background: "#69C3F9",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
          borderRadius: "7px",
        }}
      >
        <Box
          sx={{
            // backgroundColor: "#0A6EBD",
            height: "70px",
            color: "white",
            // display: "flex",
            // flexDirection:"column",
            // justifyContent: "center",
            // alignItems: "center",
            width: "100%",
            maxWidth: "1400px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "95%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // alignItems: "center",
            }}
          >
            <Box>
              <Box
                mb={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <NavLink to="/">
                  <img src={logo} width="100px" />
                </NavLink>
                <Box>
                  <Typography
                    onClick={() => setShortNav(false)}
                    sx={{ cursor: "pointer" }}
                  >
                    <MenuOpenIcon fontSize="large" />
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box
                  sx={
                    {
                      // border:"1px solid red"
                    }
                  }
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    <NavLink
                      to="/user"
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#EB3A18" : "#fff",
                        // background: isActive ? "#7600dc" : "#f0f0f0",
                        width: "100%",
                      })}
                    >
                      User
                    </NavLink>
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  <NavLink
                    to="/post"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#EB3A18" : "#fff",
                      // background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Post
                  </NavLink>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  <NavLink
                    to="/report"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#EB3A18" : "#fff",
                      // background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Reported Posts
                  </NavLink>
                </Typography>

                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  <NavLink
                    to="/userReport"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#EB3A18" : "#fff",
                      // background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Reported User
                  </NavLink>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  <NavLink
                    to="/termsConditions"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#EB3A18" : "#fff",
                      // background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Terms & Conditions
                  </NavLink>
                </Typography>

                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  <NavLink
                    to="/privacyPolicy"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#EB3A18" : "#fff",
                      // background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Privacy Policy
                  </NavLink>
                </Typography>

                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  <NavLink
                    to="/verified-docs"
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#EB3A18" : "#fff",
                      // background: isActive ? "#7600dc" : "#f0f0f0",
                    })}
                  >
                    Verify Document
                  </NavLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Headers;
