import React from "react";
import axios from "axios";
const page = async () => {
  const fetchData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    } catch (error) {
      console.log("error occur", error);
    }
  };

  const allData = await fetchData();

  return (
    <div>
      {allData.map((item:any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default page;
