import React from 'react'
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
} from 'reactstrap'

export default props => (
	<Modal
		isOpen={props.modal}
		toggle={props.toggleUnlock}
		className={props.className}
		centered={true}
		style={{ color: '#fff' }}
	>
		<ModalHeader
			style={{ backgroundColor: '#006994' }}
			toggle={props.toggleUnlock}
		>
			Unlock your wallet
		</ModalHeader>
		<ModalBody style={{ background: '#003d58', padding: '10% 10%' }}>
			<p>Make sure that nobody can see your input.</p>
			<div>
				<Input
					type="password"
					name="password"
					id="passpharse"
					placeholder="Passphrase"
				/>
			</div>
		</ModalBody>
		<ModalFooter style={{ backgroundColor: '#006994' }}>
			<Button
				style={{
					background: '#003d58',
					border: 'none',
				}}
				onClick={props.toggleUnlock}
			>
				Unlock
			</Button>{' '}
			<Button
				style={{
					background: '#000',
					border: 'none',
				}}
				onClick={props.toggleUnlock}
			>
				Cancel
			</Button>
		</ModalFooter>
	</Modal>
)
