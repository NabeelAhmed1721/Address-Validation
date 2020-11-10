import Head from 'next/head'
import { Page, Text, Input, Button, Spacer } from '@geist-ui/react'
import { useState, useRef } from 'react'

function HomePage() {

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const address =  useRef(null)
  const city =  useRef(null)
  const state =  useRef(null)
  const postalCode =  useRef(null)

  const validate = () => {
    setLoading(true)
    const input = {
      address: address.current.value,
      city: city.current.value,
      state: state.current.value,
      postalCode: postalCode.current.value
    }

    fetch('/api/validate', {
      method: 'post',
      body: JSON.stringify(input),
      headers: {
		    'Content-type': 'application/json; charset=UTF-8'
	    }
    }).then(data => {
      data.text().then(res => {
        setResult(JSON.parse(res).result.addressMatches)
        setLoading(false)
      })
    })
  }

  return (
    <>
    <Head>
      <title>Address Validator</title>
    </Head>
    <Page size="mini" style={{paddingTop: 18}}>
      <h2>Address Validator</h2>
      <h5>Made by: <a target="_blank" rel='noreferrer' href="https://github.com/NabeelAhmed1721">Nabeel Ahmed</a></h5>
      <i>Don't worry you're in safe hands. This application won't save your data. I promise :)</i>
      <Text blockquote>
        Uses the <a target="_blank" rel='noreferrer' href="https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html">United States' Census Bureau API.</a> Also please be patient for a response; it can take a second or two!
      </Text>
      <h4>Enter Address:</h4>
      <Input ref={address} width="100%" placeholder="Address" />
      <Spacer y={1} />
      <div style={{display: 'flex'}}>
      <Input ref={city} width="100%" placeholder="City/Town" />
      <Spacer x={1} />
      <Input ref={state} width="100%" placeholder="State" />
      <Spacer x={1} />
      <Input ref={postalCode} width="100%" placeholder="Postal Code" />
      </div>
      <Spacer y={2} />
      <Button loading={loading} onClick={validate}>Validate</Button>
      {
        result != null ? (
          result.length >= 1 ? (
          <>
            <Spacer y={2} />
            <h4>Result:</h4>
            <Text blockquote>
              Address is <b>real</b>!
            </Text>
          </>
          ) :
          <>
            <Spacer y={2} />
            <h4>Result:</h4>
            <Text blockquote>
              Address is <b>not real</b>!
            </Text>
          </>
        )
        : null
      }
    </Page>
    </>
  )
}

export default HomePage