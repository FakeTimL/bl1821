function loadMenuAndFooter(path) {
    if (path === void 0) { path = ""; }
    var menu = document.createElement("div");
    var footer = document.createElement("div");
    postMenu(menu, path);
    postFooter(footer, path);
    document.body.prepend(menu);
    document.body.append(footer);
}
function postMenu(container, path) {
    function consLinkItem(text, iconName, url) {
        if (url === void 0) { url = null; }
        var item = document.createElement("a");
        if (url == null) {
            item.className = "disabled item";
        }
        else {
            item.className = "item";
            item.href = url;
        }
        var icon = document.createElement("i");
        icon.className = "".concat(iconName, " icon");
        item.append(icon, text);
        return item;
    }
    function consFunctionalItem(text, iconName, enabled) {
        if (enabled === void 0) { enabled = true; }
        var item = document.createElement("div");
        item.className = "item";
        if (enabled) {
            item.setAttribute("data-tooltip", "Copy to clipboard!");
            item.setAttribute("data-position", "left center");
            item.onclick = function () {
                navigator.clipboard.writeText(text);
                item.setAttribute("data-tooltip", "Copied!");
            };
            item.onmouseout = function () {
                item.setAttribute("data-tooltip", "Copy to clipboard!");
            };
        }
        var icon = document.createElement("i");
        icon.className = "".concat(iconName, " icon");
        item.append(icon, text);
        return item;
    }
    container.innerHTML = "";
    var menu = document.createElement("div");
    menu.className = "ui stackable fixed menu";
    var box = document.createElement("div");
    box.className = "ui container";
    var home = consLinkItem("Home", "home", "".concat(path, "index.html"));
    var cooking = consLinkItem("Cooking", "utensils", "".concat(path, "cooking.html"));
    var coding = consLinkItem("Coding", "bug", "".concat(path, "coding.html"));
    var cats = consLinkItem("Cats", "paw", "".concat(path, "cats.html"));
    var right = document.createElement("div");
    right.className = "right menu";
    var linkedin = consLinkItem("LinkedIn", "linkedin", "https://www.linkedin.com/in/bingqs/");
    var dropdown = document.createElement("div");
    dropdown.className = "ui simple dropdown item";
    var cIcon = document.createElement("i");
    cIcon.className = "phone square icon";
    var dIcon = document.createElement("i");
    dIcon.className = "dropdown icon";
    var dMenu = document.createElement("div");
    dMenu.className = "menu";
    var map = consFunctionalItem("London, UK", "map marker alternate", false);
    var instagram = consLinkItem("faketiml", "instagram", "https://www.instagram.com/faketiml/");
    var wechat = consFunctionalItem("B1263539157", "wechat");
    var whatsapp = consFunctionalItem("+44 7732101179", "whatsapp");
    var email = consFunctionalItem("libingqiice@gmail.com", "mail");
    dMenu.append(map, instagram, wechat, whatsapp, email);
    dropdown.append(cIcon, "Contact Me", dIcon, dMenu);
    right.append(linkedin, dropdown);
    box.append(home, cooking, coding, cats, right);
    menu.appendChild(box);
    var divider = document.createElement("div");
    divider.className = "ui hidden section divider";
    container.append(menu, divider);
}
function postFooter(container, path) {
    function consColumn() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var column = document.createElement("div");
        column.className = "three wide column";
        var list = document.createElement("div");
        list.className = "ui inverted link list";
        items.forEach(function (item) { return list.appendChild(item); });
        column.appendChild(list);
        return column;
    }
    function consItem(text, url) {
        if (url === void 0) { url = null; }
        var item = document.createElement("a");
        if (url == null) {
            item.className = "disabled item";
        }
        else {
            item.className = "item";
            item.href = url;
        }
        item.innerText = text;
        return item;
    }
    var footer = document.createElement("div");
    footer.className = "ui inverted vertical footer segment";
    var box = document.createElement("div");
    box.className = "ui center aligned container";
    var header = document.createElement("h4");
    header.className = "ui inverted header";
    header.innerText = "About";
    var grid = document.createElement("div");
    grid.className = "ui center aligned stackable inverted divided equal height grid";
    var left = consColumn(consItem("Coronavirus", "https://coronavirus.data.gov.uk/"), consItem("Department Page", "https://www.imperial.ac.uk/computing"));
    var right = consColumn(consItem("Development", "".concat(path, "log.html")), consItem("Suggest a feature"));
    grid.append(left, right);
    box.append(header, grid);
    footer.appendChild(box);
    container.appendChild(footer);
}
