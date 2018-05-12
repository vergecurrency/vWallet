import React from "react";
import styled from "styled-components";

const Title = styled.p`
  color: #fcf1eb;
  font-weight: 500;
  font-size: 25px;
  margin-top: -40px;
`;

const AnimatedImage = styled.img`
  width: 400px;
  height: auto;
`;

export default ({ image, text }) => (
  <div>
    <AnimatedImage src={image} />
    <Title>{text}</Title>
  </div>
);
