import { auth } from '$lib/server/lucia';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		// Check email exists
		const email = data.get('email');
		if (!email) return fail(400, { missingEmail: true });

		// Check password exists
		const password = data.get('password');
		if (!password) return fail(400, { missingPassword: true });

		try {
			const key = await auth.useKey(
				'email',
				email.toString(),
				password.toString()
			);
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
