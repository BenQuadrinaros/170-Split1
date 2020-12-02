var cnt = 0;
class Bee extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, frame, initX, initY) {
        super(scene, initX, initY, texture, frame);
        //vectors rooted @ (0, 0)

        this.velocity = new Phaser.Math.Vector2(Math.random(), Math.random());
        //speed at which boids move
        this.acceleration = new Phaser.Math.Vector2();
        this.position = new Phaser.Math.Vector2(initX, initY)
        //limit boid vector alignment / magnitude
        this.maxForce = 1;
        //set speed limit
        this.maxSpeed = 4;
        //false - rand  / true - follow mouse
        this.randOrFollow = 'random';
    }

    update() {
        this.position.add(this.velocity);
        this.x = this.position.x;
        this.y = this.position.y;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.reset();
        console.log("Bee is at : " + this.x + " " + this.y)
    }

    avg(fellowBoids, vectorType){
        var inRange = 0;			//Flag to check if any boids were in the range at all
        //grab average velocity
        var avgVel = new Phaser.Math.Vector2();
        for(let i = 0; i < fellowBoids.length; i++){
            let distance = this.position.distance(fellowBoids[i].position)
            //if in radius of 100 from boid
            if(this !== fellowBoids[i] && (distance <= 50)){
                if(vectorType === 'cohesion'){
                    avgVel.add(fellowBoids[i].position);
                }
                else if(vectorType === 'separation'){
                    //vector pointing from other to me
                    let differenceVector = this.position.subtract(fellowBoids[i].position)
                    //have difference be inversely proportional to differenceVector
                    differenceVector.x /= distance*distance;
                    differenceVector.y /= distance*distance;
                    avgVel.add(differenceVector);
                    inRange++;
                }
                else if(vectorType === 'alignment'){
                    avgVel.add(fellowBoids[i].velocity);
                }
                inRange++;
            }
        }

        if(inRange > 0){
            avgVel.x /= inRange;
            avgVel.y /= inRange

            if(vectorType === 'cohesion'){
                avgVel.subtract(this.position);
            }

            // avgVel.setMag(this.maxSpeed);
            avgVel.subtract(this.velocity);
            avgVel.limit(this.maxForce);

        }
        return avgVel;
    }

    flock(fellowBoids, pointPath){
            //TODO: If within ~15 of the flower then move onto the next

            //follow points (start w/ first in list of pointPath)
            let pointLocation = pointPath
            let tmpPoint = new Phaser.Math.Vector2(pointLocation[cnt][0], pointLocation[cnt][1])
            let distance = this.position.distance(new Phaser.Math.Vector2(pointLocation[cnt][0], pointLocation[cnt][1]))

            //if it's close enough to the flower
            if(distance <= 10){
                cnt++;
                if(cnt > pointLocation.length - 1)
                    cnt = 0;
            }


            let direction = tmpPoint.subtract(this.position);
            direction.normalize();
            direction.x *= .5;
            direction.y *= .5;
            this.acceleration = direction;

            let alignment = this.avg(fellowBoids, 'alignment');
            let cohesion = this.avg(fellowBoids, 'cohesion');
            let separation = this.avg(fellowBoids, 'separation');
            //Since mass =1 then A = F/1
            this.acceleration.add(separation);
            this.acceleration.add(alignment);
    }
}