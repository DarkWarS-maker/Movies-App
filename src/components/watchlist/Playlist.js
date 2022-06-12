import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import {
  ChangePublicAvailibility,
  getPublicWatchlists,
  getWatchlists,
} from "../../api/localHost";
import { SwiperSlide, Swiper } from "swiper/react";
import { Switch } from "antd";
import PageHeader from "../page-header/PageHeader";
import MovieCard from "../movie-card/MovieCard";

function Playlist() {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const history = useHistory();
  const [list, setList] = useState();
  const { name } = useParams();
  const share = useQuery();

  useLayoutEffect(() => {
    console.log("first");
    if (share.get("share") === "true") getPublicWatchlists({ watchlist: name });
    else getWatchlists();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("second");
      if (localStorage.getItem("Publicwatchlist"))
        setList(JSON.parse(localStorage.getItem("Publicwatchlist")));

      if (localStorage.getItem("watchlist"))
        setList(
          JSON.parse(localStorage.getItem("watchlist")).filter(
            (e) => e._id === name
          )[0]?.watchlist
        );
    }, 5000);
  }, []);

  const changeStatus = () => {
    ChangePublicAvailibility({ watchlist: name });
    if (share.get("share") === "true") history.push({ search: "share=false" });
    else history.push({ search: "share=true" });
  };

  return (
    <>
      <PageHeader />

      <div>WatchList</div>
      <div>
        <Switch
          checkedChildren="Public"
          unCheckedChildren="Private"
          defaultChecked={share.get("share") === "true"}
          onChange={() => changeStatus()}
        />
      </div>
      <div className="movie-grid">
        {list && console.log(list)}
        {list &&
          list.map((e, i) => (
            <SwiperSlide key={i}>
              <MovieCard
                item={e}
                category={e.category ? e.category : "movie"}
              />
            </SwiperSlide>
          ))}
      </div>
    </>
  );
}

export default Playlist;
