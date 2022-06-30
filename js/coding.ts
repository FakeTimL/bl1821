class Blog {
  private static monthArr: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private static labelArr: string[] = [
    "LeetCode", // 1
    "Contest",  // 2
    "Fun",      // 4
    "Practice", // 8
    "Project",  // 16
    "Java",     // 32
    "Python",   // 64
    "Miscellaneous" // 128
  ];

  private date: string;
  private reference: string;

  private labels: string[] = [];
  private image: string;
  private title: string;
  private abstract: string;

  constructor(day: number, month: number, year: number, reference: string, label: number = 128, image: string = null, title: string = "Some thoughts...", abstract: string = "...") {
    this.date = `${day} ${Blog.monthArr[month - 1]} 20${year}`;
    this.reference = `coding/${reference}.html`
    for (let i = 0; i < Blog.labelArr.length; i++)
      if ((label & 1 << i) > 0) this.labels.push(Blog.labelArr[i]);
    if (image != null) this.image = `https://drive.google.com/uc?export=view&id=${image}`;
    this.title = title;
    this.abstract = abstract;
  }

  private imageColumn(): HTMLDivElement {
    const column = document.createElement("div");
    column.className = "right aligned six wide column";

    const link = document.createElement("a");
    link.href = this.reference

    const image = document.createElement("img");
    image.className = "ui middle aligned medium bordered rounded image";
    image.src = this.image;

    link.appendChild(image);
    column.appendChild(link);
    return column;
  }

  private contentColumn(fillRow: boolean = false): HTMLDivElement {
    const column = document.createElement("div");
    column.className = `${fillRow ? "ten" : "eight"} wide column`;
    column.appendChild(this.header());
    if (this.abstract != null) {
      const abstract = document.createElement("div");
      abstract.className = "ui tall stacked segment"

      const text = document.createElement("p");
      text.innerText = this.abstract;

      const link = document.createElement("a");
      link.href = this.reference;
      link.innerText = " ";

      const underline = document.createElement("u");
      underline.innerText = "Read more >>";

      link.appendChild(underline);
      text.appendChild(link);
      abstract.appendChild(text);
      column.appendChild(abstract);
    }
    column.appendChild(this.extraBlock());
    return column;
  }

  private header(): HTMLDivElement {
    const header = document.createElement("h2");
    header.className = "ui header";

    const icon = document.createElement("i");
    icon.className = "edit icon";
    header.appendChild(icon);

    const content = document.createElement("div");
    content.className = "content";

    const date = document.createTextNode(this.title);
    content.appendChild(date);

    const subheader = document.createElement("div");
    subheader.className = "sub header";
    subheader.innerText = this.date;
    content.appendChild(subheader);

    header.appendChild(content);

    return header;
  }

  private extraBlock(): HTMLDivElement {
    const block = document.createElement("div");
    this.labels.forEach(text => {
      const label = document.createElement("a");
      label.className = "ui label";
      label.innerText = text;
      block.appendChild(label);
    });
    return block;
  }

  postRow(container: HTMLElement, fillRow: boolean = false): void {
    const row = document.createElement("div");
    if (this.image == null) {
      row.className = "centered row"
    } else {
      row.className = "row";
      row.appendChild(this.imageColumn());
    }
    row.appendChild(this.contentColumn(fillRow));
    container.appendChild(row);
  }
}

const blogs: Blog[] = [
  new Blog(13, 3, 22, "three_dijkstras", 35, null, "Three Dijkstra's, One Path", "So I did it again. After 9 weeks of relentless lectures and deadline battles, I sat down at the countdown timer once more. The last contest still felt like yesterday; however, I definitely came more prepared this time...")
];
const roomVolume: number = 10; // number of posts per page
const roomSpan: number = 2; // number of navigable pages
const roomMaxPage: number = Math.ceil(blogs.length / roomVolume);

var blogContainer: HTMLElement;
var blogNavigation: HTMLElement;
var roomCurPage: number = 0;

function setupRoom(container: HTMLElement, navigation: HTMLElement): void {
  blogContainer = container;
  blogNavigation = navigation;
}

function loadRoom(page: number): void {
  page = Math.min(page, roomMaxPage); // validate
  if (page == roomCurPage) return;

  roomCurPage = page;
  blogContainer.innerHTML = ""; // clear

  function resetNavigation(page: number): void {
    if (page == 0) return;
    blogNavigation.innerHTML = ""; // clear

    const list = document.createElement("div");
    list.className = "ui large horizontal celled list";
    list.style.marginRight = "10px";

    function addNavigation(page: number, list: HTMLElement): void {
      let item: HTMLElement;
      if (page == 0) {
        item = document.createElement("i");
        item.className = "ui disabled item";
        item.innerText = "···";
      } else {
        if (page == roomCurPage) {
          item = document.createElement("u");
          item.className = "ui disabled item";
        } else {
          item = document.createElement("a");
          item.className = "ui item";
          item.onclick = () => loadRoom(page);
        }
        item.innerText = page.toString();
      }
      list.appendChild(item);
    }

    addNavigation(1, list);
    if (page - roomSpan > 2) addNavigation(0, list);
    for (let i = Math.max(2, page - roomSpan); i <= Math.min(roomMaxPage - 1, page + roomSpan); i++) addNavigation(i, list);
    if (page + roomSpan < roomMaxPage - 1) addNavigation(0, list);
    if (roomMaxPage > 1) addNavigation(roomMaxPage, list);

    function goto(): HTMLElement {
      const box = document.createElement("div");
      box.className = "ui mini icon input"

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Go...";
      input.maxLength = 3;
      input.size = 3;
      input.onkeyup = (e) => {
        if (e.key == "Enter") {
          let page = parseInt(input.value);
          if (!isNaN(page) && page > 0) loadRoom(page);
          input.value = "";
        }
      }
      box.appendChild(input);

      const icon = document.createElement("i");
      icon.className = "paper plane icon";
      box.appendChild(icon);

      return box;
    }

    blogNavigation.append(list, goto());
  }
  resetNavigation(page);

  const volume = Math.min(roomVolume, blogs.length - (page - 1) * roomVolume);
  const start = (page - 1) * roomVolume;
  for (let i = 0; i < volume; i++) {
    blogs[start + i].postRow(blogContainer);
  }
}
