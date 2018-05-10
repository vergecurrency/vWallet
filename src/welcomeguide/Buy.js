import React from "react";
import { TitleBar } from "electron-react-titlebar";
import styled from "styled-components";
import Step from "./Step";
import { Link } from "react-router-dom";
import { shell } from "electron";

const NewButton = styled.button`
  border-radius: 4px;
  background-color: #00b8dc;
  box-shadow: none;
  color: #fff;
  border: none;
  width: 374px;
  height: 78px;
  font-size: 27px;
  font-weight: 400;
  line-height: 33.78px;
  margin-right: 50px;
`;

const RestoreButton = styled.button`
  border-radius: 4px;
  border: 3px solid #ffffff;
  background-color: transparent;
  box-shadow: none;
  color: #fff;
  width: 374px;
  height: 78px;
  font-size: 27px;
  font-weight: 400;
  line-height: 33.78px;
`;

const LinkInfo = styled.div`
  color: #456884;
  font-size: 19px;
  font-weight: 400;
  line-height: 33.78px;
  padding-right: 402px;
`;

export default props => {
  return (
    <Step
      title={"Buy and deposit XVG"}
      subtitle={"See our `Get Started` guide on how to get coins."}
      history={props.history}
      small
    >
      <div>
        <NewButton
          onClick={() =>
            shell.openExternal("https://vergecurrency.com/get-started/")
          }
        >
          Open the Guide
        </NewButton>

        <Link to="/finalize">
          <RestoreButton>Continue</RestoreButton>
        </Link>
        <LinkInfo>Opens a new link in your browser</LinkInfo>
      </div>
    </Step>
  );
};
