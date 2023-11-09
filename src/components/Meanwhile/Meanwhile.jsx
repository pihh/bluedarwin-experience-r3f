import { Text } from "@react-three/drei"

const fontBold = "/fonts/Inter/Inter-Bold.woff"
export const Meanwhile = function(props){
    return (
        <group position={[-10,0, -15]} rotation={[0,Math.PI/2,0]}>
            <spotLight position={[0,3,0]} intensity={100} />
            {/* <directionalLight position={[-10, 0, 40]} intensity={200} />  */}
            <Text font={fontBold} color="white" fontSize={1.5} letterSpacing={-0.025} anchorY="top" anchorX="left" lineHeight={0.8} position={[-3, 2.5, 0.01]}>
            In the
            </Text>
            <Text font={fontBold} color="white" fontSize={1.5} letterSpacing={-0.025} anchorY="top" anchorX="left" lineHeight={0.8} position={[-3, 1.3, 0.01]}>
            Meanwhile
            </Text>
        </group>
    )
}