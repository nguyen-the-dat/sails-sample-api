import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState({
    title: "",
    body: "",
    summary: "",
    tags: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`http://localhost:1338/articles/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        setErrorMessage("Không thể tải thông tin bài viết");
        console.error("Error:", error);
      }
    }
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:1338/articles/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(article),
        }
      );

      if (response.ok) {
        navigate("/articles/list");
      } else {
        setErrorMessage("Cập nhật bài viết thất bại");
      }
    } catch (error) {
      setErrorMessage("Đã xảy ra lỗi khi kết nối với server");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Article</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Body</label>
          <textarea
            id="body"
            name="body"
            value={article.body}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={article.summary}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="Tags">Tag</label>
          <textarea
            id="tags"
            name="tags"
            value={article.tags}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={article.status}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditArticle;
