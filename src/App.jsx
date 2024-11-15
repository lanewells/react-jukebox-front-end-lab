import { useState, useEffect } from "react"
import * as trackService from "./services/trackService"
import TrackList from "./components/TrackList"
import TrackDetail from "./components/TrackDetail"
import TrackForm from "./components/TrackForm"
import NowPlaying from "./components/NowPlaying"

const App = () => {
  const [trackList, setTrackList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isTrackPlaying, setIsTrackPlaying] = useState(false)

  useEffect(() => {
    const getTracks = async () => {
      try {
        const tracks = await trackService.index()

        if (tracks.error) {
          throw new Error(tracks.error)
        }
        setTrackList(tracks)
      } catch (error) {
        console.log(error)
      }
    }
    getTracks()
  }, [])

  const handleFormView = (track) => {
    if (!track.title) setSelected(null)
    console.log("Selected track is: ", track.title)
    setIsFormOpen(!isFormOpen)
  }

  const updateSelected = (track) => {
    setSelected(track)
  }

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData)

      if (newTrack.error) {
        throw new Error(newTrack.error)
      }

      setTrackList([newTrack, ...trackList])
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTrack = async (trackId, formData) => {
    try {
      console.log("Updating track with ID:", trackId)
      console.log("Form data:", formData)

      const updatedTrack = await trackService.updateTrack(trackId, formData)

      if (updatedTrack.error) {
        throw new Error(updatedTrack.error)
      }

      console.log("Updated track:", updatedTrack)

      setTrackList((prevTrackList) =>
        prevTrackList.map((track) =>
          track._id === trackId ? updatedTrack : track
        )
      )

      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      console.error("Failed to update track:", error)
    }
  }

  const playTrack = (track) => {
    setSelected(track)
    setIsTrackPlaying(true)

    console.log(isFormOpen)
    console.log("Playing track with title:", track.title)
  }

  const handleRemoveTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId)

      if (deletedTrack.error) {
        throw new Error(deletedTrack.error)
      }

      setTrackList((prevTrackList) =>
        prevTrackList.filter((track) => track._id !== trackId)
      )
      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TrackList
        trackList={trackList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
          selected={selected}
        />
      ) : (
        <TrackDetail
          selected={selected}
          handleFormView={handleFormView}
          handleRemoveTrack={handleRemoveTrack}
          playTrack={playTrack}
          isTrackPlaying={isTrackPlaying}
        />
      )}
      <NowPlaying
        selected={selected}
        playTrack={playTrack}
        isTrackPlaying={isTrackPlaying}
      />
    </>
  )
}

export default App
