import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";
import TaskOne from "./components/TaskOne";
import TaskTwo from "./components/TaskTwo";

function App() {
  const [taskTwo, setTaskTwo] = useState(false);
  return (
    <div className="wrapper">
      <Header />
      <div className="container border-b">
        <h1 className="title">Broadway Gaming Test</h1>
        <button
          className="btn"
          onClick={() => setTaskTwo((prev: boolean) => !prev)}
        >
          Go to Task {taskTwo ? "1" : "2"}
        </button>
      </div>

      <main>{taskTwo ? <TaskTwo /> : <TaskOne />}</main>
      <Footer />
    </div>
  );
}

export default App;
