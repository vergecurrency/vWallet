import { Col, Container, Row } from "reactstrap";

import Achievement from "../../icons/Achievement";
import Moment from "react-moment";
import PriceChart from "../../icons/PriceChart";
import PriceTag from "../../icons/PriceTag";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const RowHover = styled.div`
  /*box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);*/
  ${props =>
    props.first ? "" : "border-top: 1px solid hsla(0, 0%, 0%, 0.15);"}
  /*border-top: 6px solid hsla(${props => props.color}, 78%, 38%, 1);*/
  margin-bottom: 10px !important;
  padding-top: 10px !important;
  padding-left: -15px !important;
  padding-right: -15px !important;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const Icon = styled.div`
  display: inline-flex;
  padding: 10px;
  height: 40px;
  width: 40px;
  background: linear-gradient(
    hsla(${props => props.color}, 75%, 25%, 1),
    hsla(${props => props.color}, 75%, 65%, 1)
  );
  border-radius: 50%;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

const perStep = 360 / 3;
const getColor = type => {
  if (type === "price") return (perStep + 25) * 2;
  if (type === "cap") return (perStep + 25) * 4;
  if (type === "personal") return (perStep + 25) * 6;
};

const getIcon = type => {
  if (type === "price")
    return <PriceTag width={20} height={20} style={{ fill: "#fff" }} />;
  if (type === "cap")
    return <PriceChart width={20} height={20} style={{ fill: "#fff" }} />;
  if (type === "personal")
    return <Achievement width={20} height={20} style={{ fill: "#fff" }} />;
  return null;
};
const NotificationLayer = ({ type, title, inner, timeOfOccurance, first }) => (
  <RowHover className="row" color={getColor(type)} first={first}>
    <Col
      md="3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        justifyItems: "center"
      }}
    >
      <Icon color={getColor(type)}>{getIcon(type)}</Icon>
    </Col>
    <Col md="9">
      <Title>{title}</Title>
      <SubTitle>{inner}</SubTitle>
      <Moment
        unix
        fromNow
        style={{
          fontSize: "14px",
          fontWeight: "200"
        }}
      >
        {timeOfOccurance}
      </Moment>
    </Col>
  </RowHover>
);

NotificationLayer.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  inner: PropTypes.string,
  timeOfOccurance: PropTypes.number,
  first: PropTypes.bool
};

export default NotificationLayer;
