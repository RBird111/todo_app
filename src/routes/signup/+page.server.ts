import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		// Check firstName exists
		const first_name = data.get('firstName')?.toString();
		if (!first_name) return fail(400, { missingFirstName: true });

		// Check lastName exists
		const last_name = data.get('lastName')?.toString();
		if (!last_name) return fail(400, { missingLastName: true });

		// Check username exists
		const username = data.get('username')?.toString();
		if (!username) return fail(400, { missingUsername: true });

		// Check email exists
		const email = data.get('email')?.toString();
		if (!email) return fail(400, { missingEmail: true });

		// Check password exists
		const password = data.get('password')?.toString();
		if (!password) return fail(400, { missingPass: true });

		// Check confirmPassword exists
		const confirmPassword = data.get('confirmPassword')?.toString();
		if (!confirmPassword) return fail(400, { missingConfirmPass: true });

		if (password !== confirmPassword) return fail(400, { noMatch: true });

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					first_name,
					last_name,
					email,
					username
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
			return { success: true, user };
		} catch {
			// username taken
			return fail(400);
		}
	}
} satisfies Actions;
