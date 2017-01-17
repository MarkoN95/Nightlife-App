const React = require("react");
const { connect } = require("react-redux");
const { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button } = require("react-bootstrap");
const actions = require("../actions/register");
const Api = require("../request");

const Register = React.createClass({
  propTypes: {
    fullName: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    submit: React.PropTypes.object.isRequired,
    update: React.PropTypes.func.isRequired,
    register: React.PropTypes.func.isRequired
  },
  render: function() {
    let submit = this.props.submit;
    return (
      <Grid fluid>
        <Row>
          <Col md={4} sm={8} xs={10} mdOffset={4} smOffset={2} xsOffset={1}>
            <h3 className="text-center login-title">Register with email</h3>
            <Form onSubmit={this.props.register}>
              <FormGroup>
                <ControlLabel className="label-red">Full Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="eg. Bob Ross"
                  value={this.props.fullName}
                  onChange={this.props.update.bind(this, "fullName")}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="label-red">Email</ControlLabel>
                <FormControl
                  type="email"
                  placeholder="bobross@painting.com"
                  value={this.props.email}
                  onChange={this.props.update.bind(this, "email")}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="label-red">Password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="password"
                  value={this.props.password}
                  onChange={this.props.update.bind(this, "password")}
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit" className="btn-red" disabled={submit.isPending}>
                  {submit.isPending ? "Loading..." : "Sign Up"}
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    fullName: state.register.fullName,
    email: state.register.email,
    password: state.register.password,
    submit: state.register.submit
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update: function(field, e) {
      dispatch(actions.updateRegisterInput(field, e.target.value));
    },
    register: function(e) {
      e.preventDefault();
      let info = {
        fullName: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      };
      dispatch(actions.register());
      Api.pretendRegister(info, (err, user) => {
        if(err) {
          return dispatch(actions.registerError(err));
        }
        dispatch(actions.registerSuccess(user));
        ownProps.router.push("/user/" + user.username);
      });
    }
  };
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

module.exports = RegisterContainer;