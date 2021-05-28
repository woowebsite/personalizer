interface PageProps {
  addAtions?: Array<any>;
  messages: Record<string, string>;
  t: (id: string) => string;
}

export default PageProps;
