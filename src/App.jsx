import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// const fetchToDos = async ({ queryKey: [url] }) => {
// try {
//   const data = await axios.get(
//     "https://jsonplaceholder.typicfode.com/" + url
//   );
//   return data;
// } catch (error) {
//   console.log(error.message);
//   throw new Error(error.message);
// }
// }
function App() {
  const [page, setPage] = useState(1);
  const { data, error } = useQuery(["todos", { _limit: 10, _page: page }]);

  console.log(data);

  return (
    <div className="App">
      {error && error.message}
      <ul>
        {data?.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
      <button onClick={() => setPage((prev) => prev + 1)}></button>
    </div>
  );
}

export default App;
