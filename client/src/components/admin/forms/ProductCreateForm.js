import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
    subs,
    quantity,
    colors,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="mb-2">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="my-2">Description</label>
        <textarea
          style={{ height: "100px", whiteSpace: "pre-wrap" }}
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <div className="form-group col-md-4">
          <label className="my-2">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-4">
          <label className="my-2">Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option>Please Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-4">
          <label className="my-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-6">
          <label className="my-2">Color</label>
          <select name="color" className="form-control" onChange={handleChange}>
            <option>Please Select</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-md-6">
          <label className="my-2">Brands</label>
          <select name="brand" className="form-control" onChange={handleChange}>
            <option>Please Select</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="my-2">Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option>Please Select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showSub && (
        <div>
          <label className="my-2">Sub Category</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <br />
      <button className="btn btn-info mb-4">Save</button>
    </form>
  );
};

export default ProductCreateForm;
