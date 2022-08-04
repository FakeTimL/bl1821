var itemSize = 60;
var gravity = 0.5, interval = 20;
var startLeft = 0, startTop = 0;
var canvaLeft = 0, canvaWidth = 0, canvaTop = 0, canvaHeight = 0;
function generateItem() {
    var item = document.createElement("img");
    var random = Math.random();
    var img = '';
    if (random < 0.8)
        img = 'rose';
    else if (random < 0.9)
        img = 'froggie';
    else
        img = 'queenie';
    item.setAttribute("src", "element/".concat(img, ".png"));
    item.className = "valentines-item";
    document.body.append(item);
    applyPhysics(item, Math.random() * canvaHeight + canvaTop, Math.random() * canvaWidth + canvaLeft);
    return random >= 0.8;
}
function applyPhysics(item, targetTop, targetLeft) {
    var vDist = targetTop - startTop, time = Math.sqrt(2 * vDist / gravity);
    var hSpeed = (targetLeft - startLeft) / time;
    item.style.top = "".concat(startTop, "px");
    item.style.left = "".concat(startLeft, "px");
    var t = 0;
    var id = setInterval(function () {
        if (++t >= time) {
            // item.style.width = `${itemSize}px`;
            // item.style.height = `${itemSize}px`;
            item.style.top = "".concat(targetTop, "px");
            item.style.left = "".concat(targetLeft, "px");
            clearInterval(id);
        }
        else {
            // item.style.width = `${t/time*itemSize}px`;
            // item.style.height = `${t/time*itemSize}px`;
            item.style.top = "".concat(item.offsetTop + t * gravity, "px");
            item.style.left = "".concat(startLeft + t * hSpeed, "px");
        }
    }, interval);
}
