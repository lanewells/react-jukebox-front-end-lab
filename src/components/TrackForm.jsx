import { useState } from "react"

const TrackForm = (props) => {
  const initialState = {
    title: "",
    artist: "",
    duration: 0
  }
  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmitForm = (evt) => {
    evt.preventDefault()
    if (props.selected) {
      props.handleUpdateTrack(formData._id, formData)
    } else {
      props.handleAddTrack(formData)
    }
    setFormData(initialState)
  }

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />

        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <button type="submit">
          {props.selected ? "Update Track" : "Add New Track"}
        </button>
      </form>
    </div>
  )
}

export default TrackForm
