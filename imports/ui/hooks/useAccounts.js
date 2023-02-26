import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

// Create a reusable hook
export const useAccount = () =>
  useTracker(() => {
    const handler = Meteor.subscribe("user.currentUser");
    const user = Meteor.user();
    const userId = Meteor.userId();
    const noDataAvailable = {
      user: undefined,
      userId: undefined,
      isLoggedIn: false,
    };

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    return {
      user,
      userId,
      isLoggedIn: !!userId,
      isLoading: false,
    };
  }, []);
