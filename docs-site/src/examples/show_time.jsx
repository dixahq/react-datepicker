import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export default class ShowTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  confirmReminder = time => {
    //console.log("TIME ", time)
  };

  render() {
    return (
      <div className="row">
        <pre className="column example__code">
          <code className="jsx">
            {`
<DatePicker
    selected={this.state.startDate}
    onChange={this.handleChange}`}
            <br />
            <strong>{`    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    dateFormat="LLL"
    timeCaption="time"
    confirmReminder={this.confirmReminder}
/>
`}</strong>
          </code>
        </pre>
        <div className="column">
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="time"
            dateFormat="LLL"
            confirmReminder={this.confirmReminder}
          />
        </div>
      </div>
    );
  }
}
