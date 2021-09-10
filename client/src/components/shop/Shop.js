import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../../functions/product";
import { getCategories } from "../../functions/category";
import { getSubs } from "../../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../product/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio, Col } from "antd";
import Star from "./Star";

const { SubMenu } = Menu;

const Shop = () => {
  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Restoration Hardware",
    "Roche Bobois",
    "Edra",
    "Poliform",
    "Christopher Guy",
    "Kartell",
    "Baker",
    "BRABBU",
    "Boca do Lobo",
    "FENDI CASA",
    "Joybird",
    "IKEA",
    "Daiso",
    "La-Z-Boy",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "White",
    "Blue",
    "Red",
    "Pink",
    "Green",
    "Orange",
    "Cyan",
    "Yellow Green",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  useEffect(() => {
    loadAllProducts();

    getCategories().then((res) => setCategories(res.data));

    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok, price]);

  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    if (!categoryIds.includes(e._id)) {
      loadAllProducts();
    }

    setCategoryIds(inTheState);

    fetchProducts({ category: inTheState });
    console.log(inTheState);
  };

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setCategoryIds([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="p-2 mb-2"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div>
      <div className="p-1 m-1">
        <Star starClick={handleStarClick} numberOfStars={5} />
      </div>
      <div className="p-1 m-1">
        <Star starClick={handleStarClick} numberOfStars={4} />
      </div>
      <div className="p-1 m-1">
        <Star starClick={handleStarClick} numberOfStars={3} />
      </div>
      <div className="p-1 m-1">
        <Star starClick={handleStarClick} numberOfStars={2} />
      </div>
      <div className="p-1 m-1">
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    </div>
  );

  const showSubs = () => {
    return subs.map((s) => (
      <div
        key={s._id}
        className="p-1 m-1 badge bg-secondary "
        onClick={() => handleSub(s)}
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));
  };

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  const showBrands = () =>
    brands.map((b) => (
      <Col>
        <Radio
          key={b}
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          className="p-2"
        >
          {b}
        </Radio>
      </Col>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <Col>
        <Radio
          key={c}
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className="p-2"
        >
          {c}
        </Radio>
      </Col>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  const showShipping = () => {
    return (
      <>
        <div className="text-center">
          <Checkbox
            className="pb-2 pl-4 pr-4"
            onChange={handleShippingChange}
            value="Yes"
            checked={shipping === "Yes"}
          >
            Yes
          </Checkbox>
          <Checkbox
            className="pb-2 pl-4 pr-4"
            onChange={handleShippingChange}
            value="No"
            checked={shipping === "No"}
          >
            No
          </Checkbox>
        </div>
      </>
    );
  };

  const handleShippingChange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 pt-2">
          <h6>Filter</h6>
          <Menu mode="inline">
            <SubMenu key="1" title={<span className="h6">Price</span>}>
              <Slider
                step={100}
                tipFormatter={(v) => `$${v}`}
                range
                value={price}
                onChange={handleSlider}
                max="4999"
              />
            </SubMenu>

            <SubMenu key="2" title={<span className="h6">Categories</span>}>
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            <SubMenu key="3" title={<span className="h6">Rating</span>}>
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            <SubMenu key="4" title={<span className="h6">Sub Categories</span>}>
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            <SubMenu key="5" title={<span className="h6 ">Brands</span>}>
              <div style={{ maringTop: "-10px" }} className="pr-4 float-start">
                {showBrands()}
              </div>
            </SubMenu>

            <SubMenu key="6" title={<span className="h6">Colors</span>}>
              <div style={{ maringTop: "-10px" }} className="pr-4">
                {showColors()}
              </div>
            </SubMenu>

            <SubMenu key="7" title={<span className="h6">Shipping</span>}>
              <div style={{ maringTop: "-10px" }} className="pr-4">
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-lg-10 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h5 className="text-danger">Products</h5>
          )}
          {products.length < 1 && <p>No Products found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
