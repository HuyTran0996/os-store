import React from "react";

import "../styles/TermAndConditions.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const TermAndConditions = () => {
  return (
    <div className="termAndConditionsPage">
      <Meta title="Term And Conditions" />
      <BreadCrumb title="Term And Conditions" />
      <section className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermAndConditions;
