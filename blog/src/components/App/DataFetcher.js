import { fetchPosts, fetchUsers, getRandomUserPic } from "../../api/api";

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomBool() {
  return Math.random() >= 0.5;
}

function pad(val) {
  return val < 10 ? `0${val}` : `${val}`;
}

function randomTime() {
  return `${pad(randomInt(12))}:${pad(randomInt(60))} ${
    randomBool() ? "AM" : "PM"
  }`;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const fetchData = async () => {
  let users = {};
  await asyncForEach(await fetchUsers(), async user => {
    let pic = await getRandomUserPic();
    users[user.id] = {
      id: user.id,
      name: user.name,
      online: randomBool(),
      pic: pic
    };
  });

  let posts = await fetchPosts();
  posts.forEach(post => {
    post.time = randomTime();
    post.user = users[post.userId];
  });

  return posts;
};
