import { Col, Row } from 'reactstrap'
import styled, { css } from 'styled-components'

import Modal from '../Modal'
import React from 'react'
import T from 'i18n-react'
import github from '../../assets/images/github.png'

const centerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleItem = styled.span`
  color: #476b84;
  font-size: 13px;
  font-weight: 500;
`

const NameItem = styled.div`
  color: #647e90;
  font-size: 12px;
  font-weight: 400;
  line-height: 2em;
`

const CenterContainer = styled.div`
  ${centerStyle};
`

const ContributorButton = styled.button`
  ${centerStyle} 
  width: 223px;
  height: 44px;
  border-radius: 4px;
  background-color: #25292e;
  border: 0;
  box-shadow: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: 400;
  line-height: 29.02px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 15px;
`

const GithubImage = styled.img`
  width: 16px;
  height: 16px;
	content: url("${github}");
	margin-right: 15px;
`

const CreditsPanel = props => (
  <Modal {...props} title="Credits">
    <Row style={{ marginBottom: '10px' }}>
      <Col md="3">
        <TitleItem>{T.translate('credits.development')}</TitleItem>
      </Col>
      <Col md="9">
        <NameItem>Justin, @justinvendetta</NameItem>
        <NameItem>Marvin, @marpme_</NameItem>
        <NameItem>Swen, @swenvanzanten</NameItem>
      </Col>
    </Row>
    <Row style={{ marginBottom: '10px' }}>
      <Col md="3">
        <TitleItem>{T.translate('credits.design')}</TitleItem>
      </Col>
      <Col md="9">
        <NameItem>Hassan, @waveon3</NameItem>
      </Col>
    </Row>
    <Row>
      <Col md="3">
        <TitleItem>{T.translate('credits.translation')}</TitleItem>
      </Col>
      <Col md="9">
        <NameItem>Marvin, @marpme_ (English/German)</NameItem>
      </Col>
    </Row>

    <CenterContainer>
      <ContributorButton>
        <GithubImage /> {T.translate('credits.contributorButton')}
      </ContributorButton>
    </CenterContainer>
  </Modal>
)

export default CreditsPanel
