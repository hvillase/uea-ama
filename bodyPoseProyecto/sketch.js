let bodyPose;
let video;
let poses = [];
let connections;
let painting;

function preload() {
  // Carga bodyPose modelo
  // Flipped: true solo para efecto espejo
  bodyPose = ml5.bodyPose({flipped:true});
}

function mousePressed() {
  console.log(poses);
}

function setup() {
  // lienzo de pantalla
  createCanvas(windowWidth, windowHeight);
  // creamos una capa para gráficos con dimensión de pantalla
  painting = createGraphics(windowWidth, windowHeight);
  painting.clear();
    // Crea el video y lo esconde
    // Flipped true solo para tener efecto espejo
    video = createCapture(VIDEO, {flipped:true});
    video.size(windowWidth, windowHeight);
    video.hide();
    // Comienza a detectar poses en la webcam de video
    bodyPose.detectStart(video, gotPoses);
    // Toma la información de conexión del esqueleto
    connections = bodyPose.getSkeleton();
  }

  // función de llamado para cuando el modelo retgresa datos de pose
function gotPoses(results) {
  // Guarda el resultado del modelo en una variable global
  poses = results;
}

function draw() {
  // cuadros interactivos
  painting.noStroke();
  painting.fill(255, 0, 0, 0.5);
  //painting.rect(width/2, 0, width/2, height/2);
  
  // cuadro izquierda arriba
  painting.fill(0, 0, 255, 0.5);
  //painting.rect(0, 0, width/2, height/2);
  
  // cuadro abajo derecha
  painting.fill(0, 255, 0, 0.5);
  //painting.rect(0, height/2, width/2, height/2);

  // cuadro abajo izquierda
  painting.fill(255, 255, 0, 0.5);
  // painting.rect(width/2, height/2, width/2, height/2);
  

  // Mostrar el video, si lo comentamos se hace una retroalimentación
  image(video, 0, 0, width, height);

    // Dibuja las conexiones del esqueleto, lo comentamos para no verlo
    /*for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
      for (let j = 0; j < connections.length; j++) {
        let pointAIndex = connections[j][0];
        let pointBIndex = connections[j][1];
        let pointA = pose.keypoints[pointAIndex];
        let pointB = pose.keypoints[pointBIndex];
              // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }*/

    // Iterar através de todas las poses
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];
          // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      //let keypoint = pose.keypoints[j];
      // variables para muñecas izquierda y derecha según gráfica de ML5
      let index1 = pose.keypoints[9];
      let index2 = pose.keypoints[10];
            // Only draw a circle if the keypoint's confidence is greater than 0.1
            /*if (keypoint.confidence > 0.1) {
              fill(0, 255, 0);
              noStroke();
              circle(keypoint.x, keypoint.y, 10);
            }*/
           //mano 1
            if (index1.confidence > 0.1) {
              fill(0, 255, 0);
              noStroke();
              circle(index1.x, index1.y, 10);
            }
            // figura 1
            if(index1.x < width/2 && index1.y < height/2){
              fill(0, 255, 255);
              rect(0, (height/2)-130, 130, 130);
            }
            //mano 2
            if (index2.confidence > 0.1) {
              fill(0, 255, 0);
              noStroke();
              circle(index2.x, index2.y, 10);
            }
            // figura 2
            if(index2.x > width/2 && index2.y < height/2){
              fill(255, 255, 0);
              //rect(width/2, (height/2)-130, 130, 130);
              textSize(100);
              text('interacción', width/2, (height/2)-130);
            }
          }
        }
        // aquí colocamos la capa para dibujar hecha con createGraphics
       image(painting, 0, 0); 
      }
