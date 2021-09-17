import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { Button, Row, Col } from "antd";
import LoadingButton from "../product/cards/LoadingButton";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id} className=" col text-center mb-2">
        <Link to={`/category/${c.slug}`}>
          <Button type="dashed" size="large" block>
            {c.name}
          </Button>
        </Link>
      </div>
    ));

  return (
    <div>
      <div className="row">
        {loading ? (
          <>
            <LoadingButton count={4} />
          </>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
