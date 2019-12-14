var scene = new THREE.Scene();
var aspect = window.innerHeight / window.innerWidth
var width = 15;
var height = 15;
var camera = new THREE.OrthographicCamera( - width, width, height, - height, 1, 1000 );
camera.position.z = 5;
var right = true;
var left = false;
var up = false;
var down = false;

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
var movSpeed = 1;
var direction = new THREE.Vector2(movSpeed, 0);

var snakeTrail = [];
var tailLength = 5;
var end = false;

var update = function () {
    setTimeout( function() {
        requestAnimationFrame( update );
    }, 1000 / 10 );

    var newHead = snakeTrail.shift();
    var oldHead = snakeTrail[snakeTrail.length - 1];

    newHead.position.x = oldHead.position.x + direction.x;
    newHead.position.y = oldHead.position.y + direction.y;
    
    snakeTrail.push(newHead);

    for(var i = snakeTrail.length - 2; i > -1; i--){
        console.log(newHead.position.distanceTo(snakeTrail[i].position));
        if(newHead.position.distanceTo(snakeTrail[i].position) < 1){
            end = true;
            break;
        }
    }
    if(end){
        console.log('Nani')
    }

    if (newHead.position.x <= -width){
        newHead.position.x = width;
    } else if (newHead.position.x >= width){
        newHead.position.x = -width;
    } else if (newHead.position.y <= -height){
        newHead.position.y = height;
    } else if (newHead.position.y >= height){
        newHead.position.y = -height;
    }


    renderer.render( scene, camera );
};

var initialize = function (){
    for(i = 0; i < tailLength; i++){
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x -= i * 1
        snakeTrail.push(mesh);
        scene.add(mesh)
    }
    update();
}

initialize();


document.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowDown":
            if(!up) direction.set(0, -movSpeed);
            right = false;
            left = false;
            down = true;
        break;
        case "ArrowUp":
            if(!down) direction.set(0, movSpeed);
            right = false;
            left = false;
            up = true;
        break;
        case "ArrowLeft":
            if(!right) direction.set(-movSpeed, 0);
            up = false;
            down = false;
            left = true;
        break;
        case "ArrowRight":
            if(!left) direction.set(movSpeed, 0);
            up = false;
            down = false;
            right = true;
        break;
    }
});