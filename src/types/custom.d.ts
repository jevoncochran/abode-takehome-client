export type UniqueId = number | string;

export interface User {
  id: UniqueId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthenticatedUser = Omit<User, "password">;

export type UserRelation = "created" | "invited";

export interface Event {
  id: UniqueId;
  title: string;
  date: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  userId: UniqueId;
  isAllDay?: boolean;
  description?: string;
  image: string | null;
}

export interface NewEvent extends Omit<Event, "id"> {
  usersToInvite?: UniqueId[];
}

export interface ExistingEvent extends Event {
  userRelation: UserRelation;
  invite?: EventInviteStatus;
  guests: Invite[];
}

export interface Invite {
  inviteId: UniqueId;
  guestId: UniqueId;
  email: string;
  accepted: boolean;
  declined: boolean;
}

// This is an object attached to user events when user is associated with event by invite (i.e. events the user has not created)
// TODO: Come up with a better name for this
export type EventInviteStatus = {
  id: UniqueId;
  accepted: boolean | null;
  declined: boolean | null;
};
