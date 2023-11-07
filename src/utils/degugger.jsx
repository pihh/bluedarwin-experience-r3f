import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";
import { useRef } from "react";
import * as THREE from "three";
/*
const setUseControls = function(name,ref,config={},defaultConfig={},returnsMesh=false){
  config = {
    ...defaultConfig,
    ...config
  }
  let controls = {}
  if(!config.hideControls){
    for(let key of Object.keys(config)){
      if(key == "hideControls") continue;
      controls[key] = {}
      if(typeof config[key] == "object"){

      }else{
        controls[key].value = config[key]
        controls[key].onChange = function(v){
          if(cnfig)
        }
      }
    }
  }
}

*/
export const ExperienceDebugger = (props) => {
  const t = useThree()

  const config = props.config || {};
  let spotLightRef = useRef();
  let directionalLightRef = useRef();
  let ambientLightRef = useRef();

  if (config.camera) {
    const camera = t.camera;
    config.camera.position = config.camera.position || { x: 0, y: 0, z: 0 };
    config.camera.rotation = config.camera.rotation || { x: 0, y: 0, z: 0 };
    config.camera.fov = config.camera.fov || 15;

    useControls(config.camera.name || "Camera", {
      position: {
        x: config.camera.position.x || 0,
        y: config.camera.position.y || 0,
        z: config.camera.position.z || 0,
        onChange: (v) => {
          
          
            camera.position.copy(v);
       
          
        },
      },
      // rotation: {
      //   x: config.camera.rotation.x || 0,
      //   y: config.camera.rotation.y || 0,
      //   z: config.camera.rotation.z || 0,
      //   onChange: (v) => {
          
          
      //       camera.rotation.copy(v);
       
          
      //   },
      // },
      fov: {
        value: config.camera.fov || 15,
        onChange: (v) => {
          camera.fov = v;
        },
      },
      // lookAt: {
      //   x: config.camera.lookAt.x || 0,
      //   y: config.camera.lookAt.y || 0,
      //   z: config.camera.lookAt.z || 0,
      //   onChange: (v) => {
      //     if (config.camera.ref?.current) {
      //       config.camera.ref.current.lookAt(Object.values(v));
      //     }
      //   },
      // },
      /*
      rotation: {
        x: config.camera.rotation.x || 0,
        y: config.camera.rotation.y || 0,
        z: config.camera.rotation.z || 0,
        onChange: (v) => {
          config.camera.ref.rotation.copy(v);
        },
      },
      */
    });
  }
  if (config.spotLight) {
    let visible = config.spotLight.visible || true;
    let intensity = config.spotLight.intensity || 10;
    let color = config.spotLight.color || "white";
    let position = {
      x: config.spotLight?.position?.x || 0,
      y: config.spotLight?.position?.y || 10,
      z: config.spotLight?.position?.z || 0,
    };
    if (config.spotLight.hideControls) {
      if (spotLightRef.current) {
        spotLightRef.current.visible = visible;
        spotLightRef.current.position.copy(position);
        spotLightRef.current.color = new THREE.Color(color);
        spotLightRef.current.intensity = intensity;
      }
    } else {
      if (config.spotLight.position.callback) {
        config.spotLight.position.callback = function (v) {
          spotLightRef.current.position.copy(v);
        };
      }
      useControls("Spot Light", {
        visible: {
          value: config.spotLight.visible || visible,
          onChange: (v) => {
            spotLightRef.current.visible = v;
          },
        },
        position: {
          x: config.spotLight.position.x || 0,
          y: config.spotLight.position.y || 10,
          z: config.spotLight.position.z || 0,
          onChange: (v) => {
            spotLightRef.current.position.copy(v);
          },
        },
        color: {
          value: color,
          onChange: (v) => {
            spotLightRef.current.color = new THREE.Color(v);
          },
        },
        intensity: {
          value: intensity,
          onChange: (v) => {
            spotLightRef.current.intensity = v;
          },
        },
      });
    }
  }
  if (config.ambientLight) {
    useControls("Ambient Light", {
      visible: {
        value: true,
        onChange: (v) => {
          ambientLightRef.current.visible = v;
        },
      },
      color: {
        value: config.ambientLight.color || "white",
        onChange: (v) => {
          ambientLightRef.current.color = new THREE.Color(v);
        },
      },
      intensity: {
        value: config.ambientLight.intensity || 0.5,
        onChange: (v) => {
          ambientLightRef.current.intensity = v;
        },
      },
    });
  }
  if (config.directionalLight) {
    if (config.directionalLight.position.callback) {
      config.directionalLight.position.callback = function (v) {
        directionalLightRef.current.position.copy(v);
      };
    }
    useControls("Directional Light", {
      visible: {
        value: true,
        onChange: (v) => {
          directionalLightRef.current.visible = v;
        },
      },
      position: {
        x: config.directionalLight.position.x || 0,
        y: config.directionalLight.position.y || 10,
        z: config.directionalLight.position.z || 0,
        onChange: (v) => {
          directionalLightRef.current.position.copy(v);
        },
      },
      color: {
        value: config.directionalLight.color || "white",
        onChange: (v) => {
          directionalLightRef.current.color = new THREE.Color(v);
        },
      },
      intensity: {
        value: config.directionalLight.intensity || 10,
        onChange: (v) => {
          directionalLightRef.current.intensity = v;
        },
      },
    });
  }

  if (config.fog) {
    useControls("Fog", {
      visible: {
        value: true,
        onChange: (v) => {
          console.log({ fogRef: config.fog.ref });
          config.fog.ref.current.visible = v;
        },
      },
      color: {
        value: config.fog.color || "black",
        onChange: (v) => {
          // console.log({ fogRef: config.fog.ref });
          config.fog.ref.current.color = new THREE.Color(v);
        },
      },
      far: {
        value: config.fog.far || 10,
        onChange: (v) => {
          // console.log({ fogRef: config.fog.ref });
          config.fog.ref.current.far = v;
        },
      },
      near: {
        value: config.fog.near || 10,
        onChange: (v) => {
          // console.log({ fogRef: config.fog.ref });
          config.fog.ref.current.near = v;
        },
      },


    });
  }

  return (
    <>
      <Suspense>
        {config.spotLight ? <spotLight ref={spotLightRef} /> : ""}
        {config.directionalLight ? (
          <directionalLight ref={directionalLightRef} />
        ) : (
          ""
        )}
        {config.ambientLight ? <ambientLight ref={ambientLightRef} /> : ""}
      </Suspense>
    </>
  );
};
