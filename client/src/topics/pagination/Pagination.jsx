import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Pagination() {
  const { pageId = 1 } = useParams();
  // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(pageId);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // navigate(`${page}`);
    const fecthData = async () => {
      setLoader(true);
      const response = await fetch(
        `http://localhost:3000/api/data?page=${page}`
      );
      const { data, totalPages } = await response.json();
      setData((prev) => [...prev, ...data]);
      setTotalPages(totalPages);
      setLoader(false);
    };
    fecthData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return !loader ? (
    <InfinitePagination data={data} page={page} setPage={setPage} />
  ) : (
    <div>loading...</div>
  );
}

export default Pagination;

const ActionControlPagination = ({
  data,
  page,
  setPage,
  totalPages = { totalPages },
}) => {
  return (
    <div>
      {data &&
        data.slice(page, page + 3).map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.user}</h2>
              <h3>{item.postTitle}</h3>
              <h4>{item.tags}</h4>
            </div>
          );
        })}
      <div>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
};

const InfinitePagination = ({ data, page, setPage, totalPages }) => {
  return (
    <div>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.user}</h1>
              <h1>{item.postTitle}</h1>
              <h1>{item.tags}</h1>
            </div>
          );
        })}
      {page < totalPages && <div>Loading more items</div>}
    </div>
  );
};
