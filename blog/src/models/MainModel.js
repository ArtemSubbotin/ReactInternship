import { types, flow } from "mobx-state-tree";
import PostModel from "../models/PostModel";
import UserModel from "../models/UserModel";
import { fetchData } from "../components/App/DataFetcher";

const MainModel = types
  .model({
    posts: types.optional(types.array(PostModel), []),
    searchText: types.optional(types.string, ""),
    loaded: types.optional(types.boolean, false)
  })
  .actions(self => {
    return {
      loadPosts: flow(function*() {
        let posts = yield fetchData();
        let postModels = posts.map(post => {
          return PostModel.create({
            id: post.id,
            title: post.title,
            body: post.body,
            time: post.time,
            user: UserModel.create({
              online: post.user.online,
              id: post.user.id,
              pic: post.user.pic,
              name: post.user.name
            })
          });
        });
        self.posts = postModels;
        self.loaded = true;
      }),
      setSearchText(input) {
        self.searchText = input;
      }
    };
  })
  .views(self => ({
    cnt() {
      return self.posts.length;
    },
    filteredPosts() {
      return self.posts.filter(
        post => !self.searchText || post.body.includes(self.searchText)
      );
    }
  }));

export const mainModel = MainModel.create();
