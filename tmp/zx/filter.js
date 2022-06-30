function display() {
    document.getElementById('source').style.display = 'none';
    document.getElementById('output').innerHTML = "";
    var lec = document.getElementById('sel').value;
    var list = document.getElementById(lec).getElementsByClassName('navigation-item');
    var perLec = document.getElementById('lec').value;
    var final = document.getElementById('rnd').value;
    document.getElementById('output').innerHTML = filter(extractAndNumber(list), perLec, final).splice(1).join('<br><br>');
}
function extractAndNumber(list) {
    var ind = 0;
    var res = [];
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var e = list_1[_i];
        var txt = e.children[0].innerHTML;
        if (txt.startsWith('Lecture')) {
            ind = txt.substring(8, txt.indexOf(':'));
            res.push(txt);
        }
        else {
            res.push("".concat(txt, " [").concat(ind, "]"));
        }
    }
    return res;
}
function filter(list, perLec, final) {
    var res = [];
    var cur = [];
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
        var txt = list_2[_i];
        if (txt.startsWith('Lecture')) {
            res.push(shuffleAndExtract(cur, perLec));
            res.push(txt);
            cur = [];
        }
        else {
            cur.push(txt);
        }
    }
    res.push(shuffleAndExtract(cur, perLec));
    cur = [];
    for (var _a = 0, list_3 = list; _a < list_3.length; _a++) {
        var txt = list_3[_a];
        if (!txt.startsWith('Lecture')) {
            cur.push(txt);
        }
    }
    res.push(shuffleAndExtract(cur, final));
    return res;
}
function shuffleAndExtract(list, k) {
    var ind = [], n = list.length;
    if (n < k)
        return null;
    for (var i = 0; i < n; i++) {
        ind.push(i);
    }
    for (var i = 0; i < n; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = ind[i];
        ind[i] = ind[j];
        ind[j] = t;
    }
    return ind.slice(0, k).map(function (n) { return list[n]; }).join('<br>');
}
