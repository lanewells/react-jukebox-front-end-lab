const NowPlaying = (props) => {
  if (props.selected && props.isTrackPlaying === true) {
    return (
      <div>
        <h3>Now Playing: </h3>
        <h1>{props.selected.title}</h1>
      </div>
    )
  }
  return <h3>Play a Track</h3>
}

export default NowPlaying
