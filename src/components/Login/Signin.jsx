import React, { useState } from "react";
import "../../index.css";
import PageHeader from "../../components/page-header/PageHeader";
import { SignUp } from "../../api/localHost";
import { Link, useHistory } from "react-router-dom";
export default function LoginFrom() {
  const intializer = { username: "", email: "", password: "" };
  const [details, setDetails] = useState(intializer);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    await SignUp(details);
    if (localStorage.getItem("login")) {
      history.push("/home");
      //window.location.reload();
    }
    setDetails({ ...intializer });
  };
  return (
    <>
      <PageHeader />

      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Sign Up</h2>
          {/* {error != "" ? <div className="error">{error}</div> : ""} */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="Forminput"
              id="name"
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              value={details.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="Forminput"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="Forminput"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <input type="submit" value="SIGNUP" />
          </div>
        </div>
      </form>
    </>
  );
}
