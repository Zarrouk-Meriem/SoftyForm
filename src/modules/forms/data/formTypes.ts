export interface form {
	title: string;
	description?: string;
	questions: Array<object>;
	responses?: Array<object>;
	isPublished: boolean;
	isStarred: boolean;
	isArchived: boolean;
}
