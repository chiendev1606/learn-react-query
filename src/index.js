import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        let hasQueryString = false;
        let endpoint = queryKey.reduce((acc, x) => {
          if (typeof x === "string") {
            acc += "/" + x;
          } else if (typeof x === "object" && x !== null) {
            hasQueryString = true;
            acc += qs.stringify(x);
          } else {
            throw new Error("invalid key");
          }
          return acc;
        }, "");

        if (hasQueryString) {
          endpoint = endpoint.replace(`${queryKey[0]}`, queryKey[0] + "?");
        }

        endpoint = endpoint.substr(1);

        try {
          const { data } = await axios.get(`${BASE_URL}/${endpoint}`);

          return data;
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
