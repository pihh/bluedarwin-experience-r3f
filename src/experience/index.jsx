import { OrbitControls, ScrollControls } from "@react-three/drei";
import { PageHtml } from "./Page/PageHtml";


export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <ScrollControls pages={3} damping={0.25}>
        <PageHtml />
      </ScrollControls>
    </>
  );
};
