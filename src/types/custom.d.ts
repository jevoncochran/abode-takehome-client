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
  startTime?: Date;
  endTime?: Date;
  userId: UniqueId;
  isAllDay?: boolean;
  // TODO: Add description
}

// TODO: Simplify this by extending Event
export interface UpcomingEvent {
  id: UniqueId;
  title: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  userId: UniqueId;
  isAllDay?: boolean;
  userRelation: UserRelation;
  invite?: EventInviteData;
}

export type EventInput = Omit<Event, "id">;

export type EventInviteData = {
  id: UniqueId;
  accepted: boolean | null;
  declined: boolean | null;
};

export type AuthenticatedUser = Omit<User, "password">;
