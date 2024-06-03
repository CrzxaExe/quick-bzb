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
      fitur = [...r.sort((a, b) => a.name.localeCompare(b.name))];
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
    }</b><br/><p class="font-mono">${e.mc}</p></a>`;
  });

  fitur.forEach(e => {
    document.querySelector(
      "#fitur-list"
    ).innerHTML += `<a href="#fitur-${e.name.toLowerCase()}" class="p-1 px-2 first-letter:uppercase font-bold bg-slate-600 text-sm rounded mx-1">${
      e.name
    }</a>`;
    document.querySelector(
      "#fitur-index"
    ).innerHTML += `<div id="fitur-${e.name.toLowerCase()}" class="bg-slate-800 py-3 px-2 my-2 w-full lg:w-[46%] lg:mx-[2%] rounded"><h2 class="font-bold text-xl">${
      e.name.charAt(0).toUpperCase() + e.name.slice(1)
    }</h2><p class="whitespace-pre-wrap text-xs lg:text-sm">${e.content
      ?.map(s => {
        let ret = s,
          args = s.split(/\s+/).map(d => {
            return d.trim();
          });
        switch (args[0]) {
          case "%code":
            args.splice(
              0,
              1,
              "<span class='whitespace-pre bg-teal-900 source-code overflow-x-scroll py-1 text-xs px-1 block max-w-full'>"
            );
            args.push("</span>");
            ret = args
              .map(c => {
                let out = c.split("");
                if (c.startsWith("%")) {
                  switch (out[1]) {
                    case "g":
                      out.splice(0, 2, "<span class='text-emerald-200'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "G":
                      out.splice(0, 2, "<span class='text-gray-300'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "r":
                      out.splice(0, 2, "<span class='text-rose-500'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "l":
                      out.splice(0, 2, "<span class='text-lime-300'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "f":
                      out.splice(0, 2, "<span class='text-fuchsia-500'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "b":
                      out.splice(0, 2, "<span class='text-sky-400'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "y":
                      out.splice(0, 2, "<span class='text-amber-500'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                    case "o":
                      out.splice(0, 2, "<span class='text-orange-600'>");
                      out.splice(
                        out.findIndex(h => h === "#") !== -1
                          ? out.findIndex(h => h === "#")
                          : out.length,
                        1,
                        "</span>"
                      );
                      break;
                  }
                }
                return out.join("").replace(/-!/g, " ");
              })
              .join(" ");
            break;
        }
        return `${ret}`;
      })
      .join("\n\n")}</p></div>`;
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
