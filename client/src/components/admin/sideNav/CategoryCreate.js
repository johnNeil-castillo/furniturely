import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/admin/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../forms/CategoryForm";
import LocalSearch from "../forms/LocalSearch";
import { Card } from "antd";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // searching filtering
  const [keyword, setKeyword] = useState("");

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <>
              <h4 className="text-center my-4">Create category</h4>{" "}
              <CategoryForm
                handleSubmit={handleSubmit}
                setName={setName}
                name={name}
              />
            </>
          )}

          <Card className="mt-4">
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {categories.filter(searched(keyword)).map((c) => (
              <Card size="small" key={c._id} className="mb-3">
                <b>{c.name}</b>
                <span
                  onClick={() => handleRemove(c.slug)}
                  className="btn btn-sm float-end  "
                >
                  <DeleteOutlined className="text-danger" />
                </span>

                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm float-end  ">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </Card>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
