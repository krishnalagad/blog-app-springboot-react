import React from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { signup } from "../services/user-service";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    // console.log(data);
  }, [data]);

  // handle change
  const handleChange = (event, property) => {
    // dynamically setting the values
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  // submit the form
  const submitForm = (event) => {
    event.preventDefault();

    // if (error.isError) {
    //   toast.error("Form data is invalid, make it correct first !!", {
    //     position: "top-right",
    //   });
    //   setError({...error, isError: false})
    //   return;
    // }

    // data validation

    // sending request to server
    signup(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success log");
        toast.success("User registered successfully. User ID is " + resp.id, {
          position: "bottom-center",
        });
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("Error log");

        toast.error("Failed to register user", {
          position: "bottom-center",
        });
        // toast.error(err.response.data.name, {
        //   position: "bottom-center",
        // });

        setError({
          errors: { err },
          isError: true,
        });
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Row>
          {/* {JSON.stringify(data)} */}
          <Col sm={{ size: 6, offset: 3 }}>
            <Card inverse color="dark">
              <CardHeader className="text-center">
                <h3>Register to BlogApp</h3>
              </CardHeader>
              <CardBody>
                {/* creating form here */}
                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "name")}
                      value={data.name}
                      // invalid = {error.errors?.response?.data?.name ?true:false}
                    />
                    {/* <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback> */}
                  </FormGroup>

                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Enter Email ID</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Enter here."
                      onChange={(event) => handleChange(event, "email")}
                      value={data.email}
                    />
                  </FormGroup>

                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter here"
                      onChange={(event) => handleChange(event, "password")}
                      value={data.password}
                    />
                  </FormGroup>

                  {/* About field */}
                  <FormGroup>
                    <Label for="about">Enter Description</Label>
                    <Input
                      id="about"
                      type="textarea"
                      placeholder="Enter here"
                      style={{ height: "100px" }}
                      onChange={(event) => handleChange(event, "about")}
                      value={data.about}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light" type="submit">
                      Register
                    </Button>
                    <Button onClick={resetData} type="reset" className="ms-2">
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

export default Signup;
