import gsap from "gsap";
import { SplitText } from "@cyriacbr/react-split-text";


export const PanelLine = function(props){
    const selector = props.selector;

    return (
        <SplitText
          LetterWrapper={({ letterIndex, children }) => (
            <span className={`${props.selector} wrapper`}>
              {children}
            </span>
          )}
        >
          {props.children}
        </SplitText>
    )
}