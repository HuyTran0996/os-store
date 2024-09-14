import React from "react";

import "../styles/TermAndConditions.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const TermAndConditions = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="Term And Conditions" />
      <BreadCrumb title="Term And Conditions" />
      <Container class1="policy-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermAndConditions;
