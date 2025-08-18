export type BlockType = "header" | "image" | "description";

export type Block = {
  id: string;
  type: BlockType;
  header?: { level: 2 | 3 | 4; text: string };
  image?: { file?: File | null; preview?: string | null; caption?: string;width?: number; height?: number; };
  description?: { code: string };
};


export type ContentBlock = {
  type: string
  payload: Record<string, unknown>;

}

export type Blog = {
  title: string;
  slug: string;
  tag: string;
  content: ContentBlock[];
  // published: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  thumbnailUrl: string | null;
}

export type BlockPayload =
  | { type: "header"; payload: { level: 2 | 3 | 4; text: string } }
  | { type: "description"; payload: { code: string } }
  | { type: "image"; payload: { caption: string; image: string } };