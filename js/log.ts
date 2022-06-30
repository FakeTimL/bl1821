class Log {
  private static separator: string[] = ["[", "|", "]"];
  private static commonMsg(): HTMLDivElement {
    const item = document.createElement("div");
    item.className = "item";
    item.innerText = 'Petted the cat. "Meow!~"';
    return item;
  }

  private text: string;
  private children: Log[];

  constructor(text: string, children: Log[] = []) {
    this.text = text;
    this.children = children;
  }

  postItem(container: HTMLElement): void {
    const item = document.createElement("div");
    item.className = "item";

    // Text analysis
    let phrase;
    for (let i = 0, j = this.text.indexOf(Log.separator[0]), p = 0; i < this.text.length;
      i = j + 1, p = (p + 1) % 3, j = this.text.indexOf(Log.separator[p], i)) {
      if (j < 0) j = this.text.length;
      const text = this.text.substring(i, j);
      switch (p) {
        case 0:
          item.appendChild(document.createTextNode(text));
          break;
        case 1:
          phrase = text;
          break;
        case 2:
          let link;
          if (text == "") {
            link = document.createElement("s");
          } else {
            link = document.createElement("a");
            link.href = text;
          }
          link.innerText = phrase;
          item.appendChild(link);
          break;
      }
    }

    // Build sublist
    if (this.children.length > 0) {
      const list = document.createElement("div");
      list.className = "ui list";
      this.children.forEach(child => child.postItem(list));
      item.appendChild(list);
    }

    container.appendChild(item);
  }

  postWrap(container: HTMLElement, title: string = "Updates on"): void {
    const wrap = document.createElement("div");
    const header = document.createElement("h3");
    header.className = "ui header";
    header.innerText = `${title} ${this.text}`;
    wrap.appendChild(header);

    const list = document.createElement("div");
    list.className = "ui bulleted list";
    this.children.forEach(child => child.postItem(list));
    list.appendChild(Log.commonMsg());
    wrap.appendChild(list);

    const divider = document.createElement("div");
    divider.className = "ui section divider";
    wrap.appendChild(divider);
    container.appendChild(wrap);
  }
}

const logs: Log[] = [
  new Log("21/5",[
    new Log("Made the [cooking post|cooking.html] labels more lively :D")
  ]),
  new Log("18/5",[
    new Log("Added Covid-19 status update at the bottom of [home page|index.html].")
  ]),
  new Log("14/5",[
    new Log("Added a button at [home page|index.html] to listen with me the favourite song of the day!")
  ]),
  new Log("7/4",[
    new Log("Fixed an issue that potentially exposes the location of the [SECRET BUTTON|].")
  ]),
  new Log("27/3", [
    new Log("The labels of [cooking posts|cooking.html] can now be used as filters! Click on the labels to filter out all posts with that label."),
    new Log("The [coding page|coding.html] has officially been launched! Go and check out the articles!"),
    new Log("Changed the title of new updates at [home page|index.html] to 'What's new?'.")
  ]),
  new Log("23/3", [
    new Log("Made the articles of [coding posts|coding.html] accessible through clicking the thumbnails.")
  ]),
  new Log("22/3", [
    new Log("Made the containers of latest posts at [home page|index.html] wider."),
    new Log("Added strikethroughs for disabled [links|] in [history logs|log.html]."),
    new Log("Removed some random console messages left from earlier debugging.")
  ]),
  new Log("21/3", [
    new Log("Refined the layout of and added functionality to the [coding page|coding.html].", [
      new Log("Modified some of the elements to appear distinct from [cooking posts|cooking.html].", [
        new Log("Moved the date down to the subheader and title up to the main header."),
        new Log("Changed the blog icon."),
        new Log("Boxed the abstract inside a stacked segment."),
        new Log("Added a 'Read more' button linking to the article page."),
        new Log("Created meaningful tags to the collection.")
      ]),
      new Log("Implemented auto-polling of latest blog at [home page|index.html].", [
        new Log("Fixed the link from the section header.")
      ])
    ]),
  ]),
  new Log("20/3", [
    new Log("Attempted at different implementations of class structures to allow for the [coding page|coding.html].", [
      new Log("(DEBUG feature) It currently appears the same as the [cooking page|cooking.html] with one test blog and content placeholders."),
    ]),
    new Log("Experimented display of pages transcripted from markdown files.", [
      new Log("(DEBUG feature) The sample page can be temporarily accessed [here|]."),
      new Log("The contents are completely irrelevant, for testing purposes only and subject to change.")
    ]),
    new Log("Added link to [Coronavirus|https://coronavirus.data.gov.uk/] page.")
  ]),
  new Log("19/3", [
    new Log("Updated url for [LinkedIn page|https://www.linkedin.com/in/bingqs/] in contact details.")
  ]),
  new Log("18/3", [
    new Log("Implemented javascript to dynamically load menu and footer for each page.", [
      new Log("Added message response to copying contact details.")
    ]),
    new Log("Fixed titles of [cat|cats.html] and [log|log.html] pages.")
  ]),
  new Log("17/3", [
    new Log("Powered the [development history|log.html] by javascript.", [
      new Log("Enabled auto-polling of latest update at [home page|index.html].")
    ]),
    new Log("Implemented page navigation for [cooking posts|cooking.html]."),
    new Log("Shifted the poor distorted cat back in its shape.")
  ]),
  new Log("16/3", [
    new Log("The [cooking posts|cooking.html] are now powered by javascript!", [
      new Log("Changed the layout to display 10 posts per page."),
      new Log("Empty time durations are now hidden."),
      new Log("(DEBUG feature) Click any of the labels to navigate to the next page.")
    ]),
    new Log("Implemented automatic polling of cooking posts of the [latest posts|cooking.html] section.")
  ]),
  new Log("12/3", [
    new Log("Implemented the page for [development history|log.html]."),
    new Log("Modified layout of [cooking blogs|cooking.html] to hide empty titles and descriptions.")
  ]),
  new Log("11/3", [
    new Log("Changed the [home page|index.html] to display more meaningful contents.", [
      new Log("Added 'Latest posts' section for each block."),
      new Log("Added the [SECRET BUTTON|]!")
    ]),
    new Log("Added a mute/unmute button for [the cat|cats.html]."),
    new Log("Fixed the menu to stay at the top of the page while scrolling."),
    new Log("Changed layout and added 'suggest a feature' option in the footer, yet to be implemented.", [
      new Log("I may be too busy (lazy) to do it so better just message me instead ^o^")
    ])
  ])
];

function display(container: HTMLElement): void {
  logs.forEach(log => log.postWrap(container));
}