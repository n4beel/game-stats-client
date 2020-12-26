import React from 'react'
import './main.css'
import Navbar from './Navbar'

const Main = () => {
  return (
    <div className='main1'>
      <nav className='bg'>
        <p>Hello</p>
        <p>Power</p>
        <p>Kills</p>
      </nav>
      <div className='p-5'>
        <p className='center'>Battle Statistics</p>

        <div className='bl'>
          <p>Highest Power</p>
          <p>Number</p>
        </div>
        <div className='bl'>
          <p>Victory</p>
          <p>Number</p>
        </div>
        <div className='bl'>
          <p>Defeat</p>
          <p>Number</p>{' '}
        </div>
        <div className='bl'>
          <p>Dead</p>
          <p>Number</p>{' '}
        </div>
        <div className='bl'>
          <p>Scout Times</p>
          <p>Number</p>{' '}
        </div>
        <p className='center'>Resources Statistics</p>

        <div className='bl'>
          <p>Resources Gathered</p>
          <p>Number</p>{' '}
        </div>
        <div className='bl'>
          <p>Resource Assistance</p>
          <p>Number</p>{' '}
        </div>
        <div className='bl'>
          <p>Alliance Help Times</p>
          <p>Number</p>{' '}
        </div>
      </div>
    </div>
  )
}

export default Main
