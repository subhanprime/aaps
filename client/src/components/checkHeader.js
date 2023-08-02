import { Outlet } from "react-router-dom";
import Headers from "./headers";
import { Box } from "@mui/material";
const CheckHeader = () => {
  return (
    <>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "#F5F5F5" }}
      >
        <Box p={1}>
          <Headers />
        </Box>
        <Box
          p={1}
          sx={{
            height: "100vh",
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default CheckHeader;
