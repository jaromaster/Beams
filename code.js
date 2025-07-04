const halfHeight = 300;
const beamLength = 500;
const offset = 20;
var force = 0; // force in newtons
const E = 210000; // steel
const r = 10; // beam radius in mm
const Jy = 3.14*Math.pow(r,4)/4;

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canv');
    if (!canvas.getContext) {
        console.error('canvas not supported');
        return;
    }
    const ctx = canvas.getContext('2d');

    // get force from slider input
    const slider = document.getElementById('forceSlider');
    slider.addEventListener('input', function() {
        force = slider.value;
        document.getElementById("forceText").textContent = force;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect(ctx);
        drawBeamDef(ctx, beamLength);
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(ctx);
    drawBeamDef(ctx, beamLength);

});


function drawRect(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(offset, halfHeight-offset, 50, 40);
}

// draws arrow for force
function drawForce(ctx, pos) {
    ctx.beginPath();
    ctx.moveTo(pos, Math.floor(halfHeight/2));
    ctx.lineTo(pos, halfHeight-offset);

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;

    // arrow triangle
    ctx.moveTo(pos-10, halfHeight-offset);
    ctx.lineTo(pos+10, halfHeight-offset);
    ctx.lineTo(pos, halfHeight-10);
    ctx.fillStyle = 'green';
    ctx.closePath();
    ctx.fill(); 
    ctx.stroke();
}

// draws deformed beam
function drawBeamDef(ctx, l) {
    ctx.beginPath();

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 5;
    ctx.moveTo(offset, halfHeight);

    for (let pos = 0; pos < l; pos++) {
        const def = calcDeformation(pos);
        ctx.lineTo(pos+offset, halfHeight+def);
        ctx.moveTo(pos+offset, halfHeight+def);
    }
    ctx.closePath();
    ctx.stroke();

    drawForce(ctx, offset+l);
}

// calculates deformation at given x position
function calcDeformation(x) {
    const res = (Math.pow(x,3)*force)/(6*E*Jy); // deformation
    return res;
}