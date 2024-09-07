import '../styles/light_mode/intro.css'
import '../styles/dark_mode/dark_intro.css'
import placeholder from '../assets/images/comparative-eroi-energy.png'
import Asterisk from '../assets/aterisk'
// import { Link } from 'react-router-dom'


export default function Intro() {
    return (
        <>
            <p className="action-statement">Climate change is <strong>unavoidable</strong>, New Zealands energy  </p>
            <p className="action-statement">Moving to renewable energy sources is essential in promoting a healthier environment for future generations</p>
            <div className="hero-div">
                <img className="hero-graph" src={placeholder} />
                <div className="hero-text-container">
                    <p className="hero-header">New Zealand Energy</p>
                    <p className="hero-body"> heres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case studyheres what the data shows case study case study case study</p>
                </div>
            </div>
            <p className="intro-goals-header">New Zealand's Energy Goals - Target 2050</p>
            <div className="goals-parent-container">
                <div className="goals-child-container">
                    <Asterisk />
                    <p className="goals-sub-header">98.3% Renewable Energy</p>
                    <p className="goals-text">
                        62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production
                        62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production62.1
                        Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production
                    </p>
                </div>
                <div className="goals-child-container">
                    <Asterisk />
                    <p className="goals-sub-header">62.1 Terrawatts Per Hour Production</p>
                    <p className="goals-text">
                        62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production
                        62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production62.1
                        Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production62.1 Terrawatts Per Hour Production
                    </p>
                </div>
                <div className="goals-child-container">
                    <Asterisk />
                    <p className="goals-sub-header">700 Megawatts of extra storage capacity for peak demands</p>
                    <p className="goals-text">700 Megawatts of extra storage capacity for peak demands
                        700 Megawatts of extra storage capacity for peak demands700 Megawatts of extra storage capacity for peak demands
                        700 Megawatts of extra storage capacity for peak demands700 Megawatts of extra storage capacity for peak demands
                    </p>
                </div>
            </div>
        </>
    )
}


{/* <p className="user-choice-header">I am a....</p>
            <div className="user-choice-div">
                <Link to="/consumer">
                    <button className="user-button">Consumer</button>
                </Link>
                <button className="user-button">Business</button>
                <button className="user-button">Producer</button>
            </div> */}