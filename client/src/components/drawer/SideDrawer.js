import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import sampleImage from "../../images/SampleImage.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "200px",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      closable={false}
      onClose={() => {
        dispatch({ type: "SET_VISIBLE", payload: false });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div className="row" key={p._id}>
          <div className="col">
            {p.images[0] ? (
              <>
                <img alt="sample" src={p.images[0].url} style={imageStyle} />
                <p className="text-center">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                {" "}
                <img alt="sample" src={sampleImage} style={imageStyle} />
                <p className="text-center">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to="/cart">
        <button
          style={{ backgroundColor: "#515af6", color: "white" }}
          onClick={() => dispatch({ type: "SET_VISIBLE", payload: false })}
          className="text-center btn btn-block"
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
