import Lightbulb from '../assets/light.jsx'
import '../styles/light_mode/nav.css'
import '../styles/dark_mode/dark_nav.css'
import { useEffect, useState } from 'react';
import darkNavImg from '../assets/images/GenEn_Logo_Dark.png'
import lightNavImg from '../assets/images/GenEn_Logo_Light.png'
import { Link } from 'react-router-dom';

export default function Nav() {
        const [lightMode, setLightMode] = useState(true)

        useEffect(() => {
                const lightBulb = document.getElementById('light-bulb');
                const statsButton = document.getElementById('stats-button');
        
                const handleLightBulbClick = () => {
                    setLightMode(prevMode => !prevMode);
        
                    if (lightBulb.classList.contains('light-bulb-svg')) {
                        // REMOVE LIGHT MODE CLASSES - ADD DARK MODE CLASSES
                        lightBulb.classList.remove('light-bulb-svg');
                        lightBulb.classList.add('dark-bulb-svg');
                        document.getElementById('skip-to-data-button').classList.add('dark-skip-to-data-button');
                        document.body.classList.add('dark-body');
                        document.querySelectorAll('.action-statement').forEach(x => {
                            x.classList.add('dark-action-statement');
                        });
                    } else {
                        // REMOVE DARK MODE CLASSES - ADD LIGHT MODE CLASSES
                        lightBulb.classList.remove('dark-bulb-svg');
                        lightBulb.classList.add('light-bulb-svg');
                        document.getElementById('skip-to-data-button').classList.remove('dark-skip-to-data-button');
                        document.body.classList.remove('dark-body');
                        document.querySelectorAll('.action-statement').forEach(x => {
                            x.classList.remove('dark-action-statement');
                        });
                    }
                }
        
                const handleStatsButtonClick = () => {
                        window.scrollBy({top: window.innerHeight*2, behavior: 'smooth'})
                }
        
                if (lightBulb) {
                    lightBulb.addEventListener('click', handleLightBulbClick);
                }
        
                if (statsButton) {
                    statsButton.addEventListener('click', handleStatsButtonClick);
                }
        
                return () => {
                    if (lightBulb) {
                        lightBulb.removeEventListener('click', handleLightBulbClick);
                    }
        
                    if (statsButton) {
                        statsButton.removeEventListener('click', handleStatsButtonClick);
                    }
                };
            }, []);

        return (
                <nav id="nav">
                        <Link to="/">
                        <img className="nav-logo" src={lightMode ? lightNavImg : darkNavImg} alt="GenEn Nav Logo" />
                        </Link>
                        <div className="buttons-container">
                        <p className="buttons" id="stats-button"> Stats </p>
                        <Link to="/solar-calculator" style={{ textDecoration: 'none' }}>
                        <p className="buttons"> Solar Calculator </p>
                        </Link>
                        <Lightbulb />
                        </div>
                </nav>
        )
}