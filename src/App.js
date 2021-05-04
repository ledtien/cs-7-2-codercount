import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const state = useSelector((state) => state);
  const { count, boxColors } = useSelector((state) => state);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch({ type: "SIGN_IN", payload: email });
  };

  function onChangeBoxColor(e, idx) {
    if (!idx) {
      dispatch({ type: "CHANGE_COLOR", payload: e.target.value });
    } else {
      dispatch({ type: "CHANGE_COLOR_BOX", idx, payload: e.target.value });
    }
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">CoderCount</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          {currentUser ? (
            <Button
              type="submit"
              variant="outline-danger"
              onClick={() => dispatch({ type: "SIGN_OUT" })}
            >
              Sign-out {currentUser}?
            </Button>
          ) : (
            <Form inline>
              <FormControl
                type="text"
                placeholder="Email"
                className="mr-sm-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline-success"
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>

      <div className="App">
        <div className="bg-secondary">
          <h1>Total input: {count}</h1>
          <input
            onChange={(e) =>
              dispatch({ type: "CHANGE_COLOR", payload: e.target.value })
            }
          ></input>
          <button
            className="m-2"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            Increment
          </button>
          <button onClick={() => dispatch({ type: "DECREMENT" })}>
            Decrement
          </button>
        </div>
        {Array.from(Array(state.count)).map((c, idx) => {
          const boxColor = boxColors[idx] || state.defaultColor;
          return (
            <div
              className="box border p-4 m-1 d-flex justify-content-between"
              style={{ backgroundColor: boxColor, fontSize: 20 }}
              key={idx + 1}
            >
              Box {idx + 1}
              <input onChange={(e) => onChangeBoxColor(e, idx)}></input>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
