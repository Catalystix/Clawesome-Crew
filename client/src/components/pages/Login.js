import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { Segment, Grid, Card, Button, Divider, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

import Auth from "../../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Segment raised bordered>
          <Card.Header style={{fontSize: '20px'}}>Login</Card.Header>
          <Divider />
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </Form.Field>
              <Button style={{ backgroundColor: "#45a29e" }} type="submit" primary fluid>
                Submit
              </Button>
            </Form>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
