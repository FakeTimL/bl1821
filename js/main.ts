function loadMenuAndFooter(path: string = ""): void {
  const menu = document.createElement("div");
  const footer = document.createElement("div");
  postMenu(menu, path);
  postFooter(footer, path);
  document.body.prepend(menu);
  document.body.append(footer);
}

function postMenu(container: HTMLElement, path: string): void {
  function consLinkItem(text: string, iconName: string, url: string = null): HTMLElement {
    const item = document.createElement("a");
    if (url == null) {
      item.className = "disabled item";
    } else {
      item.className = "item";
      item.href = url;
    }
    const icon = document.createElement("i");
    icon.className = `${iconName} icon`;
    item.append(icon, text);
    return item;
  }
  function consFunctionalItem(text: string, iconName: string, enabled: boolean = true) {
    const item = document.createElement("div");
    item.className = "item";
    if (enabled) {
      item.setAttribute("data-tooltip", "Copy to clipboard!");
      item.setAttribute("data-position", "left center");
      item.onclick = () => {
        navigator.clipboard.writeText(text);
        item.setAttribute("data-tooltip", "Copied!");
      }
      item.onmouseout = () => {
        item.setAttribute("data-tooltip", "Copy to clipboard!");
      }
    }
    const icon = document.createElement("i");
    icon.className = `${iconName} icon`;
    item.append(icon, text);
    return item;
  }
  container.innerHTML = "";

  const menu = document.createElement("div");
  menu.className = "ui stackable fixed menu";
  const box = document.createElement("div");
  box.className = "ui container";

  const home = consLinkItem("Home", "home", `${path}index.html`);
  const cooking = consLinkItem("Cooking", "utensils", `${path}cooking.html`);
  const coding = consLinkItem("Coding", "bug", `${path}coding.html`);
  const cats = consLinkItem("Cats", "paw", `${path}cats.html`);

  const right = document.createElement("div");
  right.className = "right menu";

  const linkedin = consLinkItem("LinkedIn", "linkedin", "https://www.linkedin.com/in/bingqs/");
  const dropdown = document.createElement("div");
  dropdown.className = "ui simple dropdown item";

  const cIcon = document.createElement("i");
  cIcon.className = "phone square icon";
  const dIcon = document.createElement("i");
  dIcon.className = "dropdown icon";

  const dMenu = document.createElement("div");
  dMenu.className = "menu";

  const map = consFunctionalItem("London, UK", "map marker alternate", false);
  const instagram = consLinkItem("faketiml", "instagram", "https://www.instagram.com/faketiml/");
  const wechat = consFunctionalItem("B1263539157", "wechat");
  const whatsapp = consFunctionalItem("+44 7732101179", "whatsapp");
  const email = consFunctionalItem("libingqiice@gmail.com", "mail");

  dMenu.append(map, instagram, wechat, whatsapp, email);
  dropdown.append(cIcon, "Contact Me", dIcon, dMenu);
  right.append(linkedin, dropdown);
  box.append(home, cooking, coding, cats, right);
  menu.appendChild(box);

  const divider = document.createElement("div");
  divider.className = "ui hidden section divider";
  container.append(menu, divider);
}

function postFooter(container: HTMLElement, path: string): void {
  function consColumn(...items: HTMLElement[]): HTMLElement {
    const column = document.createElement("div");
    column.className = "three wide column";
    const list = document.createElement("div");
    list.className = "ui inverted link list";
    items.forEach(item => list.appendChild(item));
    column.appendChild(list);
    return column;
  }
  function consItem(text: string, url: string = null): HTMLElement {
    const item = document.createElement("a");
    if (url == null) {
      item.className = "disabled item";
    } else {
      item.className = "item";
      item.href = url;
    }
    item.innerText = text;
    return item;
  }

  const footer = document.createElement("div");
  footer.className = "ui inverted vertical footer segment";
  const box = document.createElement("div");
  box.className = "ui center aligned container";

  const header = document.createElement("h4");
  header.className = "ui inverted header";
  header.innerText = "About";

  const grid = document.createElement("div");
  grid.className = "ui center aligned stackable inverted divided equal height grid";

  const left = consColumn(consItem("Coronavirus","https://coronavirus.data.gov.uk/"), consItem("Department Page", "https://www.imperial.ac.uk/computing"));
  const right = consColumn(consItem("Development", `${path}log.html`), consItem("Suggest a feature"));

  grid.append(left, right);
  box.append(header, grid);
  footer.appendChild(box);
  container.appendChild(footer);
}