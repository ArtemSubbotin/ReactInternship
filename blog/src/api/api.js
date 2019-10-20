const BLOG_HOST = "https://jsonplaceholder.typicode.com";

async function request(host, path, config = {}) {
  try {
    let resp = await fetch(`${host}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...config
    });

    let json = await resp.json();

    if (resp.ok) return json;
    else return null;
  } catch (error) {
    //console.log("get data from server error: " + error.message);
    return null;
  }
}

export const fetchPosts = async () => {
  return await request(BLOG_HOST, "/posts");
};

export const fetchUsers = async () => {
  return await request(BLOG_HOST, "/users");
};

export const getRandomUserPic = async () => {
  let json = await request("https://randomuser.me", "/api");
  return json.results[0].picture.large;
};
