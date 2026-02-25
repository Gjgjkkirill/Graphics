const BACKGROUND = "#1e1e1e"
const POINTSCOLOR = "#00ff00"
const LINESCOLOR = "#00ff00"
const WINDOWSIZE = 600


// -----------------PARAMS-----------------//

let PSIZE = 7.5
let FPS = 60
let cubeSize = 0.25

let DrawLines = true
let DrawPoints = true
let ClearCanvas = true
let RenderScene = true

let ConstantRotation = true
let CRotation_Value = 1/4*Math.PI
let CRotation_XY = false
let CRotation_YZ = false
let CRotation_ZX = true

let ConstantOffset = false
let COffset_Value_X = 0
let COffset_Value_Y = 0
let COffset_Value_Z = 0


function getPoints() {
    return [
    {x: cubeSize, y: cubeSize, z: cubeSize},
    {x: -cubeSize, y: cubeSize, z: cubeSize},
    {x: cubeSize, y: -cubeSize, z: cubeSize},
    {x: -cubeSize, y: -cubeSize, z: cubeSize},

    {x: cubeSize, y: cubeSize, z: -cubeSize},
    {x: -cubeSize, y: cubeSize, z: -cubeSize},
    {x: cubeSize, y: -cubeSize, z: -cubeSize},
    {x: -cubeSize, y: -cubeSize, z: -cubeSize},
]}


const Faces = [
    // Actual points
    [0,2,3,1],
    [4,6,7,5],
    
    // Connections between faces
    [0,4],
    [2,6],
    [3,7],
    [1,5]
]




// -------------------INIT------------------//




let canvas = document.getElementById("Canvas")
const ctx = canvas.getContext("2d")

// console.log(canvas)
// console.log(ctx)
canvas.height = WINDOWSIZE
canvas.width = WINDOWSIZE

function Clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}



// -----------------FUNCTIONS---------------//




function DrawPoint(P2d) {
    ctx.fillStyle = POINTSCOLOR
    ctx.fillRect(
        // P.x = top left corner :(
        // P.x - s/2 = center :)
        P2d.x - PSIZE/2,
        P2d.y - PSIZE/2,
        PSIZE, PSIZE // width, height
)}

function DrawLine(P1,P2) {
    ctx.strokeStyle = LINESCOLOR
    ctx.beginPath()
    ctx.moveTo(P1.x,P1.y)
    ctx.lineTo(P2.x,P2.y)
    ctx.stroke()
}


function Rotate_xy(P3d, angle) {
    const CosA = Math.cos(angle)
    const SinA = Math.sin(angle)
    return {
        x: P3d.x*CosA - P3d.y*SinA,
        y: P3d.x*SinA + P3d.y*CosA,
        z: P3d.z}}
function Rotate_yz(P3d, angle) {
    const CosA = Math.cos(angle)
    const SinA = Math.sin(angle)
    return {
        x: P3d.x,
        y: P3d.y*CosA - P3d.z*SinA,
        z: P3d.y*SinA + P3d.z*CosA}}
function Rotate_zx(P3d, angle) {
    const CosA = Math.cos(angle)
    const SinA = Math.sin(angle)
    return {
        x: P3d.x*CosA - P3d.z*SinA,
        y: P3d.y,
        z: P3d.x*SinA + P3d.z*CosA}
}

function ApplyOffset(P3d, Offset) {
    return {x: P3d.x + Offset.x,
          y: P3d.y + Offset.y,
          z: P3d.z + Offset.z}
}

function ApplyRotation(P3d, angle) {
    if (CRotation_XY) {P3d = Rotate_xy(P3d, angle)}
    if (CRotation_YZ) {P3d = Rotate_yz(P3d, angle)}
    if (CRotation_ZX) {P3d = Rotate_zx(P3d, angle)}
    return P3d
}




// -----------------RENDER-----------------//




let COffset = {x:0,y:0,z:1}
let angle = 0
function Render() {
    let dt = 1/FPS

    if (ConstantRotation) {angle += CRotation_Value*dt}
    if (ConstantOffset) {
        COffset.x += COffset_Value_X*dt
        COffset.y += COffset_Value_Y*dt
        COffset.z += COffset_Value_Z*dt
    }

    if (ClearCanvas) {Clear()}

    if (DrawPoints) {    
        for (let P3d of getPoints()) {
            P3d = ApplyOffset(ApplyRotation(P3d, angle), COffset)        
            DrawPoint(CalculatePoint(P3d))
        }
    }

    if (DrawLines) {
        for (const Face of Faces) {
            for (let i = 0; i < Face.length; i++) {
                const P1 = getPoints()[Face[i]]
                const P2 = getPoints()[Face[(i+1) % Face.length]]
                DrawLine(  
                    CalculatePoint(ApplyOffset(ApplyRotation(P1, angle), COffset)),
                    CalculatePoint(ApplyOffset(ApplyRotation(P2, angle), COffset))
                )
        }}
    }
    if (RenderScene) {setTimeout(Render, 1000/FPS)}
}

setTimeout(Render, 1000/FPS)