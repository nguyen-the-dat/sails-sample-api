import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import SignIn from "./Signin";
import SignUp from "./Signup";
import Home from "./Home";
import ListArticles from "./ListArticles";
import AddArticle from "./AddArticle";
import { useState } from "react";
import EditArticle from "./EditArticle";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/list" element={<ListArticles />} />
        <Route path="/articles/add" element={<AddArticle />} />
        <Route
          path="/signin"
          element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/articles/edit/:id" element={<EditArticle />} />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
