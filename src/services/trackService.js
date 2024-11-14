import axios from "axios"
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`

const index = async () => {
  try {
    const res = await axios.get(BASE_URL)
    console.log(res)
    return res.data
  } catch (err) {
    console.log("Error finding tracks", err)
  }
}

const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData)
    return res.data
  } catch (err) {
    console.log("Error creating track", err)
    throw err
  }
}

const updateTrack = async (id, formData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, formData)
    return res.data
  } catch (err) {
    console.log("Error updating track", err)
    throw err
  }
}

const deleteTrack = async (trackId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${trackId}`)
    return res.data
  } catch (err) {
    console.log("Error deleting track", err)
    throw err
  }
}

export { index, create, updateTrack, deleteTrack }
