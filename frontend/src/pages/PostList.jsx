import { useEffect, useState } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");

  // Decode token safely to get logged-in user id
  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);
      } catch (err) {
        console.error("Token decode failed:", err);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      // Added a try-catch block for better error handling
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
        // You might want to set an error state here to show in the UI
      }
    };
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        alert("✅ Post deleted");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-tight text-center">
          All Posts
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 p-6 rounded-xl shadow-2xl flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:shadow-purple-500/20"
              >
                {/* Post content */}
                <div>
                  <h2 className="text-2xl font-bold text-purple-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 mt-3 mb-4">{post.description}</p>
                  <p className="text-2xl font-bold text-sky-400">
                    ₹{post.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Posted by: {post.postedBy?.name || "Unknown"}
                  </p>
                </div>

                {/* Delete button container */}
                <div className="mt-6">
                  {userId &&
                    (post.postedBy?._id === userId ||
                      post.postedBy === userId) && (
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-4 py-2 rounded-lg text-base hover:from-red-700 hover:to-orange-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                      >
                        Delete
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostList;
