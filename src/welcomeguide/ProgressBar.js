import React from 'react'
import { Link } from 'react-router-dom'

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
    link: '/wallet/mnemonic',
    returnable: false,
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

const checkIfStepsAreIdentical = step => comparedStep =>
  comparedStep.link === step

const progressCircle = areIdentical => (
  <div className={'tour-progress-circle ' + (areIdentical ? 'active' : '')} />
)

const createProgressSteps = step => {
  return STEP_LINKS.map((item, index) => {
    const selectedStep = STEP_LINKS.find(checkIfStepsAreIdentical(step))
    const selectedStepIndex = STEP_LINKS.findIndex(
      checkIfStepsAreIdentical(step),
    )
    const areIdentical = checkIfStepsAreIdentical(step)(item)

    return (
      <div key={item.link}>
        {index < selectedStepIndex && selectedStep.returnable && (
          <Link to={item.link}>{progressCircle(areIdentical)}</Link>
        )}
        {index < selectedStepIndex && !selectedStep.returnable && (
          <div className="tour-progress-circle-done">
            {progressCircle(areIdentical)}
          </div>
        )}
        {index >= selectedStepIndex && progressCircle(areIdentical)}
      </div>
    )
  })
}

export default createProgressSteps
