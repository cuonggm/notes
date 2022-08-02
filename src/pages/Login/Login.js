import { Button, Col, Form, Input, Row } from "antd";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/authSlice";
import "./Login.module.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = (event) => {
    event.preventDefault();
  };

  const onSignIn = (event) => {
    event.preventDefault();
    dispatch(loginThunk(username, password));
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          {auth.isLoggedIn && <h1>Logged in</h1>}
          {!auth.isLoggedIn && <h1>Logged out</h1>}
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ height: "70%" }}>
        <Col align="center">
          <Form
            name="loginForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            style={{ width: "400px" }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Username can not be empty." },
              ]}
            >
              <Input onChange={onUsernameChange} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password can not be empty." },
              ]}
            >
              <Input.Password onChange={onPasswordChange} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={onSignIn}
              >
                Login
              </Button>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="secondary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={onSignUp}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Login;
