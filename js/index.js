const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav-menu");
const downData = document.querySelector("#down-data");
let download = [],
  bzb = {},
  fitur = [];

menu.addEventListener("click", () => {
  toggle("#nav-menu", "hidden");
  toggle("#menu", "active");
});

function toggle(tag, tgl) {
  document.querySelector(tag).classList.toggle(tgl);
}

window.onload = async () => {
  await fetch("download.json")
    .then(e => e.json())
    .then(r => {
      download = [...r.reverse()];
    });
  await fetch("features.json")
    .then(e => e.json())
    .then(r => {
      fitur = [...r];
    });

  await fetch(
    "https://raw.githubusercontent.com/CrzxaExe/Zxra-web/master/bzb.json"
  )
    .then(e => e.json())
    .then(r => {
      bzb = { ...r };
    });

  document.querySelector("#download-latest").href = download[0].link;

  download.forEach((e, i) => {
    downData.innerHTML += `<a href="${
      e.link
    }" class='w-[48%] text-sm lg:text-base rounded transition duration-300 ease-in-out hover:bg-slate-00 lg:w-[23%] bg-slate-700/[0.8] mx-[1%] my-1 p-2 backdrop-blur-[4px]'><i class='bx bxs-file-blank'></i>${
      i === 0 ? "<r class='text-teal-200 font-bold'> [New]</r> " : ""
    }<b>${e.name}${e.build ? "<span>(" + e.build + ")</span>" : ""} ${
      e.versi
    }</b><br/><p class="font-mono">Mc ${e.mc}</p></a>`;
  });

  fitur.forEach(e => {
    document.querySelector(
      "#fitur-list"
    ).innerHTML += `<a href="#fitur-${e.name.toLowerCase()}" class="p-1 px-2 first-letter:uppercase font-bold bg-slate-600 text-sm rounded mx-1">${
      e.name
    }</a>`;
    document.querySelector(
      "#fitur-index"
    ).innerHTML += `<div id="fitur-${e.name.toLowerCase()}" class="bg-slate-800 py-5 px-3 my-2"><h2 class="font-bold text-xl">${
      e.name.charAt(0).toUpperCase() + e.name.slice(1)
    }</h2><p class="whitespace-pre-wrap text-xs lg:text-sm">${e.des
      .split(" ")
      .map(f => {
        return f
          .replace(
            /%code/g,
            "<p class='bg-indigo-900/[0.5] text-xs font-mono px-1 py-2'>"
          )
          .replace(/%t/g, "<span class='text-teal-800'>")
          .replace(/%gr/g, "<span class='text-gray-600'>")
          .replace(/%g/g, "<span class='text-green-600'>")
          .replace(/%R/g, "<span class='text-red-700'>")
          .replace(/%y/g, "<span class='text-yellow-300'>")
          .replace(/%r/g, "<span class='text-rose-400'>")
          .replace(/%#/g, "</span>")
          .replace(/%=code/g, "</p>");
      })
      .join(" ")}</p></div>`;
  });

  Object.keys(bzb.down[0].update)
    .sort((a, b) => a.localeCompare(b))
    .forEach(e => {
      let ups = bzb.down[0].update[e]
        .sort((c, d) => c.localeCompare(d))
        .map(s => {
          return s.replace(/\n/g, "<br/>&nbsp; &nbsp; ");
        })
        .join("\n• ");
      document.querySelector(
        "#changes"
      ).innerHTML += `<div class="whitespace-pre-wrap w-full bg-slate-700 px-7 rounded p-3 my-2"><b class="text-lg lg:text-xl underline">${
        e.charAt(0).toUpperCase() + e.slice(1)
      }</b><p class="text-xs lg:text-sm">• ${ups}</p></div>`;
    });
};
