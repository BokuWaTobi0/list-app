import './about.styles.css';
import ReactSvg from '../../assets/react-svg.svg';
import ViteSvg from '../../assets/vite-svg.svg';
import FirebaseSvg from '../../assets/firebase-svg.svg';
import FontAwesomeSvg from '../../assets/font-awesome-svgr.svg';
import NetlifySvg from '../../assets/netlify-svg.svg';
import { useRef } from 'react';

const About=()=>{

    const eyesRef = useRef({});

    function handleEyesBlink(){
        for(let eye in eyesRef.current){
            eyesRef.current[eye].classList.add('open');
        }
        eyesRef.current['left'].style.animation='scaler-1 1.8s ease-in-out'
        eyesRef.current['right'].style.animation='scaler-2 1.8s ease-in-out'
        setTimeout(()=>{
            for(let eye in eyesRef.current){
                eyesRef.current[eye].classList.remove('open')
            }
            eyesRef.current['left'].style.animation=''
             eyesRef.current['right'].style.animation=''
        },2000)
    }

    return (
        <div className='about-div'>
            <p className='description'>Our Shopping List App, a simple and efficient tool designed to help you organize and manage your shopping needs. </p>
            <h5>Developed By</h5>
            <div className='dev-info'>
                <img src="https://github.com/vishwa-radhya.png" alt="dev-gh-img" width={180} onClick={handleEyesBlink} />
                <a href="https://github.com/vishwa-radhya/list-app" target='_blank'>
                <p><i className='fa-brands fa-square-github'></i><span>Vishwa Radhya</span></p>
                </a>
            </div>
            <h5>Powered By</h5>
            <div className='powered-by'>
                <div>
                    <a href="https://react.dev/" target='_blank'><img src={ReactSvg} alt="react" /></a>
                    <a href="https://vitejs.dev/" target='_blank'><img src={ViteSvg} alt="vite" /></a>
                </div>
                <div>
                    <a href="https://www.netlify.com/" target='_blank'><img src={NetlifySvg} alt="netlify" /></a>
                </div>
            </div>
            <h5>Utilities</h5>
            <div className='powered-by'>
                <div>
                    <a href="https://firebase.google.com/" target='_blank'><img src={FirebaseSvg} alt="firebase" /></a>
                    <a href="https://fontawesome.com/" target='_blank'><img src={FontAwesomeSvg} alt="font-awesome" /></a>
                </div>
            </div>
            <div className="eyes left" ref={el=>eyesRef.current['left']=el}></div>
            <div className="eyes right" ref={el=>eyesRef.current['right']=el}></div>
        </div>
    )
}
export default About;