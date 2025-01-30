import React from 'react'
import './home_tmate.css'
import tmate from '../../pics/asd.jpg'

const Home_Tmate = () => {
  return (
    <div>
        <section id="tmate">
        <div className="destinations">
            <h1 className='heading'>GroupTravelHub</h1>
            <div style={{display: 'flex', gap: '5rem', justifyContent:'center'}}>
                {/* <!-- Left Section: Cards --> */}
                <div className="left-card">
                    <div className="card" style={{textAlign: 'center'}}>
                        <img src={tmate} alt="Travel City" style={{width: '100%', borderRadius:'8px'}}/>
                        <p className='img_name'>GroupTravelHub</p>
                    </div>
    
                    {/* <!-- Buttons Section --> */}
                    <div className="button-group">
                        <a href="http://localhost:3002/">

                            <button className="btn join-btn">Join</button>
                        </a>
                        
                        <a href="../grouphub/group.html">
                            <button className="btn create-btn">Create</button>
                        </a>
                        
                    </div>
                </div>
    
                {/* <!-- Right Section: Description --> */}
                <div className="description">
                    <p><b>GroupTravelHub</b> is your ultimate travel companion, bringing explorers together to create unforgettable adventures! Whether you're joining an existing group or starting your own, our platform connects you with like-minded travelers to make every journey extraordinary. With our exciting Group Travel feature, you can easily join groups by entering a unique code and unlock amazing tools like collaborative itinerary planning to craft the perfect trip, a smart shared expenses tracker to keep finances stress-free, and a real-time chat room for seamless communication and bonding with your group. Say goodbye to travel hassles and hello to unforgettable memories – your next adventure starts here with GroupTravelHub!</p>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Home_Tmate