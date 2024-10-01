export interface ElementType {
  id: string;
  type: string;
  content: string[] | ElementType[];
  attributes?: {
    id?: string;
    class?: string;
    style?: Record<string, string | number>;
    href?: string;
    alt?: string;
    src?: string;
  };
  children?: ElementType[];
}
