import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getFavoriteRecipes,
  removeFavoriteRecipe
} from '../../actions/userActions';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import ApiCalendar from 'react-google-calendar-api';
import { Link } from 'react-router-dom';
import { uppercaseFirst } from '../../Helpers';

import './Dashboard.css';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const optimalTimeSpanInHours = 2;
const getEventsOfNextDays = 6; // for how many days you want to get the events schedule for

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedForEvents: false,
      events: [],
      loggedIn: ApiCalendar.sign
    };
    this.connectCalender = this.connectCalender.bind(this);
  }

  componentDidMount() {
    this.props.getFavoriteRecipes();
  }

  removeRecipe(id) {
    this.props.removeFavoriteRecipe(id);
  }

  connectCalender() {
    ApiCalendar.handleAuthClick();
    this.setState({ loggedIn: ApiCalendar.sign });
  }

  async getEvents() {
    if (ApiCalendar.sign) {
      const { result } = await ApiCalendar.listUpcomingEvents(50);
      this.setState({ checkedForEvents: true, events: result.items });
    }
  }

  millisecondsToHours(timeInMilliseconds) {
    return timeInMilliseconds / 3600000;
  }

  // this function will list the schedule current day
  doCalendarWorkForCurrentDay() {
    const { checkedForEvents, events } = this.state;
    if (checkedForEvents && events.length > 0) {
      const currentDate = new Date();

      const filteredTodayEvents = events.filter(
        e => new Date(e.start.dateTime).getDate() === currentDate.getDate()
      );

      if (filteredTodayEvents.length === 0) {
        // if there are no events the return this
        return (
          <p>
            Hey, it looks like you don't have any events today, it time is an
            optimal time to prepare a meal!
          </p>
        );
      }

      // start of the day
      let currentEventStartTime = new Date(
        filteredTodayEvents[0]['start']['dateTime']
      );
      let dayStartOptimalTime = '';
      if (currentEventStartTime.getHours() >= 8) {
        dayStartOptimalTime = `08:00 to ${currentEventStartTime.toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }
        )}`;
      }

      let optimalTimes = filteredTodayEvents.map((e, i, arr) => {
        let currentEventEndTime = new Date(e['end']['dateTime']);

        if (i < arr.length - 1) {
          let nextEventStartTime = new Date(arr[i + 1]['start']['dateTime']);
          let timeSpan = this.millisecondsToHours(
            nextEventStartTime - currentEventEndTime
          );
          if (timeSpan >= optimalTimeSpanInHours) {
            return `${currentEventEndTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })} to ${nextEventStartTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}`;
          }
        } else {
          return `${currentEventEndTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })} to 00:00`;
        }
      });

      optimalTimes = [dayStartOptimalTime, ...optimalTimes];
      optimalTimes = optimalTimes.filter(e => e !== undefined && e !== '');

      if (optimalTimes.length === 0) {
        // if there are events but no optimal time then return this
        return (
          <p>
            Hey, it looks you are busy today, you don't have optimal time of{' '}
            {optimalTimeSpanInHours} hour(s) to prepare a meal!
          </p>
        );
      }

      return (
        <Fragment>
          <p>
            Hey, it looks like <strong>{days[currentDate.getDay()]}</strong>{' '}
            from
          </p>
          <p>
            {optimalTimes.map((time, i) => (
              <span key={i} className="ml-3">
                <em>{time}</em>
                <br />
              </span>
            ))}
          </p>
          <p>is an optimal time to prepare a meal!</p>
        </Fragment>
      );
    } else if (checkedForEvents && events.length > 0) {
      // if there are no events the return this
      return (
        <p>
          Hey, it looks like you don't have any events, it time is an optimal
          time to prepare a meal!
        </p>
      );
    }
  }

  // this function will list the schedule of multiple days
  doCalendarWorkForWeek() {
    const { checkedForEvents, events } = this.state;
    if (checkedForEvents && events.length > 0) {
      let currentDate = new Date();
      let schedule = [];

      for (let j = 0; j < getEventsOfNextDays; j++) {
        currentDate.setDate(new Date().getDate() + j);
        const filteredDateEvents = events.filter(
          e => new Date(e.start.dateTime).getDate() === currentDate.getDate()
        );

        if (filteredDateEvents.length === 0) {
          // if there are no events the return this
          schedule.push(
            <Fragment>
              <p>
                Hey, it looks like you don't have any events on{' '}
                <strong>{days[currentDate.getDay()]}</strong>, it time is an
                optimal time to prepare a meal!
              </p>
              <hr />
            </Fragment>
          );
          continue;
        }

        // start of the day
        let currentEventStartTime = new Date(
          filteredDateEvents[0]['start']['dateTime']
        );
        let dayStartOptimalTime = '';
        if (currentEventStartTime.getHours() >= 8) {
          dayStartOptimalTime = `08:00 to ${currentEventStartTime.toLocaleTimeString(
            [],
            {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }
          )}`;
        }

        let optimalTimes = filteredDateEvents.map((e, i, arr) => {
          let currentEventEndTime = new Date(e['end']['dateTime']);

          if (i < arr.length - 1) {
            let nextEventStartTime = new Date(arr[i + 1]['start']['dateTime']);
            let timeSpan = this.millisecondsToHours(
              nextEventStartTime - currentEventEndTime
            );
            if (timeSpan >= optimalTimeSpanInHours) {
              return `${currentEventEndTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })} to ${nextEventStartTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })}`;
            }
          } else {
            return `${currentEventEndTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })} to 00:00`;
          }
        });

        optimalTimes = [dayStartOptimalTime, ...optimalTimes];
        optimalTimes = optimalTimes.filter(e => e !== undefined && e !== '');

        if (optimalTimes.length === 0) {
          // if there are events but no optimal time then return this
          schedule.push(
            <Fragment>
              <p>
                Hey, it looks you are busy on{' '}
                <strong>{days[currentDate.getDay()]}</strong>, you don't have
                optimal time of {optimalTimeSpanInHours} hour(s) to prepare a
                meal!
              </p>
              <hr />
            </Fragment>
          );
        } else {
          schedule.push(
            <Fragment>
              <p>
                Hey, it looks like <strong>{days[currentDate.getDay()]}</strong>{' '}
                from
              </p>
              <p>
                {optimalTimes.map((time, i) => (
                  <span key={i} className="ml-3">
                    <em>{time}</em>
                    <br />
                  </span>
                ))}
              </p>
              <p>is an optimal time to prepare a meal!</p>
              <hr />
            </Fragment>
          );
        }
      }
      return schedule;
    } else if (checkedForEvents && events.length === 0) {
      // if there are no events the return this
      return (
        <p>
          Hey, it looks like you don't have any events, it time is an optimal
          time to prepare a meal!
        </p>
      );
    }
  }

  renderFavoriteRecipes() {
    const { isLoading, favoriteRecipes } = this.props.userData;
    if (isLoading) {
      return <Skeleton count={5} height={50} />;
    } else {
      return favoriteRecipes.map(recipe => (
        <li key={recipe._id} className="list-group-item d-flex">
          <Link
            to={`/recipe/${parseInt(recipe.recipe_id)}`}
            className="text-primary"
          >
            {recipe.title}
          </Link>
          <span className="ml-auto text-secondary">
            <i
              title={`Remove ${recipe.title}`}
              className="fas fa-trash"
              onClick={this.removeRecipe.bind(this, recipe._id)}
            />
          </span>
        </li>
      ));
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="Dashboard">
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-8">
              <h2>{`Welcome ${uppercaseFirst(user.name)}`}</h2>
            </div>
            <div className="Dashboard-connect-to-calender col-md-4 d-flex">
              {!ApiCalendar.sign ? (
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={this.connectCalender}
                >
                  <i className="fas fa-calendar-week mr-2" />
                  Connect to Google Calender
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => this.getEvents()}
                >
                  <i className="fas fa-calendar-week mr-2" />
                  Check Schedule
                </button>
              )}
            </div>
          </div>
          <div className="my-3">{this.doCalendarWorkForWeek()}</div>
          <hr />

          <div className="Dashboard-favorite-recipes">
            <h4>Manage Favorite Recipes</h4>
            <ul className="list-group my-4">{this.renderFavoriteRecipes()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  getFavoriteRecipes: PropTypes.func.isRequired,
  removeFavoriteRecipe: PropTypes.func.isRequired
};

export default connect(
  state => ({
    user: state.auth.user,
    userData: state.user
  }),
  { getFavoriteRecipes, removeFavoriteRecipe }
)(Dashboard);
