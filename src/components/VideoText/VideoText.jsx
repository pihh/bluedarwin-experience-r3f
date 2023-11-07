import { Text } from "@react-three/drei";
import { useEffect } from "react";
import { useState } from "react";

export function VideoText(props) {
    const [video] = useState(() =>
      Object.assign(document.createElement("video"), {
        src: "/textures/videos/drei.mp4",
        crossOrigin: "Anonymous",
        loop: true,
        muted: true,
      })
    );
    useEffect(() => void video.play(), [video]);
    return (
      <Text
        font="/fonts/Inter/Inter-Bold.woff"
        fontSize={3}
        letterSpacing={-0.06}
        {...props}
      >
        drei
        <meshBasicMaterial toneMapped={false}>
          <videoTexture
            attach="map"
            args={[video]}
            encoding={THREE.sRGBEncoding}
          />
        </meshBasicMaterial>
      </Text>
    );
  }
  

  