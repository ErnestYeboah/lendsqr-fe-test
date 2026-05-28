import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import AdminLayout from "./views/AdminLayout";
import UsersPage from "./views/users/UsersPage";
import UserDetailsPage from "./views/users/users_details/UserDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
