import { useState } from 'react'
import "./index.css"
import houseImage from "../public/housing.webp"
import axios from "axios"
import crossIcon from "../public/png-white-round-close-x-icon-701751695038867fc9yrjqtql-removebg-preview.png"
function App() {
  const [area, setArea] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [parking, setParking] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [mainroad, setMainroad] = useState("")
  const [guestroom, setGuestroom] = useState("")
  const [basement, setBasement] = useState("")
  const [hotwaterheating, setHotwaterheating] = useState("")
  const [airconditioning, setAirconditioning] = useState("")
  const [predict, setPredict] = useState(null)
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!area || !bedrooms || !parking || !bathrooms || !mainroad || !guestroom || !basement || !hotwaterheating || !airconditioning) {
      alert("All numeric fields are required.")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post("https://housingpredictorbackend.onrender.com/predict", {
        area: Number(area),
        bedrooms: Number(bedrooms),
        parking: Number(parking),
        bathrooms: Number(bathrooms),
        mainroad: mainroad.toLowerCase(),
        guestroom: guestroom.toLowerCase(),
        basement: basement.toLowerCase(),
        hotwaterheating: hotwaterheating.toLowerCase(),
        airconditioning: airconditioning.toLowerCase()
      })
      setLoading(false)

      setPredict(response.data.price)
    } catch (error) {
      
      console.error("Error predicting price:", error)
      setLoading(false)
      alert("Prediction failed. Check console for details.")
      
    }
  }

  return (
    <>
      <div className="outer">
        <div className={predict ? "result" : "none"} >
          <div className="hedaing">
            <h3>Predicted Price of house</h3>
            <img src={crossIcon} alt="" onClick={() => setPredict(null)}/>
          </div>
          <h1>USD: {predict}</h1>
        </div>

        <div className="container">
          <div className="left">


            <h1>House Price Predictor </h1>
            <img src={houseImage} alt="houseImage" />

          </div>

          <form onSubmit={submitHandler}>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area in sq ft" />
            <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="Number of Bedrooms" />
            <input type="number" value={parking} onChange={(e) => setParking(e.target.value)} placeholder="Number of parking area" />
            <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Number of bathroom" />

            <select value={mainroad} onChange={(e) => setMainroad(e.target.value)} >
              <option value="" disabled selected>Is there are mainroad near house</option>
              
              <option value="no">no</option>
              <option value="yes">yes</option>
            </select>

            <select value={guestroom} onChange={(e) => setGuestroom(e.target.value)}>
               <option value="" disabled selected>Is there are guest room.</option>
              <option value="no">no</option>
              <option value="yes">yes</option>
            </select>

            <select value={basement} onChange={(e) => setBasement(e.target.value)}>
               <option value="" disabled selected>Is there are basement of house</option>
              <option value="no">no</option>
              <option value="yes">yes</option>
            </select>

            <select value={hotwaterheating} onChange={(e) => setHotwaterheating(e.target.value)}>
              <option value="" disabled selected>is there are hot water heating system.</option>
              <option value="no">no</option>
              <option value="yes">yes</option>
            </select>

            <select value={airconditioning} onChange={(e) => setAirconditioning(e.target.value)}>
              <option value="" disabled selected>Is there are air condtiong is available</option>
              <option value="no">no</option>
              <option value="yes">yes</option>
            </select>

            <button type="submit">{loading?"Loading":"Predict"}</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default App
