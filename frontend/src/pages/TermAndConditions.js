import React from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import "../styles/TermAndConditions.scss";
import { termsAndConditions } from "../data/data";

const TermAndConditions = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="Term And Conditions" />
      <BreadCrumb title="Term And Conditions" />
      <Box sx={{ padding: "50px" }} className="about-wrapper">
        {termsAndConditions.map((p, index) => (
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

export default TermAndConditions;
