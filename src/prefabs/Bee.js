var cnt = 0;
var printTest = false

class Bee extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame, initX, initY) {
        super(scene, initX, initY, texture, frame);
        //vectors rooted @ (0, 0)
        scene.add.existing(this);

        //Math.random()* (1 - -1) + -1: picks random w/ min -1 & max 1
        this.velocity = new Phaser.Math.Vector2(Math.random() * (1 - -1) + -1, Math.random() * (1 - -1) + -1);
        //NOTE: setLength is the same as setMat() (because length = magnitude)
        this.velocity.setLength(Math.random() * (1 - 0) + 0);

        //speed at which boids move
        this.acceleration = new Phaser.Math.Vector2();
        this.position = new Phaser.Math.Vector2(initX, initY)

        //limit boid vector alignment / magnitude
        this.maxForce = 1;
        //set speed limit
        this.maxSpeed = 2;

        //pollen count and carrying
        this.pollenMax = 150;
        this.pollen = 0;

        //tracking target to go to
        this.target = 1;

        //Hive Neighbors are the flowers in the order which they are seen
        this.hiveNeighbors = [];

        //For random movement in update()
		this.moveTick = 0;

		//Side detection
		this.hitTop = this.hitBot = this.hitRight = this.hitLeft = false;

		//Decision label to gather or scout
		this.scoutOrGather = 'scout';
    }

    // If the bee gets close to an edge, then he moves opposite to that edge
    // width: 640 / height: 420
	ifAtEdge(){
		if(this.position.x > config.width - 50){
			this.hitRight = true;
			this.hitTop = this.hitBot = this.hitLeft = false
			console.log("HIT RIGHT")
		}
		else if(this.position.x < 50){
			this.hitLeft = true;
			this.hitTop = this.hitBot = this.hitRight = false
			console.log("HIT LEFT")
		}

		else if(this.position.y > config.height - 50){
			this.hitBot = true;
			this.hitTop = this.hitRight = this.hitLeft = false
			console.log("HIT BOT")
		}
		else if(this.position.y < 50){
			this.hitTop = true;
			this.hitBot = this.hitRight = this.hitLeft = false
			console.log("HIT TOP")
		}
	}

    update() {
    	this.ifAtEdge();

        this.position.add(this.velocity);
        this.x = this.position.x;
        this.y = this.position.y;
        this.velocity.add(this.acceleration);
        printTest = false
        this.velocity.limit(this.maxSpeed);
        this.acceleration.reset();
        //console.log("Bee is at : " + this.x + " " + this.y)

        //does random movement when scouting ('scout')
        if(this.scoutOrGather == 'scout'){
			this.moveTick += 1;
			if(this.moveTick == 20){
				if(this.hitRight){
					this.velocity = new Phaser.Math.Vector2(Math.random() * (0 - -2) + -2, Math.random() * (2 - -2) + -2);
				}
				else if(this.hitLeft){
					console.log("HIT LEFT INNIT")
					this.velocity = new Phaser.Math.Vector2(Math.random() * (2 - 0) + 0, Math.random() * (2 - -2) + -2);
				}
				else if(this.hitBot){
					this.velocity = new Phaser.Math.Vector2(Math.random() * (2 - -2) + -2, Math.random() * (0 - -2) + -2);
				}
				else if(this.hitTop){
					this.velocity = new Phaser.Math.Vector2(Math.random() * (2 - -2) + -2, Math.random() * (2 - 0) + 0);
				}
				else{
					this.velocity = new Phaser.Math.Vector2(Math.random() * (2 - -2) + -2, Math.random() * (2 - -2) + -2);
				}
				this.moveTick = 0;
			}
		}
    }

    avg(fellowBoids, vectorType, tetherDistance) {
        var inRange = 0;			//Flag to check if any boids were in the range at all
        //grab average velocity
        var avgVel = new Phaser.Math.Vector2();
        for (let i = 0; i < fellowBoids.length; i++) {
            let distance = this.position.distance(fellowBoids[i].position)
            //if within tether radius from boid
            if (this != fellowBoids[i] && (distance <= tetherDistance)) {
                // Cohesion removed due to flower pathing
                /*if(vectorType === 'cohesion'){
                    avgVel.add(fellowBoids[i].position);
                }*/
                if (vectorType === 'separation') {
                    //vector pointing from other to me
                    //init to 0,0
                    let diff = new Phaser.Math.Vector2();
                    diff.x = this.position.x - fellowBoids[i].position.x
                    diff.y = this.position.y - fellowBoids[i].position.y

                    //NOTE: this.position.subtract(fellowBoids[i].position); is attaching position to diff so 
                    //		whatever is done to diff is then done to position. So it was removed

                    diff.divide(new Phaser.Math.Vector2(distance * distance, distance * distance));
                    avgVel.add(diff);
                    inRange++;
                } else if (vectorType === 'alignment') {
                    avgVel.add(fellowBoids[i].velocity);
                }
                inRange++;
            }
        }

        if (inRange > 0) {
            avgVel.divide(new Phaser.Math.Vector2(inRange, inRange))

            if (vectorType === 'cohesion') {
                avgVel.subtract(this.position);
            }

            avgVel.setLength(this.maxSpeed);
            avgVel.subtract(this.velocity);
            avgVel.limit(this.maxForce);

        }
        return avgVel;
    }

    avoid(player, radius) {
        let direction = new Phaser.Math.Vector2();
        if (this.position.distance(player) < radius) {
            direction.x = this.position.x - player.x;
            direction.y = this.position.y - player.y;
            direction.normalize();
        }
        return direction;
    }

    flock(fellowBoids, path, player) {
    	//This pathway is used whenever the workers have already cone out & seen the flowers
    	if(this.scoutOrGather == 'gather'){
	        // Get the target to go to & distance to
	        let targetLocation = new Phaser.Math.Vector2(path[this.target][0], path[this.target][1]);
	        let playerLocation = new Phaser.Math.Vector2(player.x, player.y);
	        let distance = this.position.distance(targetLocation);

	        // Avoid the Bear if in range
	        let avoidance = this.avoid(playerLocation, 100);
	        if (avoidance.x != 0 || avoidance.y != 0) {
	            this.acceleration.add(avoidance);
	        } //if it's close enough to the flower
	        else if (distance < 15) {
	            if (this.pollen < this.pollenMax) {
	                this.acceleration.reset();
	                this.velocity = new Phaser.Math.Vector2(Phaser.Math.FloatBetween(-.15, .15),
	                    Phaser.Math.FloatBetween(-.15, .15));
	                this.pollen++;
	            } else {
	                this.pollen = 0;
	                this.target = (this.target + 1) % path.length;
	            }
	        } else {
	            // If you are close enough to your target
	            if (distance < 100) {
	                // If player is next to a flower you are close to
	                if (this.target > 0 && targetLocation.distance(new Phaser.Math.Vector2(player.x, player.y)) < 75) {
	                    // Skip it and go to the next target
	                    this.pollen = 0;
	                    this.target = (this.target + 1) % path.length;
	                } else if (this.target > 0) {
	                    // Find how many bees are already at your target
	                    let atTarget = 0;
	                    for (let i = 0; i < fellowBoids.length; ++i) {
	                        if (fellowBoids[i].position.distance(targetLocation) < 20) {
	                            ++atTarget;
	                        }
	                    }
	                    if (atTarget > 3) {
	                        // Skip it and go to the next target
	                        this.pollen = 0;
	                        this.target = (this.target + 1) % path.length;
	                    }
	                }
	            }

	            if (this.position.distance(playerLocation) < 110) {
		            // Find out how many bees are nearby
		            let swarmAvg = new Phaser.Math.Vector2();
		            let nearbySwarm = []

		            for (let i = 0; i < fellowBoids.length; i++) {
		                // If another bee is nearby, add it to a local swarm
		                if (this.position.distance(fellowBoids[i].position) < 50) {
		                    nearbySwarm.push(fellowBoids[i]);
		                    swarmAvg.add(fellowBoids[i].position);
		                }
		            }
		            // If there are enough fellow bees around, try to engage with the player
		            if (nearbySwarm.length >= 3) {
		                // Find average position of nearby swarm
		                swarmAvg.x /= nearbySwarm.length;
		                swarmAvg.y /= nearbySwarm.length;

		                let pushDirection = playerLocation.subtract(swarmAvg);
		                pushDirection.normalize();
		                //console.log(pushDirection);
		                player.x += pushDirection.x/10;
		                player.y += pushDirection.y/10;
	            	}	
	        	}

	        //otherwise just flock together
	        let direction = targetLocation.subtract(this.position);
	        direction.normalize();
	        direction.x *= .5;
	        direction.y *= .5;
	        this.acceleration = direction;


	        //Cohesion not necessary during path following because bees focused on flower.
	        let alignment = this.avg(fellowBoids, 'alignment', Phaser.Math.Between(15, 60));
	        //let cohesion = this.avg(fellowBoids, 'cohesion');
	        let separation = this.avg(fellowBoids, 'separation', Phaser.Math.Between(10, 30));

	        //Since mass =1 then A = F/1
	        this.acceleration.add(separation);
	        this.acceleration.add(alignment);
	        //this.acceleration.add(cohesion);

	        //Add some ranomization of bumbling
	        this.acceleration.add(new Phaser.Math.Vector2(Phaser.Math.FloatBetween(-.25, .25),
	            Phaser.Math.FloatBetween(-.25, .25)));
	    	}
	    }
	    //When the first bees go out to find the flowers
	    else if(this.scoutOrGather == 'scout'){
	    	//*************************************************************************************
	    	let prod = new Phaser.Math.Vector2();
            this.acceleration.x = this.acceleration.x - prod.x
            this.acceleration.y = this.acceleration.y - prod.y

			let alignment = this.avg(fellowBoids, 'alignment', Phaser.Math.Between(15, 60));
			let cohesion = this.avg(fellowBoids, 'cohesion', Phaser.Math.Between(15, 60));
			let separation = this.avg(fellowBoids, 'separation', Phaser.Math.Between(10, 30));
			//Since mass =1 then A = F/1
			this.acceleration.add(separation);
			this.acceleration.add(alignment);
			this.acceleration.add(cohesion);

			//if close enough to the object report back
			for(let x of path){
				//if equal to hive's position
				if(path.indexOf(x) == 0){
					continue
				}

				var distToObj = Math.abs(this.position.x - x[0]) + Math.abs(this.position.y - x[1]);
				if(distToObj <= 150 && this.hiveNeighbors.indexOf(x) == -1){
					console.log("WITHIN RANGE!: ", x);
					this.hiveNeighbors.push(x);
					break;
				}
			}

			//When bee has found all flowers, go back to hive & let out workers
			if(this.hiveNeighbors.length == path.length - 1){
				this.scoutOrGather = 'BackToHive';
			}
			//*************************************************************************************
	    }
	    else if(this.scoutOrGather == 'BackToHive'){
	    		let hiveVector = new Phaser.Math.Vector2(540, 420);
				let distanceToHive = Math.abs(this.position.x - hiveVector.x) + Math.abs(this.position.y - hiveVector.y);

				let directionToHive = new Phaser.Math.Vector2();
				
                directionToHive.x = hiveVector.x - this.position.x;
                directionToHive.y = hiveVector.y - this.position.y;

				directionToHive.normalize();
				directionToHive.x = directionToHive.x * 0.5;
            	directionToHive.y = directionToHive.y * 0.5;

				this.acceleration = directionToHive;

				let alignment = this.avg(fellowBoids, 'alignment', Phaser.Math.Between(15, 60));
				let separation = this.avg(fellowBoids, 'separation', Phaser.Math.Between(10, 30));
				//Since mass =1 then A = F/1
				this.acceleration.add(separation);
				this.acceleration.add(alignment);
	    }
    }
}
