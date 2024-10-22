type Project = {
    id: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    public: boolean;
    publishedAt: Date;
}

export type { Project }