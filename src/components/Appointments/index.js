import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import CreateAppointment from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isFilterActive: false}

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const FormatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: FormatDate,
      isStar: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  titleInputValue = event => {
    this.setState({title: event.target.value})
  }

  dateInput = event => {
    this.setState({date: event.target.value})
  }

  makeStarAppointment = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStar: !eachAppointment.isStar}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onlyStaredAppointments = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStar === true,
      )
    }
    return appointmentList
  }

  render() {
    const {appointmentList, title, date} = this.state
    const FilterAppointmentList = this.onlyStaredAppointments()
    console.log(appointmentList)
    return (
      <div className="main-container">
        <div className="sub-container">
          <div className="appointment-container">
            <form className="form-control" onSubmit={this.addAppointment}>
              <h1>Add Appointment</h1>
              <div className="sub-input-container">
                <label htmlFor="title" className="inputLabel">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  placeholder="Title"
                  className="titleInput"
                  onChange={this.titleInputValue}
                />
              </div>
              <div className="sub-input-container">
                <label htmlFor="date" className="inputLabel">
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  id="date"
                  placeholder="Title"
                  className="titleInput"
                  onChange={this.dateInput}
                />
              </div>
              <button type="submit">Add</button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointmentImage"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div>
            <div className="appointmentListAndButton">
              <h1 className="appointmentHeading">Appointments</h1>
              <div>
                <button
                  type="button"
                  className="staredButton"
                  onClick={this.onFilter}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="appointmentListContainer">
              {FilterAppointmentList.map(eachAppointment => (
                <CreateAppointment
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  makeStarAppointment={this.makeStarAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
