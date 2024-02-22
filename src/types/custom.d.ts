export type UniqueId = number | string;

export interface User {
  id: UniqueId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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

export interface NewEvent {
  title: string;
  date: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  userId: UniqueId;
  isAllDay?: boolean;
  description?: string;
  image: string | null;
  usersToInvite?: UniqueId[];
}

export interface ExistingEvent extends Event {
  userRelation: UserRelation;
  invite?: EventInviteData;
  guests: Invite[];
}

export type EventInput = Omit<Event, "id">;

export type EventInviteData = {
  id: UniqueId;
  accepted: boolean | null;
  declined: boolean | null;
};

export interface Invite {
  inviteId: UniqueId;
  guestId: UniqueId;
  email: string;
  accepted: boolean;
  declined: boolean;
}

export type AuthenticatedUser = Omit<User, "password">;
