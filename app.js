const photos = [
  {
    src: "./assets/photo-01.webp",
    thumb: "./assets/thumb-01.webp",
    title: "风经过沙丘",
    chapter: "第一展厅",
    caption: "蓝天、沙丘和粉色花影，把夏天停在这一秒。",
    alt: "沙漠蓝天下戴帽子的粉色花裙人像",
    bg: "#151f2d",
    soft: "#c9a982",
    accent: "#f2b5b2"
  },
  {
    src: "./assets/photo-02.webp",
    thumb: "./assets/thumb-02.webp",
    title: "树影很轻",
    chapter: "第二展厅",
    caption: "木椅、树影和柔软的粉色，让画面像被风轻轻托住。",
    alt: "树影下穿粉色花裙的半身人像",
    bg: "#202824",
    soft: "#9aa68e",
    accent: "#efbbb9"
  },
  {
    src: "./assets/photo-03.webp",
    thumb: "./assets/thumb-03.webp",
    title: "晴空留白",
    chapter: "第三展厅",
    caption: "大面积蓝色天空把人物衬得很安静，像一本旅行画册的开页。",
    alt: "蓝天下沙丘旁穿粉色花裙的站姿人像",
    bg: "#17283c",
    soft: "#7ea6cf",
    accent: "#f1b5b4"
  },
  {
    src: "./assets/photo-04.webp",
    thumb: "./assets/thumb-04.webp",
    title: "靠近一点",
    chapter: "第四展厅",
    caption: "树干纹理和近景肖像形成自然画框，温柔又有层次。",
    alt: "树下粉色花裙近景人像",
    bg: "#2b211b",
    soft: "#b28b6b",
    accent: "#efbbb9"
  },
  {
    src: "./assets/photo-05.webp",
    thumb: "./assets/thumb-05.webp",
    title: "光落在眼睛里",
    chapter: "第五展厅",
    caption: "近景保留呼吸感，背景被柔化成一片轻亮的夏日。",
    alt: "粉色花裙室外近景自拍",
    bg: "#241f1b",
    soft: "#d9c7a6",
    accent: "#efb8b8"
  },
  {
    src: "./assets/photo-06.webp",
    thumb: "./assets/thumb-06.webp",
    title: "山色作背景",
    chapter: "第六展厅",
    caption: "暖色山丘像天然幕布，把人物轮廓衬得更清晰。",
    alt: "七彩丘陵前的长发人像",
    bg: "#2d221f",
    soft: "#c29278",
    accent: "#e7b5aa"
  },
  {
    src: "./assets/photo-07.webp",
    thumb: "./assets/thumb-07.webp",
    title: "一点俏皮",
    chapter: "第七展厅",
    caption: "动作更轻快，展厅从静态肖像转进明亮的旅行瞬间。",
    alt: "七彩丘陵前比手势的长发人像",
    bg: "#33241f",
    soft: "#d0a07d",
    accent: "#f0c2b1"
  },
  {
    src: "./assets/photo-08.webp",
    thumb: "./assets/thumb-08.webp",
    title: "笑意收藏",
    chapter: "第八展厅",
    caption: "柔和的浅色天空和笑意，让整张照片变得很轻。",
    alt: "七彩丘陵前微笑人像",
    bg: "#2f2622",
    soft: "#d5b392",
    accent: "#f3c8af"
  },
  {
    src: "./assets/photo-09.webp",
    thumb: "./assets/thumb-09.webp",
    title: "风里侧脸",
    chapter: "第九展厅",
    caption: "帽檐压住一点光，山色和黑色帽子让画面更有电影感。",
    alt: "戴黑色帽子的七彩丘陵人像",
    bg: "#1f1c1a",
    soft: "#b48f72",
    accent: "#e7bca4"
  },
  {
    src: "./assets/photo-10.webp",
    thumb: "./assets/thumb-10.webp",
    title: "室内的安静",
    chapter: "第十展厅",
    caption: "深色衣服和窗边光线形成对比，像展览里突然安静下来的一间房。",
    alt: "室内窗边黑衣短发人像",
    bg: "#12151b",
    soft: "#8a8f95",
    accent: "#cfc4b6"
  },
  {
    src: "./assets/photo-11.webp",
    thumb: "./assets/thumb-11.webp",
    title: "夜幕番外",
    chapter: "最终展厅",
    caption: "最后留一张完全不同的梦境，让展览在夜色里收尾。",
    alt: "黑色背景下银白幻想风艺术人像",
    bg: "#05070a",
    soft: "#11243a",
    accent: "#b8d7ff"
  }
];

const state = {
  index: 0,
  mode: "gallery",
  isAnimating: false,
  dragStartX: 0,
  dragStartY: 0,
  dragX: 0,
  dragY: 0,
  lastTap: 0,
  zoomed: false
};

