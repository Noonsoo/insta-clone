import React, { useState, useEffect } from "react";
import Post from "./Post";
import { faker } from "@faker-js/faker";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Posts() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      city: faker.address.city(),
      state: faker.address.state(),
    }));
    setSuggestions(suggestions);
  }, []);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          id={post.id}
        />
      ))}
    </div>
  );
}

export default Posts;
