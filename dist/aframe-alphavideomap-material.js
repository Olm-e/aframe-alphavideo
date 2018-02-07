if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.')
}



AFRAME.registerShader('alphavideomap', {
  schema: {
    src: {type: 'map'},
    alpha: {type 'map'},
    transparent: {default: true, is: 'uniform'}
  },

  init: function (data) {
    var videoTexture = new THREE.VideoTexture(data.src)
    var alphaTexture = new THREE.VideoTexture(data.alpha)
    videoTexture.minFilter = THREE.LinearFilter
    alphaTexture.minFilter = THREE.LinearFilter
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        alpha: {
          type: 't',
          value: alphaTexture
        },
        texture: {
          type: 't',
          value: videoTexture
        }
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    })
  },

  update: function (data) {
    this.material.alpha = data.alpha
    this.material.src = data.src
    this.material.transparent = data.transparent
  },

  vertexShader: [
    'varying vec2 vUv;',
    'void main(void)',
    '{',
    'vUv = uv;',
    'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    'gl_Position = projectionMatrix * mvPosition;',
    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform sampler2D texture;',
    'uniform sampler2D alpha;',
    'varying vec2 vUv;',
    'void main(void)',
    '{',
    'vec3 tColor = texture2D( texture, vUv ).rgb;',
    'vec3 aColor = texture2D( color, vUv).rgb;',
    'float a = (length(aColor);',
    'gl_FragColor = vec4(tColor, a);',
    '}'
  ].join('\n')
})

AFRAME.registerShader('alphavideopremul', {
  schema: {
    src: {type: 'map'},
    transparent: {default: true, is: 'uniform'}
  },

  init: function (data) {
    var videoTexture = new THREE.VideoTexture(data.src)
    videoTexture.minFilter = THREE.LinearFilter
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        texture: {
          type: 't',
          value: videoTexture
        }
      },
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    })
  },

  update: function (data) {
    this.material.src = data.src
    this.material.transparent = data.transparent
  },

  vertexShader: [
    'varying vec2 vUv;',
    'void main(void)',
    '{',
    'vUv = uv;',
    'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
    'gl_Position = projectionMatrix * mvPosition;',
    '}'
  ].join('\n'),

  fragmentShader: [
    'uniform sampler2D texture;',
    'varying vec2 vUv;',
    'void main(void)',
    '{',
    'vec3 tColor = texture2D( texture, vUv ).rgb;',
    'float a = (length(tColor);',
    'gl_FragColor = vec4(tColor, a);',
    '}'
  ].join('\n')
})


