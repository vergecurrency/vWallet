import * as React from 'react'

import { Modal, ModalBody, ModalHeader } from 'reactstrap'

interface ModalProps {
  open: boolean
  toggle: (() => void) & ((e: Event) => void)
  title: string
  children: JSX.Element[] | JSX.Element
  style?: any
}

export default ({ open, toggle, title, children, style }: ModalProps) => (
  <Modal
    isOpen={open}
    toggle={toggle}
    centered={true}
    style={{ width: '547px', height: '688px', ...style }}
  >
    <ModalHeader
      style={{
        color: '#fff',
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 78,
        background: '#00b8dc',
        textAlign: 'center',
        padding: 'none',
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
