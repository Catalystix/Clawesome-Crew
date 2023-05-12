import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { Segment, Grid, Image, Card, Button, Divider, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Auth from "../../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <Card fluid raised>
            <Card.Content>
              <Card.Header>Sign Up</Card.Header>
              <Divider />
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Input
                    label="Username"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <Form.Input
                    label="Email"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <Form.Input
                    label="Password"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <Button style={{ backgroundColor: "#45a29e"}} primary fluid type="submit">
                    Submit
                  </Button>
                </Form>
              )}

              {error && (
                <Segment inverted color="red">
                  {error.message}
                </Segment>
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Signup;
