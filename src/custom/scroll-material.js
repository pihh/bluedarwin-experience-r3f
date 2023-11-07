import { ShaderMaterial, Color } from "three"
import { extend } from "@react-three/fiber"
//     #if (hasTexture == 1.0) gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
class ScrollMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `uniform float scale;
      uniform float shift;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec3 pos = position;
        pos.y = pos.y + ((sin(uv.x * 3.1415926535897932384626433832795) * shift * 1.5) * 0.125);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform sampler2D uTexture;
      uniform bool hasTexture;
      uniform float shift;
      uniform float scale;
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;

      void main() {
   
        float angle = 1.55;
        vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scale*0.1) + vec2(0.5, 0.5);
        vec2 offset = shift / 50.0 * vec2(cos(angle), sin(angle));
        vec4 cr = texture(uTexture, p + offset);
        vec4 cga = texture(uTexture, p);
        vec4 cb = texture(uTexture, p - offset);
        
    
        if (hasTexture == true)  gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
        else gl_FragColor = vec4(color, opacity);
      }`,
      uniforms: {
        uTexture: { value: null },
        hasTexture: { value: false },
        scale: { value: 0 },
        shift: { value: 1 },
        uTime: { value: 0 },
        opacity: { value: 1 },
        color: { value: new Color("white") }
      }
    })
    // this.toneMapped = false
    // console.log(this)
  }

  set scale(value) {
    this.uniforms.scale.value = 0
    // this.uniforms.scale.value = (Math.abs(value)/100) +0.01
  }

  get scale() {
    return this.uniforms.scale.value
  }

  set shift(value) {
    this.uniforms.shift.value = value
  }

  get shift() {
    return this.uniforms.shift.value
  }

  set uTexture(value) {
   
    this.uniforms.uTexture.value = value
    this.uniforms.hasTexture.value = !!value

  }

  get uTexture() {
    return this.uniforms.uTexture.value
  }

  get color() {
    return this.uniforms.color.value
  }

  get opacity() {
    return this.uniforms.opacity.value
  }

  set uTime(value) {
    if (this.uniforms) this.uniforms.uTime.value = value
  }

  get uTime() {
    return this.uniforms.uTime.value
  }

  set opacity(value) {
    if (this.uniforms) this.uniforms.opacity.value = value
  }
}

extend({ ScrollMaterial })
