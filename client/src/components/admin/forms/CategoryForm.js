import React from "react";

const CategoryForm = ({ handleSubmit, setName, name }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group mt-3">
      <label className="my-2">Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-primary">Save</button>
    </div>
  </form>
);

export default CategoryForm;
