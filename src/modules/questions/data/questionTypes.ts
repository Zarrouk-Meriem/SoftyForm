export interface updatedQuestion {
	id?: number;
	type?: string;
	question?: string;
	isRequired?: boolean;
	options?: Array<object>;
	starsNum?: number;
	starsKind?: string;
	isSpecificTypes?: boolean;
	specificTypes?: Array<string>;
	maxFileNum?: number;
	maxFileSize?: number;
}
export interface questionId {
	id: any;
}
