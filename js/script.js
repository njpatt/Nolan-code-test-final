// Main JavaScript file

document.addEventListener("DOMContentLoaded", function () {
  console.log("Script initialized successfully!");
});
/* ================ EQUAL HEIGHT ELEMENTS =============== */
const utl_ehElements = () => {
  let containerClasses = []; // Set empty array to store each container-classList

  function getAndSetHeights() {
    let ehContainers = document.querySelectorAll(".eh-container");
    for (let i = 0; i < ehContainers.length; i++) {
      // Add differentiating numbers to 'eh-container' classes (keeps equal-height elements contained to their appropriate containers)
      ehContainers[i].classList.replace("eh-container", `eh-container-${i}`);

      // Set the classList of each container to a '.'-separated string
      let containerClass = `.${ehContainers[i].classList
        .toString()
        .replace(/ /g, ".")}`;

      containerClasses.push(containerClass);

      let equalHeightEls = document.querySelectorAll(
        `${containerClass} .eh` // Target the equal-height elements within their eh-containers
      );

      let equalHeightElsArr = Array.from(equalHeightEls); // Convert NodeList to an Array

      // Get heights of each element and put in a new array (equalHeightValues)
      let equalHeightValues = equalHeightElsArr.map((el) => {
        return el.scrollHeight;
      });

      let maxHeight = Math.max(...equalHeightValues); // Get height of tallest element

      equalHeightElsArr.forEach((el) => {
        el.style.minHeight = `${maxHeight}px`;
      });
    }
  }

  function resizeHeights() {
    containerClasses.forEach((container) => {
      let elements = document.querySelectorAll(`${container} .eh`);
      let elementsArr = Array.from(elements);
      let maxHeight = 0;

      elementsArr.forEach((el) => {
        el.style.minHeight = "auto";
        if (el.scrollHeight > maxHeight) {
          maxHeight = el.scrollHeight;
        }
      });

      elementsArr.forEach((el) => {
        el.style.minHeight = `${maxHeight}px`;
      });
    });
  }

  // Run once on page load
  window.addEventListener("load", getAndSetHeights);

  // Add resize event listener with debouncing
  let resizeTimeout;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    // Give browser a chance to reset heights before resizing
    resizeTimeout = setTimeout(resizeHeights, 100); // Reduce frequent execution
  });
};
utl_ehElements();

document.addEventListener("DOMContentLoaded", function () {
  // Glide.js Slider configuration - 2.5 slides shown on xxl screens..etc
  const config = {
    type: "carousel",
    perView: 2.5,
    breakpoints: {
      1600: {
        perView: 1.5,
      },
      800: {
        perView: 1.5,
      },
      600: {
        perView: 1.2,
      },
    },
  };

  new Glide(".glide", config).mount();

  // Function to handle view toggling between grid and list views

  // Get reference to the toggle buttons
  const gridViewBtn = document.getElementById("grid-view-btn");
  const listViewBtn = document.getElementById("list-view-btn");

  // Get the main events container
  const eventsContainer = document.getElementById("events-container");

  // Check if we're on a mobile device (md or smaller)
  function isMobile() {
    return window.innerWidth < 768; // 768px is the Bootstrap md breakpoint
  }

  // Function to switch to grid view
  function showGridView() {
    // Only apply grid view on larger screens
    if (isMobile()) {
      showListView();
      return;
    }

    // Update active button state
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");

    // Restore grid layout classes
    eventsContainer.classList.add(
      "row-cols-1",
      "row-cols-md-2",
      "row-cols-xl-3"
    );
    eventsContainer.classList.remove("justify-content-center");

    // Loop through all event cards
    document.querySelectorAll(".col.mb-4").forEach(function (col) {
      // Reset column width to default (part of the grid)
      col.classList.remove("col-12", "col-lg-8");

      // Show gallery cards
      const galleryCard = col.querySelector("#gallery-card");
      if (galleryCard) {
        galleryCard.style.display = "block";
      }

      // Hide list cards
      const listCardRow = col.querySelector(".row");
      if (listCardRow) {
        listCardRow.style.display = "none";
      }
    });
  }

  // Function to switch to list view
  function showListView() {
    // Update active button state
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");

    // Remove grid layout classes to allow for full-width list items
    eventsContainer.classList.remove("row-cols-md-2", "row-cols-xl-3");
    // Add center alignment for list view
    eventsContainer.classList.add("justify-content-center");

    // Loop through all event cards
    document.querySelectorAll(".col.mb-4").forEach(function (col) {
      // Make each column full width with responsive sizing
      col.classList.add("col-12", "col-lg-8");

      // Hide gallery cards
      const galleryCard = col.querySelector("#gallery-card");
      if (galleryCard) {
        galleryCard.style.display = "none";
      }

      // Show list cards
      const listCardRow = col.querySelector(".row");
      if (listCardRow) {
        listCardRow.style.display = "block";
      }
    });
  }

  // Add click event listeners to the buttons
  gridViewBtn.addEventListener("click", showGridView);
  listViewBtn.addEventListener("click", showListView);

  // Handle resize events to switch views when screen size changes
  window.addEventListener("resize", function () {
    if (isMobile()) {
      showListView();
    } else if (gridViewBtn.classList.contains("active")) {
      showGridView();
    } else {
      showListView();
    }
  });

  // Initialize with the appropriate view based on screen size
  if (isMobile()) {
    showListView();
  } else {
    showGridView();
  }
});

document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
