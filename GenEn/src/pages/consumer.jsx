import '../styles/light_mode/consumer.css'
import Nav from '../components/nav'
import ConsumerIntro from '../components/consumer/consumer_intro'

export default function Consumer(){
    return (
        <>
          <Nav />
          <ConsumerIntro />
          <iframe src="https://bcis303.gladiatorsas.me/gh/" style={{width:"80%", height: "75vh", margin: "5vh 0 0 10%"}} title="description"></iframe> 
        </>
    )
}