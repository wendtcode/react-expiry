export interface Props {
  children: React.ReactNode;
  browserOnly?: boolean;
  defaultTTL?: number;
  keyPrefix?: string | ((id: string) => string);
  storage?: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
  };
}

export interface Options {
  id: string;
  ttl?: number;
  expires?: Date;
}
