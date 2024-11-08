import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="display-4">Welcome To ArticleBase</h1>
      <p className="mb-4">This is a Sails.js app for managing articles</p>
      <Link to="/articles/list" className="btn btn-light">
        View Articles
      </Link>
      <Link to="/articles/add" className="btn btn-light">
        Add Article
      </Link>
    </div>
  );
}

export default Home;
