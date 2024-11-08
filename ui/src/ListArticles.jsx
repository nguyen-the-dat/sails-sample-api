// function ListArticles() {
//   return (
//     <div>
//       <h2>View Articles</h2>
//       <p>This is the page where you can view all articles.</p>
//       {/* Thêm danh sách các bài viết hoặc các component liên quan */}
//     </div>
//   );
// }

// export default ListArticles;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ListArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Hàm fetch dữ liệu từ API
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("http://localhost:1338/articles"); // Đường dẫn API của bạn
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    }

    fetchArticles();
  }, []);

  // Hàm xử lý khi nhấn nút "Delete"
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:1338/articles/delete/${id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setArticles(articles.filter((article) => article.id !== id));
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div>
      <h1 className="display-4">Articles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>
                <button
                  onClick={() => navigate(`/articles/edit/${article.id}`)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="btn btn-danger ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListArticles;
