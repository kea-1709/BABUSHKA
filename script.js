let menu;
[]

document.addEventListener("DOMContentLoaded", start);

async function start() {
    let jsondata = await fetch("menu.json");
    menu = await jsondata.json();
    vis(menu, "Alle retter");
    lavfiltre();
}




function vis(arr, over) {
    let dest = document.querySelector("[data-menu]");
    let temp = document.querySelector("[data-menutemplate]");
    document.querySelector("#over").textContent = over;
    dest.innerHTML = "";
    arr.forEach(dish => {
        console.log("vis");

        let klon = temp.cloneNode(true).content;

        klon.querySelector("[data-Titel]").textContent = dish.kategori + ", " + dish.navn;

        klon.querySelector("[data-foto]").src = "imgs/small/" + "/" + dish.billede + "-sm.jpg";
        klon.querySelector("[data-foto]").alt = dish.billede;

        klon.querySelector(".wrap").setAttribute("data-id", dish.id);
        klon.querySelector(".wrap").addEventListener("click", openModal);


        klon.querySelector("[data-kortbeskrivelse]").textContent = dish.kortbeskrivelse;

        klon.querySelector("[data-pris]").textContent = "Pris:" + " " + dish.pris + ",-";

        dest.appendChild(klon);


    });
}

function openModal() {

    let myid = this.getAttribute("data-id");
    let single = menu.find(dish => {
        if (myid == dish.id) {
            document.querySelector("#popup").style.visibility = "visible";
            document.querySelector("[data-Titel]").textContent = dish.navn;
            document.querySelector("[data-foto]").src = "imgs/small/" + "/" + dish.billede + "-sm.jpg";
            document.querySelector("[data-foto]").alt = dish.billede;
            document.querySelector("[data-langbeskrivelse]").textContent = dish.langbeskrivelse;
            document.querySelector("[data-pris1]").textContent = "Pris:" + " " + dish.pris + ",-";
            document.querySelector("#close").addEventListener("click", () => {
                document.querySelector("#popup").style.visibility = "hidden";


            });
        }


        console.log(myid);
    });
}

function lavfiltre() {
    console.log("filtre");
    let forretter = menu.filter(dish => dish.kategori == "forretter");
    let hovedretter = menu.filter(dish => dish.kategori == "hovedretter");
    let desserter = menu.filter(dish => dish.kategori == "desserter");
    let drikkevarer = menu.filter(dish => dish.kategori == "drikkevarer");
    let sideorders = menu.filter(dish => dish.kategori == "sideorders")

    document.querySelector("#filter-alle").addEventListener("click", () => {
        vis(menu, "menu")
    })
    document.querySelector("#filter-forretter").addEventListener("click", () => {
        vis(forretter, "forretter")
    })
    document.querySelector("#filter-hovedretter").addEventListener("click", () => {
        vis(hovedretter, "hovedretter")
    })
    document.querySelector("#filter-desserter").addEventListener("click", () => {
        vis(desserter, "desserter")
    })
    document.querySelector("#filter-drikkevarer").addEventListener("click", () => {
        vis(drikkevarer, "drikkevarer")
    })
    document.querySelector("#filter-sideorders").addEventListener("click", () => {
        vis(sideorders, "sideorders")
    })
}
