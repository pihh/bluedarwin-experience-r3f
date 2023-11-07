import { useEffect } from 'react';
import './styles.scss';
import { useState } from 'react';


export const Splash = function(){
    
 
    const [opacity,setOpacity] = useState(1)
    const [display,setDisplay] = useState("flex")
    useEffect(()=>{
        setTimeout(()=>{
            setOpacity(0);
            setTimeout(()=>{
            setDisplay("none")
            })
        },100)
    },[])
    return (<>
    <div id="splash-screen" style={{opacity:opacity,display:display}}>
        <div>
            <em>
                "Transformation should be easy"
            </em>
            <div>
                <h1>Automate <br/><span className='text-stroke'>
                    Everything
                    </span>
                    </h1>
            </div>
        </div>
    </div>
    </>)
}