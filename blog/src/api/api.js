export const fetchPosts = async () => {
    try {
        var resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        var json = await resp.json();

        if (resp.ok)
            return json;
        else
            return null;
    } catch (error) {
        //console.log("get data from server error: " + error.message);
    }
}


export const fetchUsers = async () => {
    try {
        var resp = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        var json = await resp.json();

        if (resp.ok)
            return json;
        else
            return null;
    } catch (error) {
        //console.log("get data from server error: " + error.message);
    }
}

export const getRandomUserPic = async () => {
    try {
        var resp = await fetch("https://randomuser.me/api", {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        var json = await resp.json();

        if (resp.ok)
            return json.results[0].picture.large; //thumbnail, medium, large;
        else
            return null;
    } catch (error) {
        //console.log("get data from server error: " + error.message);
    }
}

