import React from 'react';
import BookingCalendar from 'react-booking-calendar';

class Booking extends React.Component {
  /* State will contain objects that are retreived from MYSQL. convertedBookings
  is the same data, but converted to Date-format. */
  state = {
    allBookings: null,
    convertedBookings: []
  }

  /* Before the component is mounted fetchBookings is called and the result is
  stored in this.state.allBookings. */
  componentWillMount = () => {
    this.fetchBookings()
      .then((bookings) => {
        this.setState({ allBookings: bookings }, () => {
          /* After all the bookings are present in this.state.allBookings they
          are converted to the Date format through the convertBookingtoDates-method. */
          this.convertBookingstoDates();
        });
      })
  }

  fetchBookings = () => {
    return fetch("http://localhost:8888/fetch_bookings.php")
      .then((response) => response.json())
  }

  /* Converts this.state.allBookings from MySQL date-format to something that
  JavaScript can understand through new Date. */
  convertBookingstoDates = (props) => {
    if (this.state.allBookings) {
      let allConvertedBookings = [];
      this.state.allBookings.map((booking, i) => {
        allConvertedBookings.push(new Date(booking.date));
      });
      this.setState({ convertedBookings: allConvertedBookings });
    }
  }

  render = () => {
    /* Only render if this.state.convertedBookings returns true. */
    if (this.state.convertedBookings) {
      return (
        <div className="booking-calendar-container">
          <BookingCalendar bookings={this.state.convertedBookings} clickable={true} />
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default Booking;
