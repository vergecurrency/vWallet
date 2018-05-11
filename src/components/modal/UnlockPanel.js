import React from "react";
import { Button, Input, Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import Modal from "../Modal";
import T from "i18n-react";

const Title = styled.p`
  color: #476b84;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
`;

const InputHandler = styled.input`
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  color: #9e9e9e;
  font-size: 14px;
  font-style: italic;
  height: 45px;
  padding: 15px;
`;

const SubTitle = styled.p`
  color: #909090;
  font-family: "Avenir Next";
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
`;
const UnlockButton = styled.button`
  width: 460px;
  height: 62px;
  border-radius: 4px;
  background-color: #00b8dc;
  border: 0;
  box-shadow: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  line-height: 29.02px;
`;

export default props => (
  <Modal {...props} title={T.translate("unlock.title")}>
    <Title>{T.translate("unlock.inputTitle")}</Title>
    <InputHandler
      type="password"
      name="address"
      id="passphrase"
      style={{ width: "460px" }}
    />
    <SubTitle>{T.translate("unlock.info")}</SubTitle>
    <UnlockButton>{T.translate("unlock.button")}</UnlockButton>
  </Modal>
);
