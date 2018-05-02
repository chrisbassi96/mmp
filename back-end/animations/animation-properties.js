class AnimationProperties{
    constructor(isMoving=false, isFading=false){
        this.isMoving = isMoving;
        this.isFading = isFading;
        this.progress = 0;
        this.fade = "none";
        this.opacity = 1;
    }
    isBeingAnimated(){
        return this.isMoving || this.isFading;
    }
}

class MoveFadeIn extends AnimationProperties{
    constructor(){
        super(true, true);
        this.fade = "in";
    }
}

class MoveFadeOut extends AnimationProperties{
    constructor(){
        super(true, true);
        this.fade = "out";
    }
}

class MoveNoFade extends AnimationProperties{
    constructor(){
        super(true, false);
    }
}