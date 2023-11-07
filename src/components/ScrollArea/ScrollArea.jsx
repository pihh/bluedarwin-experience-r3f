import './styles.scss'
import { useRef ,useEffect} from "react"
import { globalState, useGlobalState } from "../../services/state/state.service";


export const ScrollArea = function(props){
    // State management
    const [state, setState] = useGlobalState(globalState);

    // References
    const ref = useRef()

    useEffect(() => {
      
       onScroll({target:ref.current})
    },[])

    const onScroll = (e) => {
        
        state.top.current = e?.target?.scrollTop || 0
      }
    

    return (
        <section id="page-scroll-area" ref={ref} onScroll={onScroll}>
            {props.children}
        </section>
    )
}