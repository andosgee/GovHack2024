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
                document.getElementById('light-bulb').addEventListener('click', () => {
                        setLightMode(prevMode => !prevMode)

                        if (document.getElementById('light-bulb').classList.contains('light-bulb-svg')) {
                                //REMOVE LIGHT MODE CLASSES - ADD DARK MODE CLASSES
                                document.getElementById('light-bulb').classList.remove('light-bulb-svg')
                                document.getElementById('light-bulb').classList.add('dark-bulb-svg')
                                document.getElementById('skip-to-data-button').classList.add('dark-skip-to-data-button')
                                document.body.classList.add('dark-body')
                                document.getElementById('nav').src = { darkNavImg };
                                document.getElementById('nav').key = { darkNavImg };
                                document.querySelectorAll('.action-statement').forEach(x => {
                                        x.classList.add('dark-action-statement')
                                })

                        } else {
                                //REMOVE DARK MODE CLASSES - ADD LIGHT MODE CLASSES
                                document.getElementById('light-bulb').classList.remove('dark-bulb-svg')
                                document.getElementById('light-bulb').classList.add('light-bulb-svg')
                                document.getElementById('skip-to-data-button').classList.remove('dark-skip-to-data-button')
                                document.body.classList.remove('dark-body')
                                document.getElementById('nav').src = { lightNavImg };
                                document.getElementById('nav').key = { darkNavImg };
                                document.querySelectorAll('.action-statement').forEach(x => {
                                        x.classList.remove('dark-action-statement')
                                })
                        }
                });
        }, []);

        return (
                <nav id="nav">
                        <Link to="/">
                        <img className="nav-logo" src={lightMode ? lightNavImg : darkNavImg} alt="GenEn Nav Logo" />
                        </Link>
                        <Lightbulb />
                </nav>
        )
}