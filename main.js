var scene = new THREE.Scene();
var aspect = window.innerHeight / window.innerWidth
var camera = new THREE.OrthographicCamera( -window.innerWidth /64, window.innerWidth /64, window.innerHeight /64, -window.innerHeight / 64, 0.1, 1000 )
camera.position.z = 5

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#e5e5e5")
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    camera.updateProjectionMatrix();
})


var geometry = new THREE.PlaneGeometry(1, 1);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

var update = function () {
    requestAnimationFrame( update );

    renderer.render( scene, camera );
};

update();

document.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowDown":
            plane.position.y -= 0.1
        break;
        case "ArrowUp":
            plane.position.y += 0.1
        break;
        case "ArrowLeft":
            plane.position.x -= 0.1
        break;
        case "ArrowRight":
            plane.position.x += 0.1
        break;
    }
});