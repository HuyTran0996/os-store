import React from "react";
import { Box } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import "../styles/TermAndConditions.scss";
import { faq } from "../data/data";

const Faq = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="Frequently Asked Questions" />
      <BreadCrumb title="Frequently Asked Questions" />
      <Box sx={{ padding: "50px" }} className="about-wrapper">
        {faq.map((p, index) => (
          <div key={index}>
            <h5>{p.title}</h5>
            <p>{p.message ? p.message : ""}</p>
            <ul>
              {p.list
                ? p.list.map((lis, index) => (
                    <li key={`list-${index}`}>
                      <p>question:{lis.question}</p>
                      <p>answer:{lis.answer}</p>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default Faq;
