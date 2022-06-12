import React, { useState } from "react";
import "../../index.css";
import PageHeader from "../../components/page-header/PageHeader";
import { Login } from "../../api/localHost";
import { Link, useHistory } from "react-router-dom";
export default function LoginFrom() {
  const intializer = { email: "", password: "" };
  const [details, setDetails] = useState(intializer);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    await Login(details);

    if (localStorage.getItem("login")) {
      history.push("/home");
      ////window.location.reload();
    }
    setDetails({ ...intializer });
  };

  const style = {
    color: "#000",
    textAlign: "left",
    width: "300px",
    margin: "auto auto 20px auto",
  };
  return (
    <>
      <PageHeader />

      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Login</h2>
          <div style={style}>
            Don't have an account? <Link to="/signup">SignUp</Link>
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
            <input type="submit" value="LOGIN" />
          </div>
        </div>
      </form>
    </>
  );
}
