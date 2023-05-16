import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import { doLogin } from "../auth";
import Base from "../components/Base";
import { loginUser } from "../services/user-service";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({ ...loginDetail, [field]: actualValue });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(loginDetail);

    // validation
    if (
      loginDetail.password.trim() === "" ||
      loginDetail.username.trim() === ""
    ) {
      toast.warning("Credentials are required to login user.");
      return;
    }

    // submit the date to server to generate JWT token
    loginUser(loginDetail)
      .then((data) => {
        // console.log(data);

        // save the data to localStorage
        doLogin(data, () => {
          console.log("Login detailed saved in localStorage...");

          // redirect to user dashboard page

          // return <Navigate to={"/user/dashboard"} />
          navigate("/user/dashboard");
        });
        toast.success("Login Success!", {
          position: "bottom-center",
        });
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 400 ||
          (error.response.status === 404 &&
            error.response.data.message !== null)
        ) {
          toast.error(error.response.data.message, {
            position: "bottom-center",
          });
        } else if (error.response.data == undefined) {
          toast.error("Server problem occured. Apology for inconvinience", {
            position: "bottom-center",
          });
        } else {
          toast.error("Invalid credentials", {
            position: "bottom-center",
          });
        }
      });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Row>
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card inverse color="dark">
              <CardHeader>
                <h3 className="text-center">Login to BlogApp</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Enter Email ID</Label>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Ex. adam@net.com etc."
                      value={loginDetail.username}
                      onChange={(e) => {
                        handleChange(e, "username");
                      }}
                    />
                  </FormGroup>

                  {/* Passsword field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter here"
                      value={loginDetail.password}
                      onChange={(e) => {
                        handleChange(e, "password");
                      }}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="light" outline type="submit">
                      Login
                    </Button>
                    <Button type="reset" className="ms-2" onClick={handleReset}>
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
