import fetch from 'node-fetch'

export default function handler(req, res) {
  if (req.method === 'POST') {
    requestValidaton(res, req.body)
  } else {
    res.statusCode = 200
    res.send("405 Method Not Allowed")
  }
}

function requestValidaton(res, input) {
  const requestAddress = encodeURI(`${input.address}, ${input.city}, ${input.state} ${input.postalCode}`)

    let request = fetch(`https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${requestAddress}&benchmark=9&format=json`)

    request.then(data => {
      data.json().then(response => {
        res.json(response)
      })
    })
}