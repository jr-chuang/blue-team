import * as THREE from 'three';

export default class SPRITES {

  static init ( STATE ) {

    STATE.spriteMaterials = [];

    const map = new THREE.TextureLoader().load( './resources/bullets/bullet.png' );
    STATE.spriteMaterials.push(
      new THREE.SpriteMaterial( { map: map, color: 0xffffff } )
    );

    STATE.sprites = [];

  }

  static update ( STATE, deltaTime ) {

    for (var i = 0; i < STATE.sprites.length; i++) {

      STATE.sprites[i].obj.position.z -= 100*deltaTime;
      STATE.sprites[i].obj.position.x += STATE.sprites[i].dir*deltaTime;

    }

  }

  static fireBullet ( STATE ) {

    let s = {
      obj: new THREE.Sprite( STATE.spriteMaterials[0] ),
      dir: (Math.random()*20 - 10)
    };
    s.obj.scale.set(7, 7, 1);
    s.obj.position.set(
      STATE.player.obj.position.x,
      STATE.player.obj.position.y,
      STATE.player.obj.position.z
    );

    STATE.sprites.push(s);
    STATE.scene.add(s.obj);

  }

}
