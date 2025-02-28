import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index.js";

// Improved CSS for responsiveness and better styling

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 flex items-center justify-center min-h-screen">
        <Container>
          <div className="flex flex-col items-center text-center p-4">
            <h1 className="text-2xl font-bold text-gray-200 hover:text-gray-400 transition duration-300">
              Login or Signup to Read Posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {posts.map((post) => (
            <div key={post.$id} className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
