import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

const Paginate = (data) => {
  const location = useLocation();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  const basePath = location.pathname.split("?")[0];

  const handleChangeFilter = (e, p) => {
    navigate(`${basePath}?page=${p}`);
  };
  const limit = process.env.REACT_APP_LIMIT_PAGINATION;
  return (
    <Pagination
      count={Math.ceil(data?.data.total / limit || 1)}
      color="primary"
      onChange={handleChangeFilter}
      page={page}
    />
  );
};

export default Paginate;
