import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    console.log("SEARCH_QUERY->>>", e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value.trim() },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control  text-center"
        placeholder="Search Here"
      />
    </form>
  );
};

export default Search;
