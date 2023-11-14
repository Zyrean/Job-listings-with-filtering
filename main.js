"use strict";

const containerList = document.querySelector("#container-list");
const containerLanguages = document.querySelector("#container-languages");
const containerSearch = document.querySelector("#container-search");

const btnClear = document.querySelector("#btn-clear");

let searchResults = document.querySelectorAll(".search-result");
let searchResultClose = document.querySelectorAll(".search-result-close");
let filterElements = document.querySelectorAll(".filter-element");
let jobItems = document.querySelectorAll("#job-item");

const getData = async function (path) {
  try {
    const promise = fetch(path);
    const response = await promise;
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const displayJobs = function (data) {
  data.forEach((ele, i) => {
    const html = `<div
    id="job-item"
    class="relative flex flex-col bg-white rounded-md px-6 py-6 space-y-6 shadow-xl max-w-sm hover:border-desaturatedDarkCyan hover:border-l-4  hover:cursor-pointer md:flex-row md:max-w-full md:space-y-0 md:items-center"
  >

    <div id="icon-mobile" class="absolute -top-4 w-10">
      <img src="assets/images/${ele.company
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(".", "")}.svg" alt="" />
    </div>
    <div id="icon-desktop" class="hidden md:w-20">
      <img src="assets/images/${ele.company
        .toLowerCase()
        .replaceAll(" ", "")
        .replaceAll(".", "")}.svg" alt="" />
    </div>
    <!-- items information -->
    <div class="flex flex-col space-y-3 md:ml-6 md:space-y-2">
      <div class="flex items-center">
        <p
          class="mr-6 text-xs font-semibold text-desaturatedDarkCyan md:text-sm"
        >
        ${ele.company}
        </p>
        ${
          ele.new
            ? `<div
           class="bg-desaturatedDarkCyan rounded-3xl text-white text-xs text-center px-2 pt-1 mr-2"
          >
          NEW!
          </div>`
            : ``
        }
      ${
        ele.featured
          ? `<div
        class="bg-veryDarkGrayishCyan rounded-3xl text-white text-xs text-center px-2 pt-1"
      >
        FEATURED
      </div>`
          : ``
      }
      </div>
      <div>
        <p
          class="text-xs text-veryDarkGrayishCyan font-semibold md:text-lg hover:text-desaturatedDarkCyan hover:cursor-pointer"
        >
        ${ele.position} 
        </p>
      </div>
      <div
        class="flex space-x-2 text-xs border-b-2 pb-4 max-w-sm md:border-none md:pb-0"
      >
      <p class="text-desaturatedDarkCyan md:text-sm">${ele.postedAt}</p>
      <p class="text-desaturatedDarkCyan md:text-sm">&#8226;</p>
      <p class="text-desaturatedDarkCyan md:text-sm">${ele.contract}</p>
      <p class="text-desaturatedDarkCyan md:text-sm">&#8226;</p>
      <p class="text-desaturatedDarkCyan md:text-sm">${ele.location}</p>
      </div>
    </div>

    <div class="flex items-center flex-wrap gap-3 md:bg-red-500 md:flex-nowrap">
      <div
        class="filter-element flex group hover:cursor-pointer md:mr-0"
      >
        <div
          class="flex justify-center items-center bg-lightGrayishCyanF px-2 py-1 rounded-sm group-hover:bg-desaturatedDarkCyan"
        >
          <p
            class="text-desaturatedDarkCyan font-semibold text-sm group-hover:text-white"
          >
          ${ele.role}
          </p>
        </div>
      </div>
    
      <div
        class="filter-element flex group hover:cursor-pointer md:mr-0"
      >
        <div
          class="flex justify-center items-center bg-lightGrayishCyanF px-2 py-1 rounded-sm group-hover:bg-desaturatedDarkCyan"
        >
          <p
            class="text-desaturatedDarkCyan font-semibold text-sm group-hover:text-white"
          >
          ${ele.level}
          </p>
        </div>
      </div>

      <div
        id="container-languages"
        class="flex justify-center gap-3 items-center md:mt-0"
      >
      ${displayLanguages(ele)}
      </div>
      <div
        id="container-tools"
        class="flex justify-center gap-3 items-center md:mt-0"
      >
      ${displayTools(ele)}
      </div>
    </div>
  </div>`;

    containerList.insertAdjacentHTML("beforeend", html);
  });
};

const displayLanguages = function (ele) {
  let html = ``;
  ele.languages.forEach((language) => {
    html += `<div
  class="filter-element flex group hover:cursor-pointer md:mr-0"
  >
    <div
      class="flex justify-center items-center bg-lightGrayishCyanF px-2 py-1 rounded-sm group-hover:bg-desaturatedDarkCyan"
    >
      <p
        class="text-desaturatedDarkCyan font-semibold text-sm group-hover:text-white"
    >
      ${language}
    </p>
  </div>
</div>`;
  });
  return html;

  // containerLanguages.insertAdjacentHTML("afterbegin", language);
};

const displayTools = function (ele) {
  let html = ``;
  ele.tools.forEach((tool) => {
    html += `<div
  class="filter-element flex group hover:cursor-pointer md:mr-0"
  >
    <div
      class="flex justify-center items-center bg-lightGrayishCyanF px-2 py-1 rounded-sm group-hover:bg-desaturatedDarkCyan"
    >
      <p
        class="text-desaturatedDarkCyan font-semibold text-sm group-hover:text-white"
    >
      ${tool}
    </p>
  </div>
</div>`;
  });
  return html;

  // containerLanguages.insertAdjacentHTML("afterbegin", language);
};

const updateJobs = function () {
  searchResults = document.querySelectorAll(".search-result");
  jobItems = document.querySelectorAll("#job-item");
  console.log(searchResults);
  searchResults.forEach((res) => {
    jobItems.forEach((item) => {
      if (!item.outerText.includes(`${res.outerText}`)) {
        item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }
    });
  });
};

// Looping over searchresults and hide targeted element
const removeSearchItem = function () {
  searchResultClose = document.querySelectorAll(".search-result-close");

  searchResultClose.forEach((searchEle) => {
    searchEle.addEventListener("click", function () {
      searchEle.closest(".search-result").remove();
      searchResults = document.querySelectorAll(".search-result");

      updateJobs();

      if (searchResults.length === 0) {
        jobItems.forEach((item) => item.classList.remove("hidden"));
      }
    });
  });
};

const createSearchItem = function () {
  filterElements = document.querySelectorAll(".filter-element");
  filterElements.forEach((ele) => {
    ele.addEventListener("click", function () {
      const newSearchItem = `
      <div class="search-result flex mr-4 my-2">
      <div
      class="flex justify-center items-center bg-lightGrayishCyanF px-2 py-1"
      >
      <p class="text-desaturatedDarkCyan font-semibold text-sm">
      ${ele.textContent}
      </p>
      </div>
      <div
      class="search-result-close flex justify-center items-center rounded-r-sm bg-desaturatedDarkCyan w-8 hover:bg-veryDarkGrayishCyan hover:cursor-pointer"
      >
      <img src="assets/images/iconremove.svg" alt="" />
      </div>
      </div>`;

      containerSearch.insertAdjacentHTML("beforeend", newSearchItem);
      removeSearchItem();
      updateJobs();
    });
  });
};

// Clearing searchresults
btnClear.addEventListener("click", function () {
  console.log(searchResults);
  searchResults = document.querySelectorAll(".search-result");
  console.log(searchResults);
  searchResults.forEach((ele) => ele.remove());

  jobItems.forEach((item) => item.classList.remove("hidden"));
});

const setup = async function () {
  const data = await getData("data.json");
  displayJobs(data);
  createSearchItem();
};

setup();
