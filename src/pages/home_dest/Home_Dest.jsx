import React from 'react'
import './home_dest.css'
import mouImage from './mou.jpeg';
import beachImage from '../../pics/goa1.jpg'
import histImage from '../../pics/hist.jpeg'

const Home_Dest = () => {
  return (
    <div>
        <section id="dest">
        <div className="destinations">
            <h1 className="heading" >Destinations</h1>
            <a href="/homedest_mou" className="card">
            <div >
                <img src={mouImage} alt="Travel City"/>
                <p className='card-name'>Mountains</p>
            </div>
            </a>
            <a href="/homedest_beach" className="card">
            <div >
                <img src={beachImage} alt="Nature Mountains"/>
                <p className='card-name'>Beaches</p>
            </div>
            </a>
            <a href="/homedest_rel" className="card">
            <div >
                <img src={histImage} alt="Historical"/>
                <p className='card-name'>Historical</p>
            </div>
            </a>
        </div>
    </section>
    </div>
  )
}

export default Home_Dest