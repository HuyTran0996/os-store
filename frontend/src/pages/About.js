import React from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import "../styles/TermAndConditions.scss";
import { about } from "../data/data";

const About = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="About Us" />
      <BreadCrumb title="About Us" />
      <Box sx={{ padding: "50px" }} className="about-wrapper">
        {about.map((p, index) => (
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

export default About;
