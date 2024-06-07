import { UserInfo } from "./schema";
const avatarImage =
  "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg";
const avatarImage2 =
  "https://png.pngtree.com/png-clipart/20190902/original/pngtree-cute-girl-avatar-element-icon-png-image_4393286.jpg";

export const userInformations: UserInfo[] = [
  {
    email: "jaker1@example.com",
    displayName: "Jaker One",
    activate: true,
    avatar: avatarImage,
    lastLogin: "2022-01-01T00:00:00Z"
  },
  {
    email: "jaker2@example.com",
    displayName: "Jaker Two",
    activate: false,
    avatar: avatarImage2,
    lastLogin: "2022-01-02T00:00:00Z"
  },
  {
    email: "jaker3@example.com",
    displayName: "Jaker Three",
    activate: true,
    avatar: "https://example.com/jaker3.png",
    lastLogin: "2022-01-03T00:00:00Z"
  },
  {
    email: "jaker4@example.com",
    displayName: "Jaker Four",
    activate: false,
    avatar: "https://example.com/jaker4.png",
    lastLogin: "2022-01-04T00:00:00Z"
  }
];
