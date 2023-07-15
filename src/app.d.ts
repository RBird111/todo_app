// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: {
				id: number;
				firstName: string;
				lastName: string;
				username: string;
				email: string;
				createdAt: Date;
				updatedAt: Date;
				tasks: Task[];
			};
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
