var scene = new THREE.Scene();
var aspect = window.innerHeight / window.innerWidth
var width = 15;
var height = 15;
var camera = new THREE.OrthographicCamera( - width, width, height, - height, 1, 1000 );
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

var fernando_face_url = "fernando_face.png"
var geometry = new THREE.PlaneBufferGeometry(1, 1);
var texture = new THREE.TextureLoader().load(fernando_face_url);
var material = new THREE.MeshBasicMaterial({map: texture, transparent: true, side: THREE.DoubleSide});
var snakeHead = new THREE.Mesh( geometry, material );
var movSpeed = 0.2
var direction = new THREE.Vector2(0, 0);

scene.add(snakeHead)

var snakeTrail = []
var tailLength = 5

var initialize = function (){
    for(i = 0; i < tailLength; i++){
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x -= i * 1
        snakeTrail.push(mesh);
        scene.add(mesh)
    }
}

// initialize();

var update = function () {
    requestAnimationFrame( update );

    if (snakeHead.position.x <= -width){
        snakeHead.position.x = width;
    } else if (snakeHead.position.x >= width){
        snakeHead.position.x = -width;
    } else if (snakeHead.position.y <= -height){
        snakeHead.position.y = height;
    } else if (snakeHead.position.y >= height){
        snakeHead.position.y = -height;
    }

    snakeHead.position.x = snakeHead.position.x + direction.x
    snakeHead.position.y = snakeHead.position.y + direction.y

    renderer.render( scene, camera );
};

update();

document.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowDown":
            direction.set(0, -movSpeed);
        break;
        case "ArrowUp":
            direction.set(0, movSpeed);
        break;
        case "ArrowLeft":
            direction.set(-movSpeed, 0);
        break;
        case "ArrowRight":
            direction.set(movSpeed, 0);
        break;
    }
});