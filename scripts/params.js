const drawlines = document.getElementById("drawlines")
const drawpoints = document.getElementById("drawpoints")
const clearcanvas = document.getElementById("clearcanvas")
const render = document.getElementById("render")
const fps = document.getElementById("fps")
const Csize = document.getElementById("Csize")
const Psize = document.getElementById("Psize")
let Crot = document.getElementById("CRotation")
let rValue = document.getElementById("Rvalue")
let rotXY = document.getElementById("RotateXY")
let rotYZ = document.getElementById("RotateYZ")
let rotZX = document.getElementById("RotateZX")
let Coffset = document.getElementById("COffset")
let OffsetX = document.getElementById("OffsetX")
let OffsetY =document.getElementById("OffsetY")
let OffsetZ = document.getElementById("OffsetZ")


function Switch(e, val) {
    if (val) {
        e.classList.add("Active")}
    else{
        e.classList.remove("Active")}
}


function TextBox(e, filter) {
    let oldVal = Number(e.getHTML())
    let newVal = e.value

    if (Number(newVal) == NaN) {e.value = oldVal; return NaN}
    newVal = Number(newVal)
    
    if (filter(newVal)) {
        e.innerHTML = newVal
        return newVal}
    else {
        e.value = oldVal
    }
    return NaN
}


// TOGGLE VALUES


drawlines.addEventListener("click", () => {
    DrawLines = !DrawLines
    Switch(drawlines, DrawLines)
})
drawpoints.addEventListener("click", () => {
    DrawPoints = !DrawPoints
    Switch(drawpoints, DrawPoints)
})
clearcanvas.addEventListener("click", () => {
    ClearCanvas = !ClearCanvas
    Switch(clearcanvas, ClearCanvas)
})
render.addEventListener("click", () => {
    RenderScene = !RenderScene
    if (RenderScene) {setTimeout(Render, 1000/FPS)}
    Switch(render,RenderScene)
})
Crot.addEventListener("click", () => {
    ConstantRotation = !ConstantRotation
    Switch(Crot, ConstantRotation)
})
rotXY.addEventListener("click", () => {
    CRotation_XY = !CRotation_XY
    Switch(rotXY, CRotation_XY)
})
rotYZ.addEventListener("click", () => {
    CRotation_YZ = !CRotation_YZ
    Switch(rotYZ, CRotation_YZ)
})
rotZX.addEventListener("click", () => {
    CRotation_ZX = !CRotation_ZX
    Switch(rotZX, CRotation_ZX)
})
Coffset.addEventListener("click", () => {
    ConstantOffset = !ConstantOffset
    Switch(Coffset, ConstantOffset)
})


// TEXT BOXES


fps.addEventListener("focusout", () => {
    let result = TextBox(fps, (newVal) => {
        return newVal > 0 && newVal <= 120
    })
    if (!Number.isNaN(result)) {
        FPS = result}
})
Psize.addEventListener("focusout", () => {
    let result = TextBox(Psize, (newVal) => {
        return newVal >= 3 && newVal <= 15
    })
    if (!Number.isNaN(result)) {
        PSIZE = result}
})
Csize.addEventListener("focusout", () => {
    let result = TextBox(Csize, (newVal) => {
        return newVal >= 0.1 && newVal <= 0.7
    })
    if (!Number.isNaN(result)) {
        cubeSize = result}
})
rValue.addEventListener("focusout", () => {
    let result = TextBox(rValue, (newVal) => {
        return newVal >= 0 && newVal <= 360
    })
    if (!Number.isNaN(result)) {
        CRotation_Value = result * Math.PI/180}
})
OffsetX.addEventListener("focusout", () => {
    let result = TextBox(OffsetX, (newVal) => {
        return newVal >= -5 && newVal <= 5
    })
    if (!Number.isNaN(result)) {
        COffset_Value_X = result}
})
OffsetY.addEventListener("focusout", () => {
    let result = TextBox(OffsetY, (newVal) => {
        return newVal >= -5 && newVal <= 5
    })
    if (!Number.isNaN(result)) {
        COffset_Value_Y = result}
})
OffsetZ.addEventListener("focusout", () => {
    let result = TextBox(OffsetZ, (newVal) => {
        return newVal >= -5 && newVal <= 5
    })
    if (!Number.isNaN(result)) {
        COffset_Value_Z = result}
})