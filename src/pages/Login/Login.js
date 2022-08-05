import { Button, Col, Form, Input, Row } from "antd";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/authSlice";
import styles from "./Login.module.css";

const Login = (props) => {
  const dispatch = useDispatch();

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
      <Row justify="center">
        <Col>
          <h1 className={styles.title}>Login</h1>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Form
            className={styles.form}
            name="loginForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            autoComplete="off"
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
                span: 24,
              }}
            >
              <Button
                block={true}
                type="primary"
                htmlType="submit"
                onClick={onSignIn}
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Button
                block={true}
                type="secondary"
                htmlType="submit"
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
