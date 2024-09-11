const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 20;      // Radius of each dot 
const spacing = 20;     // Spacing between dots

function drawCenteredSquareNumberOne() {
    // ctx.lineWidth = 2;
    ctx.strokeStyle = "#C6CD78"
    ctx.fillStyle = "#F1F08A";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawCenteredSquareNumberFour() {
    ctx.strokeStyle = "#FF847C";
    ctx.fillStyle = "#FECEA8";
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawCenteredSquareNumberEight() {
    ctx.strokeStyle = "#F5A855";
    ctx.fillStyle = "#F4E557";
    ctx.beginPath();
    ctx.arc(centerX, centerY - 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 100, centerY,  radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY + 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawCenteredSquareNumberTwelve() {
    ctx.strokeStyle = "#EA5F2D";
    ctx.fillStyle = "#EEC89F";
    ctx.beginPath();
    ctx.arc(centerX, centerY - 150, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY - 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 100, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 150, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 100, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY + 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY + 150, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY + 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 150, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY - 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawCenteredSquareNumberTwentyFour() {
    ctx.strokeStyle = "#FB7777";
    ctx.fillStyle = "#FFCCCC";
    ctx.beginPath();
    ctx.arc(centerX, centerY - 200, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY - 150, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 100, centerY - 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 150, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 200, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 150, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 100, centerY + 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX + 50, centerY + 150, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY + 200, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY + 150, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY + 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 150, centerY + 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 200, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 150, centerY - 50, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 100, centerY - 100, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX - 50, centerY - 150, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

// function drawCenteredSquareNumber(n) {
//     const layers = Math.floor((Math.sqrt(8 * n + 1) - 1) / 2);
//     let count = 1;
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     ctx.fill();

//     for (let layer = 1; layer <= layers; layer++) {
//         for (let i = -layer; i <= layer; i++) {
//             for (let j = -layer; j <= layer; j++) {
//                 if (Math.abs(i) === layer || Math.abs(j) === layer) {
//                     ctx.beginPath();
//                     ctx.arc(centerX + i * spacing, centerY + j * spacing, radius, 0, 2 * Math.PI);
//                     ctx.fill();
//                     count++;
//                     if (count > n)
//                         return;
//                 }
//             }
//         }
//     }
// }

// Example: Draw the first 5 centered square numbers 
// const centeredSquareNumbers = [1, 5, 13, 25, 41];
// centeredSquareNumbers.forEach((num, index) => {
//     console.log(num, index);
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setTimeout(() => {
        drawCenteredSquareNumberOne();
        drawCenteredSquareNumberFour();
        drawCenteredSquareNumberEight();
        drawCenteredSquareNumberTwelve();
        drawCenteredSquareNumberTwentyFour();
//     }, index * 1000);
// });