import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWatchlists } from "../../api/localHost";
import PageHeader from "../page-header/PageHeader";

function WatchList() {
  const [list, setList] = useState();

  useLayoutEffect(() => {
    getWatchlists();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("watchlist"))
        setList(JSON.parse(localStorage.getItem("watchlist")));

      console.log(list);
    }, 5000);
  }, []);

  const style = {
    width: "300px",
    padding: "25px",
    background: "#ffd770",
    textAlign: "center",
    borderRadius: "10px",
    margin: "auto auto 20px auto",
    fontSize: "20px",
    cursor: "pointer",
  };

  return (
    <>
      <PageHeader />

      <div>WatchList</div>
      <div>
        {list &&
          list.map((e) => (
            <Link to={`/watchlist/${e._id}?share=${e.isPublic}`}>
              <div style={style}>
                <p>{e.name}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default WatchList;
