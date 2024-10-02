import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";

import { FcLike } from "react-icons/fc";

import Header from "../../component/header/Header";

function Home() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [like, setLike] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/servepost"
      );
     console.log(response)
      setItems((prevItems) => [...prevItems, ...response.data]);
      setLike(Array(response.data.length).fill(0));
      if (response.data.length === 0) setHasMore(false);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, [page]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const randomNumber = (index) => {

    const newLikes = [...like]; 
    newLikes[index] += 1; 
    setLike(newLikes); 
    
  };
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");


  return (
    <>
      <Header />
      <div className="container w-96 mx-auto p-4">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p className="text-center">No more items to load</p>}
        >
          <div className="flex flex-col items-center w-96  gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-1 pb-3 flex flex-col border-b text-lg rounded"
              >
                <Link to={`/api/fullpost/${item._id}`} className="">
                  <small className="text-neutral-700">
                    Author: {item.user}
                  </small>
                 
                  <h1 className="font-bold">{item.header}</h1>
                  
                  <p className="text-neutral-600 text-base leading-tight  pb-3">{item.content}</p>
                  {item.image && (
          <img 
            src={item.image} 
            alt="Post" 
            className=" w-52 h-32 mb-4 rounded" 
          />
        )}
                </Link>
                <div className="flex flex-row">
                  <FcLike className="mt-0.5 ml-1" onClick={() => randomNumber(index)} size={22}></FcLike>

                  <span className="text-m pl-1 text-neutral-800 ">
                    {like[index]}{" "}
                  </span>
                  <AiOutlineComment
                    className="ml-4 mt-0.5"
                    size={21}
                    style={{ marginTop: "4px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Home;
