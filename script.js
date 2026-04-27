const downloadOptions = [
  {
    key: "mac",
    title: "Download for Mac",
    subtitle: "macOS universal desktop build",
    icon: "",
    href: "https://pankh.email",
    aliases: ["mac", "macos", "darwin"],
  },
  {
    key: "ios",
    title: "Download for iOS",
    subtitle: "iPhone and iPad build",
    icon: "",
    href: "https://pankh.email",
    aliases: ["iphone", "ipad", "ios"],
  },
  {
    key: "android",
    title: "Download for Android",
    subtitle: "Android phones and tablets",
    icon: "▶",
    href: "https://pankh.email",
    aliases: ["android"],
  },
  {
    key: "windows",
    title: "Download for Windows 11, 10",
    subtitle: "Recommended Windows installer",
    icon: "⊞",
    href: "https://pankh.email",
    aliases: ["windows", "win32", "win64"],
  },
  {
    key: "windows-exe",
    title: "Download for Windows (exe)",
    subtitle: "Classic executable package",
    icon: "⊞",
    href: "https://pankh.email",
    aliases: [],
  },
  {
    key: "linux",
    title: "Download for Linux SNAP",
    subtitle: "Linux desktop distribution",
    icon: "✦",
    href: "https://pankh.email",
    aliases: ["linux", "x11", "ubuntu"],
  },
  {
    key: "huawei",
    title: "Download for Huawei",
    subtitle: "Huawei AppGallery release",
    icon: "H",
    href: "https://pankh.email",
    aliases: ["harmony", "huawei"],
  },
];

const primaryDownloadButton = document.getElementById("primaryDownloadButton");
const downloadOptionsList = document.getElementById("downloadOptions");
const platformHint = document.getElementById("platformHint");
const toggleOptionsButton = document.getElementById("toggleOptionsButton");

let selectedOption = null;

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/harmony|huawei/.test(ua)) return "huawei";
  if (/mac/.test(platform) || /macintosh/.test(ua)) return "mac";
  if (/win/.test(platform) || /windows/.test(ua)) return "windows";
  if (/linux|x11/.test(platform) || /linux/.test(ua)) return "linux";
  return "mac";
}

function getOptionByKey(key) {
  return downloadOptions.find((option) => option.key === key) || downloadOptions[0];
}

function setSelectedOption(optionKey) {
  selectedOption = getOptionByKey(optionKey);
  primaryDownloadButton.textContent = selectedOption.title;
  primaryDownloadButton.dataset.href = selectedOption.href;
  platformHint.textContent = `Recommended for ${selectedOption.title.replace("Download for ", "")}`;

  document
    .querySelectorAll(".download-option")
    .forEach((button) => button.classList.toggle("is-active", button.dataset.key === selectedOption.key));
}

function renderOptions() {
  downloadOptionsList.innerHTML = "";

  downloadOptions.forEach((option) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "download-option";
    button.dataset.key = option.key;
    button.innerHTML = `
      <span class="download-option__icon">${option.icon}</span>
      <span class="download-option__text">
        <span class="download-option__title">${option.title}</span>
        <span class="download-option__subtitle">${option.subtitle}</span>
      </span>
    `;
    button.addEventListener("click", () => setSelectedOption(option.key));
    item.appendChild(button);
    downloadOptionsList.appendChild(item);
  });
}

function wireInteractions() {
  primaryDownloadButton.addEventListener("click", () => {
    const href = primaryDownloadButton.dataset.href || "#download";
    window.location.hash = href;
  });

  toggleOptionsButton.addEventListener("click", () => {
    const expanded = toggleOptionsButton.getAttribute("aria-expanded") === "true";
    toggleOptionsButton.setAttribute("aria-expanded", String(!expanded));
    downloadOptionsList.hidden = expanded;
    toggleOptionsButton.querySelector("span").textContent = expanded ? "Show" : "Hide";
  });
}

renderOptions();
setSelectedOption(detectPlatform());
wireInteractions();
