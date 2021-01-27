var hypnoticBall, database;
var position;

function setup(){
    database = firebase.database();

    createCanvas(500,500);

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    var hypnoticBallPosition = database.ref('ball/position');
    //Everytime a change in the database values of position (reference) happens, the readPosition function is called.
    //If there is any error in reading the values in the database, the showError function is called.
    hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();

    }
   
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:position.x + x,
        y:position.y + y
    })
}


function readPosition(data){
    //In the readPosition function we can read the position of the value in the database
    position = data.val();
    //We assign the x and y values of the ball position in the database to the ball sprite
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
}

function showError(){
    console.log("Error in writing to the database");
}