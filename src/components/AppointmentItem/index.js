import './index.css'

const CreateAppointment = props => {
  const {eachAppointment} = props
  const {id, title, date, isStar} = eachAppointment

  const makeStar = () => {
    const {makeStarAppointment} = props
    makeStarAppointment(id)
  }

  const StarMark = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointmentItem">
      <div className="nameDateCard">
        <p className="titleName">{title}</p>
        <p className="dateParagraph">{date}</p>
      </div>
      <div>
        <button
          type="button"
          className="starButton"
          onClick={makeStar}
          data-testid="star"
        >
          <img src={StarMark} alt="star" className="" />
        </button>
      </div>
    </li>
  )
}

export default CreateAppointment
