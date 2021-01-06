import React from 'react'
import ReactPlayer from 'react-player/vimeo'

import styles from './player.module.scss'
import ToggleableFilm from './toggleable-film'

export default function Player(props) {
  return (
    <div className={styles.playwrapper}>
      <ReactPlayer
        url={props.url}
        playing={true}
        muted={true}
        volume={0}
        controls={true}
        width="100%"
        height="90%"
        className={styles.player}
      />
      <div className={styles.closebtn} onClick={props.togglePlayer}>
        &#10005;
      </div>
      <div className={styles.info}>
        <p className={styles.caption}>{props.title}</p>
        <p className={styles.caption}>{props.description}</p>
      </div>
    </div>
  )
}
