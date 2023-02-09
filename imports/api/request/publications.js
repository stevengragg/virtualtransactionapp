import { Meteor } from 'meteor/meteor';
import { RequestCollection } from './collection';

Meteor.publish('allRequests', function publishRequests() {
  return RequestCollection.find({});
});
