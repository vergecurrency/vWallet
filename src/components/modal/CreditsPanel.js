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
  font-size: 16px;
  font-weight: 400;
`

const NameItem = styled.div`
  color: #647e90;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5em;
`

const CenterContainer = styled.div`
  ${centerStyle};
`

const ContributorButton = styled.button`
  ${centerStyle} width: 253px;
  height: 62px;
  border-radius: 4px;
  background-color: #25292e;
  border: 0;
  box-shadow: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  line-height: 29.02px;
  text-align: center;
  margin-top: 35px;
`

const GithubImage = styled.img`
  width: 16px;
  height: 16px;
	content: url("${github}");
	margin-right: 15px;
`

const CreditsPanel = props => (
  <Modal {...props} title="Credits">
    <Row>
      <Col md="6">
        <TitleItem>{T.translate('credits.development')}</TitleItem>
      </Col>
      <Col md="6">
        <NameItem>Justin, @justinvendetta</NameItem>
        <NameItem>Marvin, @marpme_</NameItem>
      </Col>
    </Row>
    <hr />
    <Row>
      <Col md="6">
        <TitleItem>{T.translate('credits.design')}</TitleItem>
      </Col>
      <Col md="6">
        <NameItem>Hassan, @waveon3</NameItem>
      </Col>
    </Row>
    <hr />
    <Row>
      <Col md="6">
        <TitleItem>{T.translate('credits.translation')}</TitleItem>
      </Col>
      <Col md="6">
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
