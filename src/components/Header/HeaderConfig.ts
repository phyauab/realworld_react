export interface HeaderItem {
  title: string;
  link: string;
  isPrivate: boolean | undefined;
  icon?: string;
}

export const headerItemList: Array<HeaderItem> = [
  {
    title: "Home",
    link: "/",
    isPrivate: undefined,
  },
  {
    title: "New Article",
    link: "/editor",
    isPrivate: true,
    icon: "ion-compose",
  },
  {
    title: "Settings",
    link: "/settings",
    isPrivate: true,
    icon: "ion-gear-a",
  },
  {
    title: "Sign in",
    link: "/login",
    isPrivate: false,
  },
  {
    title: "Sign up",
    link: "/register",
    isPrivate: false,
  },
];
