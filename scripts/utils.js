// This script contains all utilisation universal functions

function ConvertCoordinates(P2d) {
    // -1...1 => 0...w/h ?
    // P2d.x + 1 => 0...2
    // (P2d.x + 1)/2 => 0...1
    // (P2d.x + 1)/2*w => 0...w :)
    return {
        x: (P2d.x + 1)/2*canvas.width,
        // (1 - (P2d.y + 1)/2) => 1 - 0...1 => 1...0
        y: (1 - (P2d.y + 1)/2)*canvas.height
}}

function Project3dPointOnScreen(P3d) {
    return {
        x: P3d.x / P3d.z,
        y: P3d.y / P3d.z
}}

function CalculatePoint(p) {return ConvertCoordinates(Project3dPointOnScreen(p))}