import { types } from "mobx-state-tree";

const UserModel = types.model({
  id: types.integer,
  name: types.string,
  online: types.boolean,
  pic: types.string
});

export default UserModel;
