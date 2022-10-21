export interface User {
	email: string
	name: string
	photo?: string | null
	bio?: string | null
	posts?: Post[]
	comments?: Comment[]
	schoolName?: string | null
	joinedOn: Date
}

export interface Post {
	id: string
	text: string
	poster?: User
	posterEmail?: string
	comments?: Comment[]
	usersCommented: number
	postVisibility: PostVisibility
	postedOn: Date
}

export type PostVisibility = "PUBLIC" | "DISTRICT" | "PRIVATE"

export interface Comment {
	id: string
	text: string
	commenter?: User
	commenterEmail?: string
	replyTo?: Comment
	replyToId?: string | null
	commentedOn: Date
}
