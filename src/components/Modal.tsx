import * as React from 'react'

import { Modal, ModalBody, ModalHeader } from 'reactstrap'

interface ModalProps {
  open: boolean
  toggle: (event: Event) => void
  title: string
  children: Node | Node[]
}

export default ({ open, toggle, title, children }: ModalProps) => (
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
