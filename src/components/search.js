const Search = () => {
  return (
    <div className="w-[40%] flex flex-row mx-auto my-12 bg-[#ffe6a7] border-2 border-solid border-[#d4a373] rounded-xl">
      {/* Search bar */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 my-auto mx-3 "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        className="w-[100%] p-2 rounded-r-xl outline-none"
        placeholder="Search"
      ></input>
    </div>
  );
};

export default Search;
