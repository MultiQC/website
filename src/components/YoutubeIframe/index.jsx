import classnames from 'classnames';
import React from "react";
import PropTypes from '../../utils/PropTypes';
import * as styles from './YoutubeIframe.module.css';

const YoutubeIframe = ({ id, listId, className }) => {
  let videoSource = `https://www.youtube.com/embed/${id}`;

  if (listId) {
    videoSource += `?list=${listId}`;
  }

  return (
    <div className={classnames(styles.wrapper, className, 'box')}>
      <iframe
        src={videoSource}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.video}
        title="Seqera Video"
      />
    </div>
  );
};

YoutubeIframe.propTypes = {
    id: PropTypes.string.isRequired,
    listId: PropTypes.string,
};

YoutubeIframe.defaultProps = {
    listId: '',
};

export default YoutubeIframe;
