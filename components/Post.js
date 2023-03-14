import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  HeartIcon,
  PaperAirplaneIcon,
  EllipsisHorizontalIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption, location }) {
  const [showMore, setShowMore] = useState(false);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendToComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white border rounded-sm my-7">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 p-1 border mr-3"
        />
        <div className="flex-1">
          <p className="font-bold">{username}</p>
          <p className=" text-sm">{location}</p>
        </div>

        <EllipsisHorizontalIcon className="h-5" />
      </div>
      <img src={img} alt="" className="object-cover w-full" />
      {session && (
        <div className="flex justify-between px-4 pt-4 ">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatBubbleOvalLeftIcon className="btn -rotate-90" />
            <PaperAirplaneIcon className="btn  -rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="p-5">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username} </span>
        {showMore ? caption : caption?.substring(0, 150)}
        {caption?.length > 150 && (
          <button
            className="ml-1  cursor-pointer font-serif  px-1 rounded-lg"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        )}
      </p>
      {/* comments  functionality */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3 ">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className=" text-sm flex-1">
                <span className=" mr-1 font-bold">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-sm">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex p-4   items-center">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comment..."
            className="flex-1 border-none focus:ring-0 outline-none"
          />
          <button
            onClick={sendToComment}
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold  text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
