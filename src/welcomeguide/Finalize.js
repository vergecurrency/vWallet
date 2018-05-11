import React from "react";
import { TitleBar } from "electron-react-titlebar";
import styled from "styled-components";
import Step from "./Step";
import { Link } from "react-router-dom";
import { shell } from "electron";

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
