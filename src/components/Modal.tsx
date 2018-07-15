import * as React from 'react'

import { Modal, ModalBody, ModalHeader } from 'reactstrap'

interface ModalProps {
  open: boolean
  toggle: (() => void) & ((e: Event) => void)
  title: string
  children: JSX.Element[] | JSX.Element
  style?: any
  className?: string
}

export default ({ open, toggle, title, children, style, className }: ModalProps) => (
  <Modal
    isOpen={open}
    toggle={toggle}
    centered={true}
    style={{ width: '547px', height: '688px', ...style }}
    className={className}
  >
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalBody>{children}</ModalBody>
  </Modal>
)
