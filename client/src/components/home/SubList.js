import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import { Button } from "antd";
import LoadingButton from "../product/cards/LoadingButton";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div key={s._id} className="col text-center mb-3">
        <Link to={`/sub/${s.slug}`}>
          <Button type="dashed" size="large" block>
            {s.name}
          </Button>
        </Link>
      </div>
    ));

  return (
    <div>
      <div className="row">
        {loading ? <LoadingButton count={4} /> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
