import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import ArrowDown from "../../icons/ArrowDown";
import ArrowUp from "../../icons/ArrowUp";
import Loading from "../../icons/Loading";
import Pile from "../../icons/Pile";
import SearchBar from "./SearchBar";
import T from "i18n-react";
import Transaction from "./Transaction";
import layers from "../../assets/images/layers.png";
import layersLight from "../../assets/images/layers-light.png";
import moment from "moment";
import styled from "styled-components";

const TransactionListContainer = styled.div`
  position: relative;
  bottom: 50px;
  left: 40px;
  width: 670px;
  height: 450px;
  border-radius: 7px;
  color: #003b54 !important;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  ${props =>
    props.theme.light
      ? "background-color: #ffffff;"
      : "background-color: #152b3d;"};
`;

const ItemContainer = styled.div`
  padding: 6px 10px;
`;

const TransactionTitle = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  font-size: 26px;
  height: 45px;
  padding-bottom: 8px;
  padding-left: 30px !important;
  ${props => (props.theme.light ? "" : "color: #fff;")};
  > svg {
    ${props => (props.theme.light ? "" : "fill: #fff;")};
  }
`;
/*:before {
    content: url(${props => (props.theme.light ? layers : layersLight)});
    width: 26px;
    height: 26px;
    margin-right: 15px;
    margin-top: 5px;
  }*/

const MonthlySummary = styled.div`
  bottom: 15px;
  height: 45px;
  padding-bottom: 59px;
  text-align: right;
  padding-right: 30px !important;
  ${props => (props.theme.light ? "" : "color: #fff;")};
`;

const UpperSummary = styled.div`
  ${props => (props.theme.light ? "" : "color: #fff;")};
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 400;
  display: block;
`;

const SpendSummary = styled.div`
  font-size: 14px;
  border-radius: 21px;
  width: auto;
  align-items: center;
  display: inline-flex;
  padding: 5px 10px;
  margin-right: 15px;
  background-color: ${props =>
    props.theme.light ? "rgb(222, 222, 222)" : "#091825"};
  color: ${props => (props.theme.light ? "#003b54" : "#fff")};
  .arrow-down {
    stroke: ${props => (props.theme.light ? "#003b54" : "#fff")};
  }
`;

const ReceivedSummary = styled.div`
  font-size: 14px;
  border-radius: 21px;
  width: auto;
  align-items: center;
  display: inline-flex;
  padding: 5px 10px;
  background-color: #009178;
  color: #fff;
`;

const Seperator = styled.hr`
  ${props =>
    props.theme.light ? "" : "background-color: rgba(238, 238, 238, 0.05);"};
  margin: 0px 0px;
`;

class TransactionList extends Component {
  getMonthlyOuputFormatted(XVGSummaryFormatter) {
    return XVGSummaryFormatter.format(
      this.props.TransactionStore.monthlyOutput
    );
  }

  getMonthlyIncomeFormatted(XVGSummaryFormatter) {
    return `+${XVGSummaryFormatter.format(
      this.props.TransactionStore.monthlyIncome
    )}`;
  }

  render() {
    const XVGFormatter = new Intl.NumberFormat(
      this.props.SettingsStore.getLocale,
      {
        style: "decimal",
        minimumFractionDigits: 3
      }
    );

    return (
      <TransactionListContainer>
        <div className="trans-counter">
          {this.props.TransactionStore.getTransactionCount > 10
            ? "10+"
            : this.props.TransactionStore.getTransactionCount}
        </div>
        <div className="container">
          <div className="row">
            <TransactionTitle className="col-md-6">
              <Pile
                width={30}
                height={30}
                style={{ fill: "#003b54", marginRight: "10px" }}
              />{" "}
              {T.translate("transaction.list")}
            </TransactionTitle>
            <MonthlySummary className="col-md-6">
              <UpperSummary>
                Summary for {moment().format("MMMM YYYY")}
              </UpperSummary>
              <SpendSummary>
                <ArrowDown
                  width={14}
                  height={14}
                  style={{ marginRight: "5px" }}
                />
                {this.getMonthlyOuputFormatted(XVGFormatter)}
              </SpendSummary>
              <ReceivedSummary>
                <ArrowUp
                  width={14}
                  height={14}
                  style={{ marginRight: "5px" }}
                />
                {this.getMonthlyIncomeFormatted(XVGFormatter)}
              </ReceivedSummary>
            </MonthlySummary>
          </div>
        </div>
        <Seperator />
        <div
          className="scrollbar scrollbar-primary transaction-list-top"
          style={{
            ...(this.props.TransactionStore.loaded
              ? {}
              : {
                  textAlign: "center",
                  display: "block",
                  paddingTop: "25%"
                }),
            overflowY: "auto",
            maxHeight: "353px",
            minHeight: "353px"
          }}
        >
          {this.props.TransactionStore.loaded ? (
            <div className="container">
              <SearchBar />
              {this.props.TransactionStore.lastTenTransaction.map(
                transaction => (
                  <ItemContainer
                    className="row"
                    key={`${transaction.txid}#${transaction.category}#${
                      transaction.address
                    }#${transaction.timereceived}`}
                  >
                    <Transaction {...transaction} />
                  </ItemContainer>
                )
              )}
            </div>
          ) : (
            <Loading text="Loading ..." />
          )}
        </div>
      </TransactionListContainer>
    );
  }
}

export default inject("TransactionStore", "SettingsStore")(
  observer(TransactionList)
);
