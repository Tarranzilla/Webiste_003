const world = Globe({})(document.getElementById("globe-container"))
    .width("1000")
    .height("1000")
    .backgroundColor("#00000000")
    .globeImageUrl("assets/imgs/globe/earth-blue-marble.jpg")
    .bumpImageUrl("assets/imgs/globe/earth-topology.png")
    .pointsData([])
    .pointColor("color");

// Auto-rotate
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.35;
world.controls().enableZoom = false;

const CLOUDS_IMG_URL = "assets/imgs/globe/clouds.png";
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.1; // deg/frame

new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(
            world.getGlobeRadius() * (1 + CLOUDS_ALT),
            75,
            75
        ),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
    );

    world.scene().add(clouds);

    (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
    })();
});
