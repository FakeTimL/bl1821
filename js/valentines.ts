const itemSize = 60;
const gravity = 0.5, interval = 20;
var startLeft = 0, startTop = 0;
var canvaLeft = 0, canvaWidth = 0, canvaTop = 0, canvaHeight = 0;

function generateItem(): boolean {
  const item = document.createElement("img");
  const random = Math.random();
  var img = '';
  if (random < 0.8) img = 'rose';
  else if (random < 0.9) img = 'froggie';
  else img = 'queenie';
  item.setAttribute("src", `element/${img}.png`);
  item.className = "valentines-item";
  document.body.append(item);
  applyPhysics(item, Math.random()*canvaHeight+canvaTop, Math.random()*canvaWidth+canvaLeft);
  return random >= 0.8;
}

function applyPhysics(item: HTMLElement, targetTop: number, targetLeft: number): void {
  const vDist = targetTop - startTop, time = Math.sqrt(2*vDist/gravity);
  const hSpeed = (targetLeft - startLeft)/time;
  item.style.top = `${startTop}px`;
  item.style.left = `${startLeft}px`;
  
  var t = 0;
  let id = setInterval(() => {
    if (++t >= time) {
      // item.style.width = `${itemSize}px`;
      // item.style.height = `${itemSize}px`;
      item.style.top = `${targetTop}px`;
      item.style.left = `${targetLeft}px`;
      clearInterval(id);
    } else {
      // item.style.width = `${t/time*itemSize}px`;
      // item.style.height = `${t/time*itemSize}px`;
      item.style.top = `${item.offsetTop + t * gravity}px`;
      item.style.left = `${startLeft + t * hSpeed}px`;
    }
  }, interval)
}