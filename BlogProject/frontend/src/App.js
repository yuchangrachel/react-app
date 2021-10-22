import "./index.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandPage from "./pages/LandPage/LandPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyDiary from "./pages/MyDiary/MyDiary";
import CreateDiary from "./pages/CreateDiary/CreateDiary";
import UpdateDiary from "./pages/CreateDiary/UpdateDiary";

import UserList from "./pages/AdminPage/UserList";
import CreateUser from "./pages/AdminPage/CreateUser";
import UpdateUser from "./pages/AdminPage/UpdateUser";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" component={LandPage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />

        <Route path="/mydiaries" component={MyDiary} />
        <Route path="/creatediary" component={CreateDiary} />
        <Route path="/diary/:id" component={UpdateDiary} />

        <Route path="/admin/userlist" component={UserList} />
        <Route path="/admin/create" component={CreateUser} />
        <Route path="/admin/update/:id" component={UpdateUser} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
