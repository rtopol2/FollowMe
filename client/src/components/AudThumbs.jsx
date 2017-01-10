import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import $ from 'jquery';

// AudThumbs allows audience members to give feedback when the presenter enables to 'thumbs' poll component.
  // This allows the presenter to see how each audience member feels about a specific topic/question.

//  TODO:  Find graphics

class AudThumbs extends Component {

  componentDidMount () {
    let socket = this.props.socket;
    let userId = this.props.userId;
    let currentTopicId;
    let thumbsDisplayed = false;

    // render Thumbs box for the given topic when event 'open thumbs' is fired
    socket.on('open thumbs', function (topicId, topic) {
      currentTopicId = topicId;
      $('#thumbTopic').text(topic); // set h1 to current topic
      $('#Thumbs').fadeIn('slow'); // fade in Thumbs feature
      thumbsDisplayed = true; // store that Thumbs are being displayed
    });

    $('.thumbButton').click(function (e) {
      // get direction of thumb that was chosen
      let thumbChoice = $(this)[0].id;
      // emit choice to the server / presenter / database
      socket.emit('thumb clicked', currentTopicId, userId, thumbChoice);
      // fade out component and set 'displayed' property to false in the store
      $('#Thumbs').fadeOut(1);
      thumbsDisplayed = false; // store that thumbs box has been closed
    });

    // Trigger thumbs box to close if still open
    socket.on('close thumbs', function () {
      if (thumbsDisplayed) $('#Thumbs').fadeOut('fast');
      thumbsDisplayed = false; // store that thumbs box has been closed
    });
  }

  render () {
    return (
      <div id="Thumbs" style={{display: 'none'}}>
        <h1 id="thumbTopic"></h1>
        <button className='thumbButton' id='up'>Thumbs up!</button>
        <button className='thumbButton' id='side'>Thumbs to the side!</button>
        <button className='thumbButton' id='down'>Thumbs Down!</button>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.activeLecture.socket,
    userId: state.user.id
  };
};

export default connect(mapStateToProps)(AudThumbs);
