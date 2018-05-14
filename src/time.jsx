import React from "react";
import PropTypes from "prop-types";
import DixaIcon from "@dixa/react-dixa-icon";

import {
  getHour,
  getMinute,
  newDate,
  getStartOfDay,
  addMinutes,
  cloneDate,
  formatDate,
  isTimeInDisabledRange,
  isTimeDisabled,
  timesToInjectAfter
} from "./date_utils";

export default class Time extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    includeTimes: PropTypes.array,
    intervals: PropTypes.number,
    selected: PropTypes.object,
    onChange: PropTypes.func,
    minTime: PropTypes.object,
    maxTime: PropTypes.object,
    excludeTimes: PropTypes.array,
    monthRef: PropTypes.object,
    injectTimes: PropTypes.array
  };

  static get defaultProps() {
    return {
      intervals: 30,
      onTimeChange: () => {}
    };
  }

  constructor(props: propTypes) {
    super(props);
    this.state = {
      index: getHour(props.selected)
    };
  }

  componentDidMount() {
    // code to ensure selected time will always be in focus within time window when it first appears
    const multiplier = 60 / this.props.intervals;
    const currH = this.props.selected
      ? getHour(this.props.selected)
      : getHour(newDate());
    this.list.scrollTop = 30 * (multiplier * currH);
  }

  handleClick = time => {
    if (
      ((this.props.minTime || this.props.maxTime) &&
        isTimeInDisabledRange(time, this.props)) ||
      (this.props.excludeTimes &&
        isTimeDisabled(time, this.props.excludeTimes)) ||
      (this.props.includeTimes &&
        !isTimeDisabled(time, this.props.includeTimes))
    ) {
      return;
    }

    this.props.onChange(time);
  };

  liClasses = (time, currH) => {
    let classes = ["react-datepicker__time-list-item"];

    if (
      ((this.props.minTime || this.props.maxTime) &&
        isTimeInDisabledRange(time, this.props)) ||
      (this.props.excludeTimes &&
        isTimeDisabled(time, this.props.excludeTimes)) ||
      (this.props.includeTimes &&
        !isTimeDisabled(time, this.props.includeTimes))
    ) {
      classes.push("react-datepicker__time-list-item--disabled");
    }
    if (
      this.props.injectTimes &&
      (getHour(time) * 60 + getMinute(time)) % this.props.intervals !== 0
    ) {
      classes.push("react-datepicker__time-list-item--injected");
    }

    return classes.join(" ");
  };

  renderTimes = (index: number) => {
    let times = [];
    const format = this.props.format ? this.props.format : "hh:mm A";
    const intervals = this.props.intervals;
    const activeTime = this.props.selected ? this.props.selected : newDate();
    const currH = getHour(activeTime);
    let base = getStartOfDay(newDate());
    const multiplier = 1440 / intervals;
    const sortedInjectTimes =
      this.props.injectTimes &&
      this.props.injectTimes.sort(function(a, b) {
        return a - b;
      });
    for (let i = 0; i < multiplier; i++) {
      const currentTime = addMinutes(cloneDate(base), i * intervals);
      times.push(currentTime);

      if (sortedInjectTimes) {
        const timesToInject = timesToInjectAfter(
          base,
          currentTime,
          i,
          intervals,
          sortedInjectTimes
        );
        times = times.concat(timesToInject);
      }
    }
    const time = times.map((time, i) => {
      if (i === index) {
        return (
          <span
            key={i}
            onClick={this.handleClick.bind(this, time)}
            className={this.liClasses(time, currH)}
          >
            {formatDate(time, format)}
          </span>
        );
      }
    });
    return time;
  };

  renderPreviousTimeOption = () => {
    const classes = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--previous"
    ];

    let clickHandler = this.decreaseTime;

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
      >
        <DixaIcon icon="arrow-left" />
      </button>
    );
  };

  renderNextTimeOption = () => {
    const classes = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--next"
    ];

    let clickHandler = this.increaseTime;

    return (
      <button
        type="button"
        className={classes.join(" ")}
        onClick={clickHandler}
      >
        <DixaIcon icon="arrow-right" />
      </button>
    );
  };

  increaseTime = () => {
    const index = this.state.index + 1;
    this.setState({ index });
  };

  decreaseTime = () => {
    let index = this.state.index;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  };

  render() {
    let height = null;
    if (this.props.monthRef) {
      height = this.props.monthRef.clientHeight - 39;
    }

    return (
      <div className={`react-datepicker__time-container`}>
        <div className="react-datepicker__time">
          <div className="react-datepicker__time-box">
            <div
              className="react-datepicker__time-list"
              ref={list => {
                this.list = list;
              }}
            >
              {this.renderPreviousTimeOption()}
              {this.renderNextTimeOption()}
              <div className="time-container">
                {this.renderTimes.bind(this)(this.state.index)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
