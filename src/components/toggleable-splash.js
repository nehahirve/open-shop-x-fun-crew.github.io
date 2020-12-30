import React, { useState, useEffect } from 'react'
import LogoButton from '../components/logo-button'
import Splash from '../components/splash'
import Info from '../components/info'

import useDelayedUnmounting from '../hooks/use-delayed-unmounting.js'

export default function ToggleableSplash(props) {
  const [pos, setPos] = useState({ x: null, y: null })
  const [stickyPos, setStickyPos] = useState({ x: 0, y: 0 })
  const [audioIconPos, setAudioIconPos] = useState({
    x: null,
    y: null,
    w: null,
    h: null,
  })
  const [overlapping, setOverlapping] = useState(false)

  const [state, show, hide] = useDelayedUnmounting()
  const [onTop, setOnTop] = useState(false)

  function toggleState() {
    state === 'mounted' ? hide() : show()
    state === 'mounted' || state === 'unmounted'
      ? setOnTop(!onTop)
      : console.log()
  }

  function getIconPos(e, icon) {
    let iconPos = icon.getBoundingClientRect()
    setAudioIconPos(
      Object.assign(
        audioIconPos,
        {
          x: iconPos.x,
          y: iconPos.y,
          w: iconPos.width,
          h: iconPos.height,
        },
        {}
      )
    )
  }

  function toggleSplashVisible() {
    props.toggleSplashVisible()
    setStickyPos({ x: pos.x, y: pos.y })
    toggleState()
  }

  function updatePos(e) {
    setPos({ x: e.clientX, y: e.clientY })
    if (audioIconPos) {
      if (
        e.clientX > audioIconPos.x &&
        e.clientX < audioIconPos.x + audioIconPos.w &&
        e.clientY > audioIconPos.y &&
        e.clientY < audioIconPos.y + audioIconPos.h
      ) {
        setOverlapping(true)
      } else setOverlapping(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', updatePos)
    return () => window.removeEventListener('mousemove', updatePos)
  }, [])

  return (
    <div className="splash">
      <LogoButton
        onClick={toggleSplashVisible}
        pos={pos}
        splashVisible={props.splashVisible}
        stickyPos={stickyPos}
        overlapping={overlapping}
      />
      {state !== 'unmounted' && <Info onTop={onTop} stickyPos={stickyPos} />}
      {state !== 'mounted' && (
        <Splash
          getIconPos={getIconPos}
          onTop={!onTop}
          stickyPos={{ x: 0, y: 0 }}
        />
      )}
    </div>
  )
}
