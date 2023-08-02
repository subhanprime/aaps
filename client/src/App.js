import "./App.css";
import Headers from "./components/headers";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/login/login";
import Register from "./layouts/register/register";
import LandingPage from "./layouts/landingPage/landingPage";
import CheckHeader from "./components/checkHeader";
import CheckAuth from "./components/checkAuth";
import UserPage from "./layouts/userPage/userPage";
import PostPage from "./layouts/Post/postPage";
import ReportPage from "./layouts/reports/reportPage";
import CreateBlog from "./layouts/termsConditions/termsConditions";
import PrivacyPolicy from "./layouts/privacyPolicy/privacyPolicy";
import UserReportPage from "./layouts/userReport/userReports";
import VerifiedDocs from "./layouts/verifyDocs/verifiedDocs";
function App() {
  return (
    <div>
      {/* <Headers /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<CheckAuth />}>
          <Route element={<CheckHeader />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/termsConditions" element={<CreateBlog />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/userReport" element={<UserReportPage />} />
            <Route path="/verified-docs" element={<VerifiedDocs />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
