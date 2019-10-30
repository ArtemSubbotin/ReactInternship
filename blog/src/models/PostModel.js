import { types } from "mobx-state-tree";
import UserModel from "./UserModel";

const PostModel = types.model({
  id: types.integer,
  title: types.string,
  body: types.string,
  time: types.string,
  user: types.optional(UserModel, {
    pic: "https://randomuser.me/api/portraits/lego/1.jpg",
    id: 0,
    name: "",
    online: false
  })
});

export default PostModel;
