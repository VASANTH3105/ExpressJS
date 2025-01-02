const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form"); // Correct selection of the form element

// Get and show Post
async function showPosts() {
  try {
    const res = await fetch("http://localhost:8080/api/post/");
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const post = await res.json();
    output.innerHTML = "";

    post.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.log(error);
  }
}

// Submit new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8080/api/post/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const newPost = await res.json();
    const postEl = document.createElement("div");
    postEl.textContent = newPost.title;
    output.appendChild(postEl);
    showPosts(); // Refresh the post list
  } catch (error) {
    console.log(error);
  }
}

// Event listeners
button.addEventListener("click", showPosts);
form.addEventListener("submit", addPost); // Use the correct `form` variable
