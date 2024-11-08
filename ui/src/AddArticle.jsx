import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Khai báo và sử dụng useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      body,
      summary,
      tags,
      status,
    };

    try {
      const response = await fetch("http://localhost:1338/articles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      // Kiểm tra xem phản hồi có phải là JSON không
      const contentType = response.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        // Nếu là JSON, parse dữ liệu
        data = await response.json();
      } else {
        // Nếu không phải JSON, xử lý dưới dạng chuỗi
        data = await response.text();
      }

      if (response.ok) {
        // Nếu thành công, chuyển hướng đến trang danh sách bài viết
        navigate("/articles/list");
      } else {
        // Nếu có lỗi, hiển thị thông báo lỗi
        setErrorMessage(data.message || "Đã xảy ra lỗi khi thêm bài viết");
      }
    } catch (error) {
      // Nếu có lỗi trong quá trình gọi API
      setErrorMessage("Đã xảy ra lỗi khi kết nối với server");
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Summary:</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Tags:</label>
          <textarea value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <br />
        <div>
          <label for="status">Status</label>
          <select name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
