import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, '/');
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		// Check email exists
		const username = data.get('username')?.toString();
		if (!username) return fail(400, { missingEmail: true });

		// Check password exists
		const password = data.get('password')?.toString();
		if (!password) return fail(400, { missingPassword: true });

		try {
			const key = await auth.useKey('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
			return { success: true };
		} catch (e) {
			console.log('ERROR =>', e);
			// invalid username/password
			return fail(400, { fail: true });
		}
	}
} satisfies Actions;
