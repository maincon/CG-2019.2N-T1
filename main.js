var scene = new THREE.Scene();
var aspect = window.innerHeight / window.innerWidth
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#e5e5e5")
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

var light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(10, 0, 25)
scene.add(light);

var geometry = new THREE.PlaneGeometry(0.4, 0.4);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );
var direction = new THREE.Vector3(0, 0, 0);

var update = function () {
    requestAnimationFrame( update );
    plane.position.x = plane.position.x + direction.x
    plane.position.y = plane.position.y + direction.y
    renderer.render( scene, camera );
};

update();

document.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowDown":
            direction.set(0, -0.1, 0)
        break;
        case "ArrowUp":
            direction.set(0, 0.1, 0)
        break;
        case "ArrowLeft":
            direction.set(-0.1, 0, 0)
        break;
        case "ArrowRight":
            direction.set(0.1, 0, 0)
        break;
    }
});