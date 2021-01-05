import React, { useEffect, useState } from 'react'
import AudioButton from '../components/audio-button.js'
import styles from './splash.module.scss'
import styled, { keyframes } from 'styled-components'

import filmInfo from '../films/films.json'

const noOfSplashVids = filmInfo.splashVideos

function getRandom(number, previousNumber) {
  let randomNumber = Math.floor(Math.random() * number) + 1
  if (randomNumber === previousNumber) {
    return getRandom(number, randomNumber)
  } else return randomNumber
}

const expand = pos => keyframes`
  from {
    clip-path: circle(0% at ${pos.x}px ${pos.y}px)
  } to {
    clip-path: circle(200% at ${pos.x}px ${pos.y}px)
  }
  `

const ExpandingDiv = styled.div`
  position: absolute;
  top: 0;
  animation: ${props => expand(props.animationCenter)}
    ${props =>
      props.animationCenter.x === 0 && props.animationCenter.y === 0
        ? 0
        : 500}ms
    linear;
  animation-fill-mode: forwards;
`

export default function Splash(props) {
  const [index, setIndex] = useState(getRandom(noOfSplashVids))

  function next() {
    if (index === noOfSplashVids) {
      setIndex(1)
    } else {
      setIndex(index => index + 1)
    }
  }

  return (
    <ExpandingDiv animationCenter={props.animationCenter}>
      <div className={styles.splash} style={{ zIndex: props.onTop ? 90 : 0 }}>
        <video
          type="video/mp4"
          className={styles.bgVid}
          src={`/splashvids/bg_${index}.mp4`}
          autoPlay={true}
          onEnded={next}
          preload="auto"
          muted={true}
          poster={`/splashvids/bg_poster_${index}.png`}
          playsInline={true}
          width="100%"
          height="100%"
        ></video>

        <div className={styles.inner}>
          <video
            type="video/mp4"
            className={styles.mainVid}
            src={`/splashvids/fg_${index}.mp4`}
            autoPlay={true}
            preload="metadata"
            muted={true}
            poster={`/splashvids/fg_poster_${index}.png`}
            playsInline={true}
          ></video>
          <AudioButton
            className={styles.audioButton}
            getIconPos={props.getIconPos}
            isVisible={props.isVisible}
          />
          {/* generic tags can't be inside video elements, audio tag had to be moved out */}
        </div>
      </div>
    </ExpandingDiv>
  )
}
