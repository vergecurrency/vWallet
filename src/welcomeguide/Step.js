import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import logo from '../assets/images/verge-logo-white.png'
import { Link } from 'react-router-dom'
import { platform } from 'os'

const STEP_LINKS = [
  {
    link: '/welcome',
    returnable: true,
  },
  {
    link: '/wallet/create',
    returnable: true,
  },
  {
    link: '/wallet/create/confirm',
    returnable: true,
  },
  {
    link: '/buyhelp',
    returnable: false,
  },
  {
    link: '/finalize',
    returnable: false,
  },
]

const createProgressSteps = step => {
  return STEP_LINKS.map((item, index) => {
    let selectedStep = STEP_LINKS.find(x => x.link === step)
    let selectedStepIndex = STEP_LINKS.findIndex(x => x.link === step)
    let progressCircle = (
      <div
        className={
          'tour-progress-circle ' + (step === item.link ? 'active' : '')
        }
      />
    )

    return (
      <div key={item.link}>
        {index < selectedStepIndex &&
          selectedStep.returnable && (
            <Link to={item.link}>{progressCircle}</Link>
          )}
        {index < selectedStepIndex &&
          !selectedStep.returnable && (
            <div className="tour-progress-circle-done">{progressCircle}</div>
          )}
        {index >= selectedStepIndex && progressCircle}
      </div>
    )
  })
}

export default ({ title, subtitle, small, component, step, ...props }) => {
  return (
    <div style={{ height: '100%' }}>
      <TitleBar menu={[]} className={platform()} />
      <div className="tour-background">
        {title && (
          <p className={!small ? 'tour-title' : 'tour-title-small'}>{title}</p>
        )}
        {subtitle && <p className="tour-subtitle">{subtitle}</p>}
        {props.children}
        <div className="tour-verge-logo">
          <img src={logo} width="125px" />
        </div>
        <div className="tour-progress">{createProgressSteps(step)}</div>
      </div>
    </div>
  )
}