const appShell = document.querySelector("#appShell");
const ambient = document.querySelector("#ambient");
const counter = document.querySelector("#counter");
const mainPhoto = document.querySelector("#mainPhoto");
const prevPreview = document.querySelector("#prevPreview");
const nextPreview = document.querySelector("#nextPreview");
const chapter = document.querySelector("#chapter");
const title = document.querySelector("#title");
const caption = document.querySelector("#caption");
const progressFill = document.querySelector("#progressFill");
const filmstrip = document.querySelector("#filmstrip");
const galleryMode = document.querySelector("#galleryMode");
const albumMode = document.querySelector("#albumMode");
const albumPanel = document.querySelector("#albumPanel");
const openLightbox = document.querySelector("#openLightbox");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const closeLightbox = document.querySelector("#closeLightbox");
const toast = document.querySelector("#toast");

function wrapIndex(value) {
  return (value + photos.length) % photos.length;
}

function preloadAround(index) {
  [-1, 0, 1, 2].forEach((offset) => {
    const img = new Image();
    img.src = photos[wrapIndex(index + offset)].src;
  });
}

function setTheme(photo) {
  document.documentElement.style.setProperty("--bg", photo.bg);
  document.documentElement.style.setProperty("--bg-soft", photo.soft);
  document.documentElement.style.setProperty("--accent", photo.accent);
  ambient.style.setProperty("--ambient-image", `url("${photo.src}")`);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  metaTheme?.setAttribute("content", photo.bg);
}

function render() {
  const photo = photos[state.index];
  const previous = photos[wrapIndex(state.index - 1)];
  const next = photos[wrapIndex(state.index + 1)];
  setTheme(photo);
  counter.textContent = `${String(state.index + 1).padStart(2, "0")} / ${photos.length}`;
  mainPhoto.src = photo.src;
  mainPhoto.alt = photo.alt;
  prevPreview.src = previous.src;
  nextPreview.src = next.src;
  chapter.textContent = photo.chapter;
  title.textContent = photo.title;
  caption.textContent = photo.caption;
  progressFill.style.width = `${((state.index + 1) / photos.length) * 100}%`;
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxTitle.textContent = `${photo.chapter} · ${photo.title}`;
  document.querySelectorAll(".thumb-card").forEach((button, idx) => {
    button.classList.toggle("active", idx === state.index);
    if (idx === state.index && state.mode === "album") {
      button.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  });
  preloadAround(state.index);
}

function goTo(index, direction = 0) {
  if (state.isAnimating) return;
  state.index = wrapIndex(index);
  state.isAnimating = true;
  appShell.style.setProperty("--drag-y", `${direction * 18}px`);
  appShell.style.setProperty("--main-scale", "0.985");
  appShell.style.setProperty("--copy-shift", `${direction * -8}px`);
  window.setTimeout(() => {
    render();
    appShell.style.setProperty("--drag-y", "0px");
    appShell.style.setProperty("--main-scale", "1");
    appShell.style.setProperty("--copy-shift", "0px");
  }, 90);
  window.setTimeout(() => {
    state.isAnimating = false;
  }, 480);
}

function setMode(mode) {
  state.mode = mode;
  appShell.classList.toggle("album-active", mode === "album");
  galleryMode.classList.toggle("active", mode === "gallery");
  albumMode.classList.toggle("active", mode === "album");
  if (mode === "album") {
    document.querySelectorAll(".thumb-card")[state.index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}

function buildFilmstrip() {
  filmstrip.innerHTML = "";
  photos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "thumb-card";
    button.type = "button";
    button.setAttribute("role", "listitem");
    button.setAttribute("aria-label", `查看${photo.chapter}：${photo.title}`);
    button.innerHTML = `<img src="${photo.thumb}" alt="${photo.alt}" loading="lazy"><span>${photo.title}</span>`;
    button.addEventListener("click", () => {
      state.index = index;
      render();
      setMode("gallery");
    });
    filmstrip.appendChild(button);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function openViewer() {
  if (lightbox.open) return;
  resetZoom();
  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    lightbox.setAttribute("open", "");
  }
  closeLightbox.focus({ preventScroll: true });
}

function closeViewer() {
  resetZoom();
  lightbox.close?.();
  lightbox.removeAttribute("open");
  window.scrollTo(0, 0);
  openLightbox.focus({ preventScroll: true });
}

function resetZoom() {
  state.zoomed = false;
  lightboxImage.style.setProperty("--zoom", "1");
  lightboxImage.style.setProperty("--zoom-x", "0px");
  lightboxImage.style.setProperty("--zoom-y", "0px");
}

async function sharePage() {
  const shareData = {
    title: "Photo Gallery",
    text: "一座只为照片而存在的移动端艺术展。",
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    showToast("链接已复制");
  } catch {
    showToast("分享已取消");
  }
}

function onStagePointerDown(event) {
  if (state.mode !== "gallery" || lightbox.open) return;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.dragX = 0;
  state.dragY = 0;
  event.currentTarget.setPointerCapture?.(event.pointerId);
}

function onStagePointerMove(event) {
  if (state.mode !== "gallery" || lightbox.open || !event.currentTarget.hasPointerCapture?.(event.pointerId)) return;
  state.dragX = event.clientX - state.dragStartX;
  state.dragY = event.clientY - state.dragStartY;
  if (Math.abs(state.dragY) > Math.abs(state.dragX)) {
    event.preventDefault();
    const eased = Math.sign(state.dragY) * Math.min(70, Math.abs(state.dragY) * 0.42);
    appShell.style.setProperty("--drag-y", `${eased}px`);
    appShell.style.setProperty("--main-scale", `${1 - Math.min(0.035, Math.abs(state.dragY) / 6000)}`);
  }
}

function onStagePointerUp(event) {
  if (state.mode !== "gallery" || lightbox.open) return;
  event.currentTarget.releasePointerCapture?.(event.pointerId);
  const vertical = Math.abs(state.dragY) > Math.abs(state.dragX);
  const shouldMove = vertical && Math.abs(state.dragY) > 54;
  appShell.style.setProperty("--drag-y", "0px");
  appShell.style.setProperty("--main-scale", "1");
  if (shouldMove) {
    goTo(state.index + (state.dragY < 0 ? 1 : -1), state.dragY < 0 ? 1 : -1);
  } else if (Math.abs(state.dragX) < 10 && Math.abs(state.dragY) < 10) {
    const tapped = document.elementFromPoint(event.clientX, event.clientY);
    if (tapped?.closest(".center-frame")) openViewer();
  }
  state.dragX = 0;
  state.dragY = 0;
}

function onLightboxPointerDown(event) {
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  event.currentTarget.setPointerCapture?.(event.pointerId);
}

function onLightboxPointerUp(event) {
  const dx = event.clientX - state.dragStartX;
  const dy = event.clientY - state.dragStartY;
  event.currentTarget.releasePointerCapture?.(event.pointerId);
  if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy)) {
    goTo(state.index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    resetZoom();
  }
}

function onDoubleTap(event) {
  const now = Date.now();
  if (now - state.lastTap < 280) {
    state.zoomed = !state.zoomed;
    lightboxImage.style.setProperty("--zoom", state.zoomed ? "1.7" : "1");
    lightboxImage.style.setProperty("--zoom-x", "0px");
    lightboxImage.style.setProperty("--zoom-y", "0px");
    event.preventDefault();
  }
  state.lastTap = now;
}

function handleKey(event) {
  if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "ArrowRight") {
    goTo(state.index + 1, 1);
  }
  if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "ArrowLeft") {
    goTo(state.index - 1, -1);
  }
  if (event.key === "Home") goTo(0, -1);
  if (event.key === "End") goTo(photos.length - 1, 1);
  if (event.key === "Escape" && lightbox.open) closeViewer();
}

