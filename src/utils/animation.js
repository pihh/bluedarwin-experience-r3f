import gsap from "gsap";
import { wait } from "./wait";

export const TextRevealAnimation = function(props){ 
     const direction = props.direction == "leave" ? -1 : 1
     const timeout = props.timeout || 10;
     const y = props.y || direction == 1 ? 0 : 10 ;
     const opactiy = props.opactiy || direction == 1 ? 1 : 0;
     const stagger = props.stagger || direction == 1 ? 0.005 : -0.005
     let hasResolved = false;
     return new Promise(res => {
         wait(timeout, () => {
             gsap.to(`${props.selector} .wrapper`, {
                 y: y,
                 opacity: opactiy,
                 stagger: stagger,
                 ease: "power2",
                 onUpdate:function(e){
                    if(direction == -1 && this.progress() > 0.1 && !hasResolved){
                        hasResolved = true;
                        res()
                    }
                 },
                 onComplete: function () {
                     res()
                 },
             }); 
         }) 
   });
 }