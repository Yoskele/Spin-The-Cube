import {useState, useRef, useEffect} from 'react';
import './App.css';
import question from './images/question.png';
import happySun from './images/happySun.png'

function App() {
  const cubeContainer = useRef(false)
  const [spinCube, setSpinCube] = useState(false);
  const topLid = useRef(null);
  const sunImage = useRef(null);

  useEffect(() => {
    if(spinCube){
      cubeContainer.current.style.animation = 'spin 0.5s linear infinite';
      // After 3 sec open the lid.
      setTimeout(() => {
        cubeContainer.current.style.animation = 'none';
        let drop = 50;
        let lidInterval = setInterval(() => {
          // Remove the Lid.
          topLid.current.style.transform = `rotateX(90deg) translateZ(${drop}px)`
          drop++
          if(drop === 200){
            clearInterval(lidInterval)
            topLid.current.style.display = 'none';
            // Display the Sun Image.
            let x = 0;
            let increase = setInterval(() => {
              sunImage.current.style.opacity = `0.${x}`;
              sunImage.current.style.bottom = `${x*x}px`;
              x++;
              if(x === 10){
                clearInterval(increase)
                sunImage.current.style.animation = 'spin 2s linear infinite';
              }
            },150)
          }
        },10)
      },3000)
    }
  })
  return (
    <div className="App">
      <div className="cube-container">
        <div className="cube" ref={cubeContainer}>
          <div className='image-holder'>
            <div className='image-wrapper'>
              <img  ref={sunImage} src={happySun} alt="" />
            </div>
          </div>
          <div className="cube-face cube-face-front">
            <img className="questionMark" src={question} alt="" />
          </div>
          <div className="cube-face cube-face-back">
            <img className="questionMark" src={question} alt="" />
          </div>
          <div className="cube-face cube-face-left">
          <img className="questionMark" src={question} alt="" />
          </div>
          <div className="cube-face cube-face-right">
          <img className="questionMark" src={question} alt="" />
          </div>
          <div className="cube-face cube-face-top" ref={topLid}></div>
          <div className="cube-face cube-face-bottom" ></div>
        </div>
      </div>
      { !spinCube ? (
        <div>
          <button
            className='btn'
            onClick={() => setSpinCube(!spinCube)}>
              Spin
          </button>
        </div>
        ) : (<p></p>)
      }
    </div>
  );
}

export default App;

