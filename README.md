## aframe-alphavideo-material

Alpha video effects in [A-Frame](https://aframe.io). Provided a "src" video, and (option) a second "alpha" video, this material will 
render the src transparent from the lightness of the src or alpha video image.

It permit many effects and transitions with videos, including 360 or composite screens, backgrounds, interface animation, etc...

lame fork of the ChromaKey AFrame component of Nick Warner 
https://github.com/nikolaiwarner/aframe-chromakey-material


### REM/Todo



 - only works for video textures at the moment > Add option for basic images as alpha source in the shader 
 - need to be packaged correctly for aframe components, or replaced by proper alpha support in basic material



### API

|Shader | Property | Description | 
|-------| -------- | ----------- | 
|alphavideomap | src      | base video texture |
| " | alpha    | alpha video texture | 
|alphavideopremul | src | base video texture |


### Installation

#### Browser

 use by directly including the [files](dist) alongside your scene :

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
  <script src="aframe-alphavideomap-material.min.js"></script>
</head>

<body>
  <a-scene>
    <a-assets>
      <video id="video" src="video.mp4" loop autoplay muted />
      <video id="alphavideo" src="alphavideo.mp4" loop autoplay muted />
    </a-assets>
    <a-entity material="shader: alphavideomap; src: #video; alpha: #alphavideo" geometry="primitive: box"></a-entity>
    <a-entity material="shader: alphavideopremul; src: #video" geometry="primitive: box" position="3 0 3"></a-entity>
  </a-scene>
</body>
```


#### Credits
All goes to prior coders 
lame fork of chromakey component by Nick Warner https://github.com/nikolaiwarner/aframe-chromakey-material 
A big thanks to the prior research on chromakey shaders in WebGL and Three.js by:
https://github.com/makc/makc.github.io/tree/master/three.js/chromakey
https://github.com/hawksley/Threex.chromakey
