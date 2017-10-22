import * as THREE from 'three';

export default class ENTITIES {

  static init ( STATE ) {

    let geo = new THREE.BoxBufferGeometry( 20, 20, 20 );
    let mat = new THREE.MeshLambertMaterial( { color: 0xff0000 } );

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 5; j++) {

        let obj = new THREE.Mesh( geo, mat );
        obj.position.set( -250 + i*50, 0, -500 + j*50 );
        STATE.entities.push(obj);

      }
    }


    // Instantiate entities.

    // Add to scene.

    for (var i = 0; i < STATE.entities.length; i++) {
      STATE.scene.add( STATE.entities[i] );
    }

  }

  static update ( STATE, deltaTime ) {

    // Update

    for (var i = 0; i < STATE.entities.length; i++) {
      STATE.entities[i].position.z += 25*deltaTime;
    }

    // Check interactions

  }

}
