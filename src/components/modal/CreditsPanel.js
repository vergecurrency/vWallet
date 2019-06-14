import { Col, Row } from 'reactstrap'
import styled, { css } from 'styled-components'

import Modal from '../Modal'
import React from 'react'
import github from '../../assets/images/github.png'
import { translate, Trans } from 'react-i18next'

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
  ${centerStyle} width: 223px;
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

const devNames = [
  'Justin, @justinvendetta',
  'Marvin, @marpme_',
  'Swen, @swenvanzanten',
]

const designNames = ['Hassan, @waveon3', 'Swen, @swenvanzanten']

const translateNames = ['Marvin, @marpme_']

const CreditsPanel = props => (
  <Modal {...props} title="Credits">
    <Row style={{ marginBottom: '10px' }}>
      <Col md="3">
        <TitleItem>
          <Trans i18nKey={'credits.development'} />
        </TitleItem>
      </Col>
      <Col md="9">
        {devNames.map((e, key) => <NameItem key={key}>{e}</NameItem>)}
      </Col>
    </Row>
    <Row style={{ marginBottom: '10px' }}>
      <Col md="3">
        <TitleItem>
          <Trans i18nKey={'credits.design'} />
        </TitleItem>
      </Col>
      <Col md="9">
        {designNames.map((e, key) => <NameItem key={key}>{e}</NameItem>)}
      </Col>
    </Row>
    <Row>
      <Col md="3">
        <TitleItem>
          <Trans i18nKey={'credits.translation'} />
        </TitleItem>
      </Col>
      <Col md="9">
        {translateNames.map((e, key) => <NameItem key={key}>{e}</NameItem>)}
      </Col>
    </Row>

    <CenterContainer>
      <ContributorButton>
        <GithubImage /> <Trans i18nKey={'credits.contributorButton'} />
      </ContributorButton>
    </CenterContainer>
  </Modal>
)

export default translate('translations')(CreditsPanel)
