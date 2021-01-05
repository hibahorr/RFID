export class Comment {
    by: number;
    content: string;
    postedAt: Date;
    public constructor(by: number, content: string, postedAt: Date) {
        this.by = by;
        this.content = content;
        this.postedAt = postedAt;
    }
}
