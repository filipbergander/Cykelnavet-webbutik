"use strict";

const navbar = document.getElementById("navBar");

const content = document.querySelector("main");

const openBtn = document.getElementById("open-sidebarbutton");

const closeBtn = document.getElementById("close-sidebarbutton");

const overlay = document.getElementById("overlay");

const mobileQuery = window.matchMedia("(max-width: 767px)"); // Matchar om skärmen är mindre än 876px, alltså mobilläge

mobileQuery.addEventListener("change", updatenavbar); // Lyssnar efter ändringar i skärmstorlek

function updatenavbar() {
    const trueMobile = mobileQuery.matches; // Stämmer om besökaren är i mobilläge
    if (trueMobile) { // Innehållet, main och nav, ska vara interaktiva från början i mobilläge
        content.removeAttribute("inert")
        navbar.removeAttribute("inert");
    } else { // Innehållet, main och nav, ska vara interaktiva från början i övriga lägen
        content.removeAttribute("inert");
        navbar.removeAttribute("inert");
    }
}

updatenavbar(); // funktionen körs när sidan laddas

function openSidebar() {
    navbar.classList.add("show"); // För att visa sidomenyn
    overlay.classList.add("show");
    openBtn.setAttribute("aria-expanded", "true"); // Ändrar aria-expanded till true när sidomenyn är öppen
    overlay.style.display = "block"; // Visar overlay när sidomenyn är öppen, vilket leder till att bakgrundsinnehållet blir mörkt
    if (mobileQuery.matches) {
        content.setAttribute("inert", ""); // Lägger till inert för att blockera interaktionen med huvudinnehållet när sidomenyn är öppen
        navbar.removeAttribute("inert"); // Tar bort inert så att interaktionen fortfarande fungerar i sidomenyn
    }
}

function closeSidebar() {
    navbar.classList.remove("show"); // För att dölja sidomenyn
    overlay.classList.remove("show");
    openBtn.setAttribute("aria-expanded", "false"); // Ändrar aria-expanded till false när sidomenyn är stängd
    overlay.style.display = "none"; // Dölj overlay när sidomenyn är stängd
    if (mobileQuery.matches) {
        content.removeAttribute("inert"); // Tar bort inert så att interaktionen fungerar i huvudinnehållet när sidomenyn är stängd
        navbar.setAttribute("inert", ""); // Lägger till inert för att blockera interaktionen med sidomenyn när den är stängd 
    } else { // Funktionen med att klicka på navigeringsmenyn ska fungera i desktopläge
        content.removeAttribute("inert");
        navbar.removeAttribute("inert");
    }
}

const navLinks = document.querySelectorAll("navbar a"); // Alla länkar i sidomenyn
navLinks.forEach(link => { // Stänger sidomenyn när en länk i menyn klickas
    link.addEventListener("click", () => {
        if (mobileQuery.matches) {
            closeSidebar(); // Stänger sidomenyn i mobilläge när en länk klickas, denna fungerar ändå eftersom man klickar på en länk så navigeras man till den sidan.
        }
    });
});