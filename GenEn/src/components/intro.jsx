import '../styles/light_mode/intro.css'
import '../styles/dark_mode/dark_intro.css'
import LineChart from './graphs/CapacityVsDemand'
import Asterisk from '../assets/aterisk'


export default function Intro() {
    return (
        <>
            <p className="action-statement">Climate change is <strong>unavoidable</strong></p>
            <p className="action-statement">Moving to renewable energy sources is essential in promoting a healthier environment for future generations</p>
            <div className="hero-div">
                <LineChart />
                <div className="hero-text-container">
                    <p className="hero-header">New Zealand Energy</p>
                    <p className="hero-body"> 
                    New Zealand is currently facing a critical energy crisis. A shortage of gas supply, which is used balance high demand for power when hydro, wind, and solar sources are insufficient, has combined with very low hydro lake levels. This has sent wholesale electricity prices sky rocketing, making New Zealand's prices among the highest in the developed world.Government agencies are prioritizing energy capacity of the grid as their top focus, and analyzing New Zealand’s energy needs growth from the immediate future to 2050, as well as the changing nature of energy sources and associated consumption.
                    </p>
                    <p className="hero-body">With climate change impacting weather patterns, New Zealand's reliance on hydro generation could lead to continued supply uncertainty. To address this, we need to better predict available generation using AI capabilities and incentivize current energy providers to build more capacity. A comprehensive solution using modern AI is essential in this era.By investing in these advanced technologies and diversifying our energy sources, we can create a more stable and sustainable energy future for New Zealand. This approach will ensure that we meet our energy needs while keeping costs manageable and reducing our reliance on non-renewable sources.</p>
                </div>
            </div>
            <div className="goals">
            <p className="intro-goals-header">New Zealand's Energy Goals - Target 2050</p>
            <div className="goals-parent-container">
                <div className="goals-child-container">
                    <Asterisk />
                    <p className="goals-sub-header">98.3% Renewable Energy</p>
                    <p className="goals-text">
                    Aims for 96.2% to 98.3% of its power generation to come from renewable energy sources by 2050 from the current 80%.
                    </p>
                </div>
                <div className="goals-child-container">
                    <Asterisk />
                    <p className="goals-sub-header">62.1 Terrawatts Per Hour Production</p>
                    <p className="goals-text">
                    Aims for a target of 62.1 Terrawatt hours to meet the total demand for 2050 from the current 42.4 TWh as of 2024
                    </p>
                </div>
                <div className="goals-child-container">
                    <Asterisk />
                    <p className="goals-sub-header">15.7 TWh Commercial Demand</p>
                    <p className="goals-text">700 Megawatts of extra storage capacity for peak demands
                    Aims for a target of 15.7 Terrawatt hours to meet the Commercial demand for 2050 from the current 9.6TWh as of 2024
                    </p>
                </div>
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