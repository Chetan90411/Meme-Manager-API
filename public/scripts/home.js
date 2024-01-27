// Function to render memes on the page
function renderMemes(memesData) {
  const memesGrid = document.getElementById("memesGrid");

  // clear memesGrid
  memesGrid.innerHTML = "";

  memesData.forEach(meme => {
    const memeCard = document.createElement("div");
    memeCard.classList.add("meme-card");

    // Use video element for video URLs
    const isVideo = meme.url.includes(".mp4");
    const mediaElement = isVideo
      ? document.createElement("video")
      : document.createElement("img");
    mediaElement.src = meme.url;

    // Add controls to video element
    if (isVideo) {
      mediaElement.controls = true;
    }

    const detailsElement = document.createElement("div");
    detailsElement.classList.add("meme-details");
    const tagString = meme.tag.join(", ");
    detailsElement.innerHTML = tagString
      ? `<p class="meme-tag">Tags: ${tagString}</p>`
      : "" + meme.description
      ? `<p class="meme-description"> ${meme.description}</p>`
      : "";

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(meme.url);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/memes/${meme._id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to delete meme");
        }
        fetchMemes();
      } catch (error) {
        console.error(error);
      }
    });

    memeCard.appendChild(mediaElement);
    memeCard.appendChild(detailsElement);
    memeCard.appendChild(copyButton);
    memeCard.appendChild(deleteButton);

    memesGrid.appendChild(memeCard);
  });
}

// Function to fetch memes from the backend API
async function fetchMemes() {
  try {
    const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
    if (!token) {
      console.error("User token not found.");
      return;
    }

    // Check for search query in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    // Include search query in the API request if it exists
    const apiUrl = searchQuery ? `/memes?search=${searchQuery}` : "/memes";

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch memes");
    }

    const memesData = await response.json();
    renderMemes(memesData);
  } catch (error) {
    console.error(error);
  }
}

// Function to handle search functionality and update address bar
async function searchMemes() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  try {
    const token = localStorage.getItem("userToken"); // Retrieve token from localStorage
    if (!token) {
      console.error("User token not found.");
      return;
    }

    // Include search query in the API request
    const response = await fetch(`/memes?search=${searchInput}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const searchResults = await response.json();
    renderMemes(searchResults);

    // Modify the query parameters in the address bar
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchInput);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );
  } catch (error) {
    console.error(error);
  }
}

// Initial fetching and rendering of memes
fetchMemes();
