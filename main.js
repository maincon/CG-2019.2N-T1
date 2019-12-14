var faceDict = {
    0: "/Skins/Bins.png",
    1: "/Skins/Braulio.png",
    2: "/Skins/Denio.png",
    3: "/Skins/Emilio.png",
    4: "/Skins/Fernando.png",
    5: "/Skins/Guilherme.png",
    6: "/Skins/Marco.png"
}

var scene = new THREE.Scene();
var aspect = window.innerHeight / window.innerWidth
var width = 16;
var height = 9;
var camera = new THREE.OrthographicCamera( - width, width, height, - height, 1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xE5E5E5)
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

var movSpeed = 1;
var direction = new THREE.Vector2(movSpeed, 0);

var snakeTrail = [];
var tailLength = 5;
var end = false;

var randomPlace = function (value){
    return Math.floor(Math.random()*value) * (Math.floor(Math.random()*2) == 1 ? 1 : -1);
}

var generateProfessor = function (x, y, professor) {
    let geometry = new THREE.PlaneBufferGeometry(1, 1);
    let texture = new THREE.TextureLoader().load(faceDict[professor]);
    let material = new THREE.MeshBasicMaterial({map: texture, transparent: true, side: THREE.DoubleSide});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.rotation.z = Math.PI;
    return mesh;
}

var randomProfessor = function () {
    return Math.floor(Math.random()*Object.keys(faceDict).length);
}

var reset = function () {
    while(snakeTrail.length > 5) {
        scene.remove(snakeTrail.shift());
    }
    for(i = 0; i < snakeTrail.length; i ++){
        snakeTrail[i].position.x = 0 - i;
        snakeTrail[i].position.y = 0;
    }
    end = false;   
}

var update = function () {
    setTimeout( function() {
        requestAnimationFrame( update );
    }, 1000 / 10 );

    var oldHead = snakeTrail[snakeTrail.length - 1];
    var newHead = snakeTrail.shift();
    oldHead.material.map = newHead.material.map
    oldHead.material.needsUpdate = true;
    newHead.material.map = headTexture;
    newHead.material.needsUpdate = true;

    newHead.position.x = oldHead.position.x + direction.x;
    newHead.position.y = oldHead.position.y + direction.y;
    
    snakeTrail.push(newHead);
    for(i = snakeTrail.length - 2; i > -1; i--){
        if(newHead.position.distanceTo(snakeTrail[i].position) < 1){
            end = true;
            break;
        }
    }
    if (end) {
        reset();
    }
    if (newHead.position.distanceTo(appleProfessor.position) < 1){
        newTail = generateProfessor(snakeTrail[0].x + direction.x, snakeTrail[0].y + direction.y, appleId);
        scene.add(newTail)
        snakeTrail.unshift(newTail);
        appleId = randomProfessor();
        scene.remove(appleProfessor);
        appleProfessor = generateProfessor(randomPlace(width), randomPlace(height), appleId);
        scene.add(appleProfessor);
    }
    if (newHead.position.x <= -width-1){
        newHead.position.x = width;
    } else if (newHead.position.x >= width+1){
        newHead.position.x = -width;
    } else if (newHead.position.y <= -height-1){
        newHead.position.y = height;
    } else if (newHead.position.y >= height+1){
        newHead.position.y = -height;
    }

    renderer.render( scene, camera );
};

var appleId = randomProfessor()
var appleProfessor = generateProfessor(randomPlace(width), randomPlace(height), appleId);
var headTexture = new THREE.TextureLoader().load(faceDict[4]);
scene.add(appleProfessor);
var initialize = function (){
    for(i = 0; i < tailLength; i++){
        professor = generateProfessor(0 - i, 0, randomProfessor());
        professor.rotation.z = Math.PI;
        snakeTrail.unshift(professor);
        scene.add(professor)
    }
    update();
}

initialize();

document.addEventListener("keydown", function(e){
    switch(e.key){
        case "ArrowDown":
            if(!direction.y) direction.set(0, -movSpeed);
        break;
        case "ArrowUp":
            if(!direction.y) direction.set(0, movSpeed);
        break;
        case "ArrowLeft":
            if(!direction.x) direction.set(-movSpeed, 0);
        break;
        case "ArrowRight":
            if(!direction.x) direction.set(movSpeed, 0);
        break;
    }
});