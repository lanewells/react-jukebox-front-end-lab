const TrackDetail = (props) => {
  if (!props.selected)
    return (
      <div>
        <h1>No details for this track</h1>
      </div>
    )

  return (
    <div>
      <p>Song Selected:</p>
      <h2>{props.selected.title}</h2>
      <h3>Artist: {props.selected.artist}</h3>
      <h3>Duration in Seconds: {props.selected.duration}</h3>
      <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
      <button onClick={() => props.handleRemoveTrack(props.selected._id)}>
        Delete
      </button>
      <button onClick={() => props.playTrack(props.selected)}>Play</button>
    </div>
  )
}

export default TrackDetail