let wheelLock = false;
function handleWheel(event) {
  if (state.mode !== "gallery" || lightbox.open) return;
  event.preventDefault();
  if (wheelLock || Math.abs(event.deltaY) < 20) return;
  wheelLock = true;
  goTo(state.index + (event.deltaY > 0 ? 1 : -1), event.deltaY > 0 ? 1 : -1);
  window.setTimeout(() => {
    wheelLock = false;
  }, 620);
}

document.querySelector("#prevButton").addEventListener("click", () => goTo(state.index - 1, -1));
document.querySelector("#nextButton").addEventListener("click", () => goTo(state.index + 1, 1));
document.querySelector("#lightboxPrev").addEventListener("click", () => goTo(state.index - 1, -1));
document.querySelector("#lightboxNext").addEventListener("click", () => goTo(state.index + 1, 1));
galleryMode.addEventListener("click", () => setMode("gallery"));
albumMode.addEventListener("click", () => setMode("album"));
document.querySelector("#shareButton").addEventListener("click", sharePage);
openLightbox.addEventListener("click", openViewer);
document.querySelector(".center-frame").addEventListener("click", openViewer);
closeLightbox.addEventListener("click", closeViewer);
lightbox.addEventListener("click", (event) => {
  if (event.target?.dataset?.close === "true") closeViewer();
});
lightbox.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeViewer();
});
document.querySelector("#heroStage").addEventListener("pointerdown", onStagePointerDown);
document.querySelector("#heroStage").addEventListener("pointermove", onStagePointerMove, { passive: false });
document.querySelector("#heroStage").addEventListener("pointerup", onStagePointerUp);
document.querySelector("#heroStage").addEventListener("pointercancel", onStagePointerUp);
document.querySelector("#lightboxFrame").addEventListener("pointerdown", onLightboxPointerDown);
document.querySelector("#lightboxFrame").addEventListener("pointerup", onLightboxPointerUp);
document.querySelector("#lightboxFrame").addEventListener("click", onDoubleTap);
window.addEventListener("keydown", handleKey);
window.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("resize", () => render());

buildFilmstrip();
render();
