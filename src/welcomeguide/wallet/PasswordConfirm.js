import React from "react";
import styled from "styled-components";
import Step from "../Step";
import { Link } from "react-router-dom";
import CheckCircle from "../../icons/CheckCircle";
import CrossCircle from "../../icons/CrossCircle";
import crypto from "crypto";

const NewButton = styled.button`
  width: 192px;
  height: 95px;
  border-radius: 4px;
  background-color: #00b8dc;
  color: #fff;
  border: none;
  height: 78px;
  font-size: 27px;
  font-weight: 400;
  line-height: 33.78px;
`;

const DisabledButton = styled.button`
  width: 192px;
  height: 95px;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #2f363d;
  border: none;
  height: 78px;
  font-size: 27px;
  font-weight: 400;
  line-height: 33.78px;
`;

const PasswordField = styled.input`
  width: 600px;
  height: 78px;
  border-radius: 4px;
  background-color: #ffffff;
  color: #9ba8ab;
  font-family: "Avenir Next";
  font-size: 28px;
  font-style: italic;
  line-height: 78px;
  padding-left: 40px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-right: 30px;
`;

const PasswordHelper = styled.div`
  display: flex;
  margin-left: 190px;
  margin-top: 30px;
`;

const Tip = styled.span`
  color: #506f89;
  font-size: 16px;
  font-style: italic;
  margin-left: 11px;
  margin-right: 30px;
`;

const PasswordHint = styled.div`
  color: #506f89;
  font-size: 20px;
  font-style: italic;
  line-height: 30px;
  margin-top: 30px;
`;

const checkLength = pass => pass.length >= 8;

const checkUpperLowerCase = pass => /[a-z]+/.test(pass) && /[A-Z]+/.test(pass);

const checkForSpecial = pass =>
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass);

const checkedOrNot = (func, pass) =>
  func(pass) ? (
    <CheckCircle width="24px" height="24px" />
  ) : (
    <CrossCircle width="24px" height="24px" />
  );

export default class ConfirmPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirm: "", ...props.history.location.state };
  }

  updateConfirm(e) {
    this.setState({ confirm: e.target.value });
  }

  render() {
    const fullfillsRequirements =
      crypto
        .createHash("sha256")
        .update(this.state.confirm)
        .digest("base64") === this.state.password;
    return (
      <Step
        title={"Confirm your password."}
        subtitle={"Enter your password again."}
        small
        history={this.props.history}
      >
        <div>
          <PasswordField
            type="password"
            placeholder="Enter a strong password"
            value={this.state.confirm}
            onChange={this.updateConfirm.bind(this)}
          />
          {fullfillsRequirements ? (
            <Link
              to={{
                pathname: "/buyhelp"
              }}
            >
              <NewButton>Contiune</NewButton>
            </Link>
          ) : (
            <DisabledButton>Contiune</DisabledButton>
          )}
        </div>
        <PasswordHint>
          This password is very important. If you lock your wallet, and you
          forgot your password,<br /> you won’t be able to unlock it, which
          means your funds are locked.
        </PasswordHint>
      </Step>
    );
  }
}
