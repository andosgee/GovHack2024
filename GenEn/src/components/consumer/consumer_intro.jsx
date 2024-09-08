import introImg from '../../assets/images/FreePik-Solar-Panel.jpg'

export default function ConsumerIntro() {
    return (
        <div className="consumer-intro-container">
            <img className="consumer-intro-img" src={introImg}/>
                <h1 className="consumer-intro-header">Help power Aotearoa: Check if Solar works for you!</h1>
        </div>
    )
}