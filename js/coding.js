var Blog = /** @class */ (function () {
    function Blog(day, month, year, reference, label, image, title, abstract) {
        if (label === void 0) { label = 128; }
        if (image === void 0) { image = null; }
        if (title === void 0) { title = "Some thoughts..."; }
        if (abstract === void 0) { abstract = "..."; }
        this.labels = [];
        this.date = "".concat(day, " ").concat(Blog.monthArr[month - 1], " 20").concat(year);
        this.reference = "coding/".concat(reference, ".html");
        for (var i = 0; i < Blog.labelArr.length; i++)
            if ((label & 1 << i) > 0)
                this.labels.push(Blog.labelArr[i]);
        if (image != null)
            this.image = "https://drive.google.com/uc?export=view&id=".concat(image);
        this.title = title;
        this.abstract = abstract;
    }
    Blog.prototype.imageColumn = function () {
        var column = document.createElement("div");
        column.className = "right aligned six wide column";
        var link = document.createElement("a");
        link.href = this.reference;
        var image = document.createElement("img");
        image.className = "ui middle aligned medium bordered rounded image";
        image.src = this.image;
        link.appendChild(image);
        column.appendChild(link);
        return column;
    };
    Blog.prototype.contentColumn = function (fillRow) {
        if (fillRow === void 0) { fillRow = false; }
        var column = document.createElement("div");
        column.className = "".concat(fillRow ? "ten" : "eight", " wide column");
        column.appendChild(this.header());
        if (this.abstract != null) {
            var abstract = document.createElement("div");
            abstract.className = "ui tall stacked segment";
            var text = document.createElement("p");
            text.innerText = this.abstract;
            var link = document.createElement("a");
            link.href = this.reference;
            link.innerText = " ";
            var underline = document.createElement("u");
            underline.innerText = "Read more >>";
            link.appendChild(underline);
            text.appendChild(link);
            abstract.appendChild(text);
            column.appendChild(abstract);
        }
        column.appendChild(this.extraBlock());
        return column;
    };
    Blog.prototype.header = function () {
        var header = document.createElement("h2");
        header.className = "ui header";
        var icon = document.createElement("i");
        icon.className = "edit icon";
        header.appendChild(icon);
        var content = document.createElement("div");
        content.className = "content";
        var date = document.createTextNode(this.title);
        content.appendChild(date);
        var subheader = document.createElement("div");
        subheader.className = "sub header";
        subheader.innerText = this.date;
        content.appendChild(subheader);
        header.appendChild(content);
        return header;
    };
    Blog.prototype.extraBlock = function () {
        var block = document.createElement("div");
        this.labels.forEach(function (text) {
            var label = document.createElement("a");
            label.className = "ui label";
            label.innerText = text;
            block.appendChild(label);
        });
        return block;
    };
    Blog.prototype.postRow = function (container, fillRow) {
        if (fillRow === void 0) { fillRow = false; }
        var row = document.createElement("div");
        if (this.image == null) {
            row.className = "centered row";
        }
        else {
            row.className = "row";
            row.appendChild(this.imageColumn());
        }
        row.appendChild(this.contentColumn(fillRow));
        container.appendChild(row);
    };
    Blog.monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    Blog.labelArr = [
        "LeetCode",
        "Contest",
        "Fun",
        "Practice",
        "Project",
        "Java",
        "Python",
        "Miscellaneous" // 128
    ];
    return Blog;
}());
var blogs = [
    new Blog(13, 3, 22, "three_dijkstras", 35, null, "Three Dijkstra's, One Path", "So I did it again. After 9 weeks of relentless lectures and deadline battles, I sat down at the countdown timer once more. The last contest still felt like yesterday; however, I definitely came more prepared this time...")
];
var roomVolume = 10; // number of posts per page
var roomSpan = 2; // number of navigable pages
var roomMaxPage = Math.ceil(blogs.length / roomVolume);
var blogContainer;
var blogNavigation;
var roomCurPage = 0;
function setupRoom(container, navigation) {
    blogContainer = container;
    blogNavigation = navigation;
}
function loadRoom(page) {
    page = Math.min(page, roomMaxPage); // validate
    if (page == roomCurPage)
        return;
    roomCurPage = page;
    blogContainer.innerHTML = ""; // clear
    function resetNavigation(page) {
        if (page == 0)
            return;
        blogNavigation.innerHTML = ""; // clear
        var list = document.createElement("div");
        list.className = "ui large horizontal celled list";
        list.style.marginRight = "10px";
        function addNavigation(page, list) {
            var item;
            if (page == 0) {
                item = document.createElement("i");
                item.className = "ui disabled item";
                item.innerText = "···";
            }
            else {
                if (page == roomCurPage) {
                    item = document.createElement("u");
                    item.className = "ui disabled item";
                }
                else {
                    item = document.createElement("a");
                    item.className = "ui item";
                    item.onclick = function () { return loadRoom(page); };
                }
                item.innerText = page.toString();
            }
            list.appendChild(item);
        }
        addNavigation(1, list);
        if (page - roomSpan > 2)
            addNavigation(0, list);
        for (var i = Math.max(2, page - roomSpan); i <= Math.min(roomMaxPage - 1, page + roomSpan); i++)
            addNavigation(i, list);
        if (page + roomSpan < roomMaxPage - 1)
            addNavigation(0, list);
        if (roomMaxPage > 1)
            addNavigation(roomMaxPage, list);
        function goto() {
            var box = document.createElement("div");
            box.className = "ui mini icon input";
            var input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Go...";
            input.maxLength = 3;
            input.size = 3;
            input.onkeyup = function (e) {
                if (e.key == "Enter") {
                    var page_1 = parseInt(input.value);
                    if (!isNaN(page_1) && page_1 > 0)
                        loadRoom(page_1);
                    input.value = "";
                }
            };
            box.appendChild(input);
            var icon = document.createElement("i");
            icon.className = "paper plane icon";
            box.appendChild(icon);
            return box;
        }
        blogNavigation.append(list, goto());
    }
    resetNavigation(page);
    var volume = Math.min(roomVolume, blogs.length - (page - 1) * roomVolume);
    var start = (page - 1) * roomVolume;
    for (var i = 0; i < volume; i++) {
        blogs[start + i].postRow(blogContainer);
    }
}
