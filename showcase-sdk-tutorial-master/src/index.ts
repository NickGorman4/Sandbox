const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const key = '96296aaaf1964968ad92128f7469bd99';

// declare this file is a module
export {};

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}





showcase.addEventListener('load', async function() {
  let sdk;
  try {
    sdk = await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.2');
  }
  catch(e) {
    console.error(e);
    return;
  }

  console.log('%c  Hello Bundle SDK! ', 'background: #333333; color: #00dd00');
  console.log(sdk);

  //This allows for what we add to actually be seen
  const lights = await sdk.Scene.createNode();
  lights.addComponent('mp.lights');
  lights.start();

  //Necessary for adding objects. This is what will actually
  //put our 3D object into our space
  const modelNode = await sdk.Scene.createNode();
  const littleGuy = await sdk.Scene.createNode();


  // Store the fbx component since we will need to adjust it in the next step.
  //Object is stored inside of the project
  //The url could be some internet address where it is stored
  //this leads to a potted plant
  const fbxComponent = modelNode.addComponent(sdk.Scene.Component.FBX_LOADER, {
    url: './fbx/69-textures/01Alocasia_fbx.FBX',
  });
  const fella = littleGuy.addComponent(sdk.Scene.Component.GLTF_LOADER, {
    url: 'https://gitcdn.link/repo/mrdoob/three.js/dev/examples/models/gltf/CesiumMan/glTF/CesiumMan.gltf',
  });


  //Color in hex, not actually applied to the plant yet, I think i need to add to the texture method?
  fbxComponent.inputs.color = '#ff0000'

  //Adjsut the scale of the plant. I do not know any better way than tuning right now
  fbxComponent.inputs.localScale = {
    x: 0.0009,
    y: 0.0009,
    z: 0.0009
  };

  fella.inputs.localScale = {
    x: .5,
    y: .5,
    z: .5
  };

  fella.inputs.color = '#ff0000'





  //Location of the plant. X is "left and right", Y is "up and down", Z is "Forward and back"
  // Relative to "spawn" location of the viewer. If you move those relations will not hold
  modelNode.obj3D.position.set(-5,-.01,1);

  //Rot is for the ultra-impressive cosine rotation
  //the .start() is what will actually add the object inside the node to scene
  var  rot = 0;
  modelNode.start();
  littleGuy.start();


  //This runs constantly to allow for animation. I am still unfamiliar with this
  //It is called recursively though, so I think anything after this will not be reached
  // The above is FALSE, it will read past this function. But I think it is still recursive because
  //If a console.log() statement is put inside it is logged hundreds of times
  const tick = function() {
    requestAnimationFrame(tick);
    modelNode.obj3D.rotation.y = Math.cos(rot)*3.14;
    littleGuy.obj3D.position.set(-6.9 - Math.cos(rot*1.1)*3.14/8, -.01, 1.25);
    rot = rot + .02;
  }
  tick();



});

