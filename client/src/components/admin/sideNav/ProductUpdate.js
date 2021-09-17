import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductUpdateForm from "../forms/ProductUpdateForm";
import FileUpload from "../forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: [
    "Black",
    "Brown",
    "White",
    "Blue",
    "Red",
    "Pink",
    "Green",
    "Orange",
    "Cyan",
    "Peach",
    "Violet",
    "Nude",
  ],
  brands: [
    "Roche Bobois",
    "Edra",
    "FENDI CASA",
    "Joybird",
    "IKEA",
    "Daiso",
    "La-Z-Boy",
  ],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    const loadSignleProduct = () => {
      getProduct(slug)
        .then((p) => {
          setValues({ ...values, ...p.data });

          getCategorySubs(p.data.category._id).then((res) => {
            setSubOptions(res.data);
          });
          let arr = [];
          p.data.subs.map((s) => arr.push(s._id));
          console.log("Arr", arr);
          setArrayOfSubs((prev) => arr);
        })
        .catch();
    };
    loadSignleProduct();
    loadCategories();
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug)
      .then((p) => {
        setValues({ ...values, ...p.data });

        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data);
        });
        let arr = [];
        p.data.subs.map((s) => arr.push(s._id));
        console.log("Arr", arr);
        setArrayOfSubs((prev) => arr);
      })
      .catch();
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);

    setSelectedCategory(e.target.value);

    setValues({ ...values, subs: [] });
    getCategorySubs(e.target.value).then((res) => {
      console.log("Subs options on category click", res);
      setSubOptions(res.data);
    });

    if (values.category._id === e.target.value) {
      loadProduct();
    }

    setArrayOfSubs([]);
  };

  return (
    <div className="container">
      <div>
        <Row justify="center">
          <Col span={24} className="text-center mb-4">
            <AdminNav />
          </Col>
        </Row>

        <div className="col-md-12">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <>
              <h4 className="text-center my-4">Product Update</h4>
              <hr />
            </>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            setSubOptions={setSubOptions}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
