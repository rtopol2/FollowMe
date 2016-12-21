// this component is for firing an event to update the pulseData inside redux store
// needs to be inside FeedbackBox component
import { connect } from 'react-redux';
// import a helper function to compute the time difference
import timeDiffToMinutes from '../util/timeDiffToMinutes';
import React, { Component } from 'react';

class FeedbackButton extends Component {

<<<<<<< HEAD
  render () {
    return (
      <button id="updatePulse">Feedback</button>
    );
  }

  componentDidMount () {
    let canIncrement = true;
    let resetCode;

    document.getElementById('updatePulse').addEventListener('click', function () {
      // If button has not been clicked in last 30 seconds,
      // then fire "increment" event and queue "decrement" event
      if (canIncrement) {
        socket.emit('updatePulse', 'INCREMENT', new Date());
        decrement();
        canIncrement = false;
      } else {
        resetDecrement();
      }
    });

    function decrement () {
      // In 30 seconds, emit "decrement" event
      // Capture reset code for setTimeout and store in resetCode
      resetCode = setTimeout(function () {
        socket.emit('updatePulse', 'DECREMENT', new Date());
        canIncrement = true;
      }, 5000);
    }

    function resetDecrement () {
      clearTimeout(resetCode); // use clearTimeout to kill the other setTimeout
      decrement(); // fire another setTimeout instead.
    }
  }
}

export default FeedbackButton;
=======
  // this function is for calling a dispatch to increment the number the pulseData
  const onSubmit = () => {
    currTime = new Date();
    // compute the time difference and pass it with the action
    timeDifference = timeDiffToMinutes(startTime, currTime);
    dispatch({
      type: 'INCREMENT',
      time: timeDifference
    });
  };

  return (
    <button onClick={ () => { onSubmit(); } }>Feedback</button>
  );
};
// get the start time of the presentation in the redux store
const mapStatetoProps = (state) => {
  return {presentationStartTime: state.presentationStartTime};
};

export default connect(mapStatetoProps, dispatch => {
  return {dispatch};
})(FeedbackButton);
>>>>>>> Getting rebase done.
