import React from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { refund } from "../data/data";
import "../styles/TermAndConditions.scss";

const RefundPolicy = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="Refund Policy" />
      <BreadCrumb title="Refund Policy" />
      <Box sx={{ padding: "50px" }} className="about-wrapper">
        {refund.map((p, index) => (
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

export default RefundPolicy;
