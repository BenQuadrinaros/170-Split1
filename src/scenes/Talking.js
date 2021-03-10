//From https://github.com/nathanaltice/Dialogging
class Talking extends Phaser.Scene {
    constructor() {
        super("talkingScene");

        // json constants
        this.DBOX_X = 0;			    // json box x-position
        this.DBOX_Y = 400;			    // json box y-position
        this.DBOX_FONT = 'gem_font';	// json box font key

        this.TEXT_X = 50;			// text w/in json box x-position
        this.TEXT_Y = 445;			// text w/in json box y-position
        this.TEXT_SIZE = 24;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715;	// max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 775;			// next text prompt x-position
        this.NEXT_Y = 574;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // json variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual json text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        // this.homer = null;
        // this.minerva = null;
        // this.neptune = null;
        // this.jove = null;
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
    }

    create() {
        //Create escape key for pausing
        //keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        console.log(dialogGlobal);
        console.log(dialogSlice)
        // parse json from JSON file
        this.dialog = dialogGlobal;
        //console.log(this.dialog);
        this.dialogOver = false;
        dialogEnded = false;

        // add json box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);
        this.dialogLine = 0;

        // initialize json text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        //Add an indicator that space continues the conversation
        this.spaceText = this.add.bitmapText(this.TEXT_X+475, this.TEXT_Y+70, this.DBOX_FONT, "Press SPACE to continue.", 7*this.TEXT_SIZE/8).setAlpha(0.5);

        // // ready the character json images offscreen
        this.bear = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'PlayerIcon').setOrigin(0, 1);
        this.bee = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'bee').setOrigin(0, 1).setScale(.02,.02);
        // this.neptune = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'neptune').setOrigin(0, 1);
        // this.jove = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'jove').setOrigin(0, 1);
        this.Dog = this.add.sprite(this.OFFSCREEN_X,this.OFFSCREEN_Y, this.DBOX_Y+8,"basicDogNPC").setOrigin(0, 1);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        // input
        cursors = this.input.keyboard.createCursorKeys();
        this.dialogConvo = dialogueSection;

        console.log("in talking")
        // start json
        this.typeText();
    }

    update() {
        //Pause Game
        /*if(Phaser.Input.Keyboard.JustDown(keyESCAPE)){
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene:"talkingScene"});
        }*/
        
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            // trigger json
            this.dialogOver = false;
            this.typeText();
        }
        if(Phaser.Input.Keyboard.JustDown(keyN)){
                sellChoice = "no";
                dialogGlobal[dialogueSection] = dialogSlice;
                dialogEnded = true;
                this.scene.stop('talkingScene');
                //this.scene.resume('marketScene');
            //isPaused = true;

        }
        if(Phaser.Input.Keyboard.JustDown(keyY)){

            sellChoice = "yes";
            dialogGlobal[dialogueSection] = dialogSlice;
            dialogEnded = true;
            this.scene.stop('talkingScene');
            //this.scene.resume('marketScene');
            //isPaused = true;

        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';

        /* Note: In my conversation data structure:
                - each array within the main JSON array is a "conversation"
                - each object within a "conversation" is a "line"
                - each "line" can have 3 properties:
                    1. a speaker
                    2. the json text
                    3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the json here
            this.dialogConvo = 100000;
        }

        // make sure we haven't run out of conversations...
        if(this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the json box,
            // but you could build other logic to change game states here
            console.log('End of Conversations');
            // tween out prior speaker's image
            if(this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }
            // make text box invisible
            //this.dialogbox.visible = false;
            //this.dialogConvo = 0;
            this.dialogOver = true;
            dialogGlobal[dialogueSection] = dialogSlice;
            dialogEnded = true;
            if (bartering){
                sellChoice = "no";
                bartering = false;
            }
            this.scene.stop('talkingScene');
            this.scene.resume(previousScene);

        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if(this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: this.DBOX_X + 50,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build json (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the json text
            let currentChar = 0;
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => {
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });

            // set bounds on json
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment json line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }


}