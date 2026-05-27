import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import AdminLayout from "./views/AdminLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
