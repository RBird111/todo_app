import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		// eat the cookie
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(302, '/');
	}
} satisfies Actions;
