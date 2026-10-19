interface IPostCount {
	comments: number;
}

export interface IPost {
	body: string;
	createdAt: string;
	id: number;
	title: string;
	user: { email: string };
	userId: number;
	tags: string[];
	_count: IPostCount;
}
