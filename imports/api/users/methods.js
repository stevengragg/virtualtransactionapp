import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { UsersCollection } from './collection';

// export async function create(data) {
//   return UsersCollection.insertAsync({ ...data });
// }

// export async function update(_id, data) {
//   check(_id, String);
//   return UsersCollection.updateAsync(_id, { ...data });
// }

// export async function remove(_id) {
//   check(_id, String);
//   return UsersCollection.removeAsync(_id);
// }

// export async function findById(_id) {
//   check(_id, String);
//   return UsersCollection.findOneAsync(_id);
// }

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Meteor.methods({
  // 'Users.create': create,
  // 'Users.update': update,
  // 'Users.remove': remove,
  // 'Users.find': findById
});
