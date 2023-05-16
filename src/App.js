import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="bg-[#faedcd] h-screen font-poltawski flex flex-col text-2xl">
      {/* Title */}
      <h1 className="font-bold text-4xl mx-auto my-12 h-fit"> Ze Compedium </h1>

      {/* Search and About buttons */}
      <div id="section-switch" className="flex flex-row mx-auto">
        <Link
          to="search"
          className="mx-7 px-7 border-2 border-solid border-[#d4a373] rounded-xl bg-[#ffe6a7] shadow-md transition-colors hover:bg-[#fefae0] delay-0 duration-500 ease-in-out"
        >
          Search
        </Link>
        <Link
          to="about"
          className="mx-7 px-7 border-2 border-solid border-[#d4a373]  rounded-xl bg-[#ffe6a7] shadow-md"
        >
          About
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
