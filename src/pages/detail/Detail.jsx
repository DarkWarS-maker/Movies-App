import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";

import MovieList from "../../components/movie-list/MovieList";
import { Modal } from "antd";
import {
  CreateWatchList,
  getWatchlists,
  PushToWatchList,
} from "../../api/localHost";
import { Radio, Space, Input } from "antd";

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      console.log(response);
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if (localStorage.getItem("login")) setIsModalVisible(true);
    else history.push("/login");
  };

  const handleOk = async () => {
    if (value === 0) {
      await CreateWatchList({
        name: text,
      });

      await PushToWatchList({
        watchlist: localStorage.getItem("tempList"),
        movie: item,
      });
    } else {
      await PushToWatchList({
        watchlist: value,
        movie: { ...item, category },
      });
    }
    setIsModalVisible(false);
    setText("");
    setValue(1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setText("");
    setValue(1);
  };

  const [list, setList] = useState();

  useEffect(() => {
    async function call() {
      await getWatchlists();
    }
    call();
    if (localStorage.getItem("watchlist"))
      setList(JSON.parse(localStorage.getItem("watchlist")));

    console.log(list);
  }, []);

  const [value, setValue] = useState(1);
  const [text, setText] = useState();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const changeText = (e) => {
    console.log(text);
    setText(e.target.value);
  };

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
                <span style= {{cursor: "pointer"}} className="genres__item" onClick={showModal}>
                  Add To Wishlist
                </span>
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
          <Modal
            title="Choose Watchlist"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>
              <Radio.Group onChange={onChange} value={value}>
                {" "}
                <Space direction="vertical">
                  {" "}
                  {list &&
                    list.map((e) => <Radio value={e._id}>{e.name}</Radio>)}
                  <Radio value={0}>
                    <Input
                      type="text"
                      style={{
                        width: 100,
                        marginLeft: 10,
                      }}
                      onChange={changeText}
                    />
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Detail;
