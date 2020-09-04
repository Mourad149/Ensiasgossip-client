import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.myreference1 = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comments !== this.props.comments) {
      this.myreference1.current.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }
  render() {
    const comms =
      this.props.comments !== undefined
        ? this.props.comments.map((comment, index) => {
            if (this.props.id === comment.id) {
              return (
                <Comment
                  key={comment.index}
                  commentName={comment.name}
                  commentImage={comment.profilImage}
                  comment={comment.comment}
                />
              );
            }
          })
        : null;
    return (
      <div style={{ overflowY: 'scroll' }}>
        {comms}
        <div style={{ float: 'left', clear: 'both' }} ref={this.myreference1} />
      </div>
    );
  }
}
export default Comments;
