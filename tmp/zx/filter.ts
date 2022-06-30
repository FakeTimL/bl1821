function display() {
  document.getElementById('source').style.display = 'none';
  document.getElementById('output').innerHTML = "";
  let lec = (document.getElementById('sel') as HTMLSelectElement).value;
  let list = document.getElementById(lec).getElementsByClassName('navigation-item');
  let perLec = (document.getElementById('lec') as HTMLInputElement).value;
  let final = (document.getElementById('rnd') as HTMLInputElement).value;
  document.getElementById('output').innerHTML = filter(extractAndNumber(list), perLec, final).splice(1).join('<br><br>');
}

function extractAndNumber(list) {
  let ind = 0;
  let res = [];
  for (let e of list) {
    let txt = e.children[0].innerHTML;
    if (txt.startsWith('Lecture')) {
      ind = txt.substring(8, txt.indexOf(':'));
      res.push(txt);
    } else {
      res.push(`${txt} [${ind}]`);
    }
  }
  return res;
}

function filter(list, perLec, final) {
  let res = [];
  let cur = [];
  for (let txt of list) {
    if (txt.startsWith('Lecture')) {
      res.push(shuffleAndExtract(cur, perLec));
      res.push(txt);
      cur = [];
    } else {
      cur.push(txt);
    }
  }
  res.push(shuffleAndExtract(cur, perLec));

  cur = [];
  for (let txt of list) {
    if (!txt.startsWith('Lecture')) {
      cur.push(txt);
    }
  }
  res.push(shuffleAndExtract(cur, final));
  return res;
}

function shuffleAndExtract(list: string[], k: number) {
  let ind = [], n = list.length;
  if (n < k) return null;
  for (let i = 0; i < n; i++) {
    ind.push(i);
  }
  for (let i = 0; i < n; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let t = ind[i];
    ind[i] = ind[j];
    ind[j] = t;
  }
  return ind.slice(0, k).map(n => list[n]).join('<br>');
}