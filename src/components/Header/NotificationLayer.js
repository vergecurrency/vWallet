import NotificationTile from "./NotificationTile";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
const Banner = styled.div`
  background-color: #fff;
  opacity: 0.7;
`;

const test = {
  notifications: [
    {
      type: "personal",
      title: "Achievement!",
      inner: "You have reached 10 transactions",
      timeOfOccurance: 1527777829
    },
    {
      type: "price",
      title: "Mooooooning!",
      inner: "Price has reached $0.20",
      timeOfOccurance: 1527778829
    },
    {
      type: "cap",
      title: "Market Cap!",
      inner: "We reached a Market cap of 1bln.",
      timeOfOccurance: 1527773829
    }
  ]
};

const NotificationLayer = ({ notifications } = test) => (
  <div className="container">
    {test.notifications.map((notification, index) => (
      <NotificationTile
        key={`${notification.timeOfOccurance}#${notification.type}`}
        {...notification}
        first={index == 0}
      />
    ))}
  </div>
);

NotificationLayer.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object)
};

export default NotificationLayer;
