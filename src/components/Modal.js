import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap'

export default ({ open, toggle, title, children }) => (
  <Modal
    isOpen={open}
    toggle={toggle}
    centered={true}
    style={{ width: '547px', height: '688px' }}
  >
    <ModalHeader
      style={{
        color: '#003b54',
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 78,
        background: '#fff',
      }}
      toggle={toggle}
    >
      {title}
    </ModalHeader>
    <ModalBody
      style={{
        background: '#fff',
        borderBottomLeftRadius: '.3em',
        borderBottomRightRadius: '.3em',
      }}
    >
      {children}
    </ModalBody>
  </Modal>
)
