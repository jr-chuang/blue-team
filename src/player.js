import * as THREE from 'three';
import SPRITES from './sprites.js';

export default class PLAYER {

  static init ( STATE ) {

    // Instantiate all player properties (eg. acceleration, state, etc.)

    let loader = new THREE.ObjectLoader( STATE.loader );
    loader.load( 'resources/player/player.json', ( obj ) => {
      STATE.player = {
        obj: obj,
        nextBullet: 0
      };

      STATE.player.obj.scale.set(3, 3, 3);
      STATE.player.obj.rotation.y = -Math.PI*0.5;
      STATE.scene.add( STATE.player.obj );
    }, (xhr) => { // onProgress
      if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    }, (xhr) => { // onError
      console.log('Error loading WORLD.');
    });

  }

  static update ( STATE, deltaTime ) {

    if (STATE.player == null) return;

    // left
    if (STATE.keyboard.getKey(37) === 1) {
      STATE.player.obj.position.x -= 150 * deltaTime;
    }

    // Up
    if (STATE.keyboard.getKey(38) === 1) {
      STATE.player.obj.position.z -= 150 * deltaTime;
    }

    // Right
    if (STATE.keyboard.getKey(39) === 1) {
      STATE.player.obj.position.x += 150 * deltaTime;
    }

    // Down
    if (STATE.keyboard.getKey(40) === 1) {
      STATE.player.obj.position.z += 150 * deltaTime;
    }

    STATE.player.nextBullet -= deltaTime;

    if (STATE.keyboard.getKey(32) === 1) {
      if (STATE.player.nextBullet >= 0) return;
      SPRITES.fireBullet(STATE);
      STATE.player.nextBullet = 0.1;
    }

    // Use the above the modify player state.

    // Check for collisions, respond appropriately.

    // Adjust camera as necessary.
    /*
    STATE.camera.position.set(
      STATE.player.obj.position.x,
      STATE.player.obj.position.y + 150,
      STATE.player.obj.position.z + 50
    );
    */

  }

}
