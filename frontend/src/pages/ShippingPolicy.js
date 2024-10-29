import React from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { shipping } from "../data/data";

const ShippingPolicy = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="Shipping Policy" />
      <BreadCrumb title="Shipping Policy" />
      <Box sx={{ padding: "50px" }} className="about-wrapper">
        {shipping.map((p, index) => (
          <div key={index}>
            <h5>{p.title}</h5>
            <p>{p.message ? p.message : ""}</p>
            <ul>
              {p.list
                ? p.list.map((lis, index) => (
                    <li key={`list-${index}`}>{lis}</li>
                  ))
                : ""}
            </ul>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default ShippingPolicy;
