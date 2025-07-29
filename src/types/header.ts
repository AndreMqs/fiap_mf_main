export interface HeaderProps {
  items: {
    title: string;
    route: string;
    selected: boolean;
  }[];
  onMenuClick: (title: string) => void;
} 