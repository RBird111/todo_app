import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// Check firstName exists
		const firstName = data.get('firstName');
		if (!firstName) return fail(400, { missingFirstName: true });

		// Check lastName exists
		const lastName = data.get('lastName');
		if (!lastName) return fail(400, { missingLastName: true });

		// Check email exists
		const email = data.get('email');
		if (!email) return fail(400, { missingEmail: true });

		// Check password exists
		const password = data.get('password');
		if (!password) return fail(400, { missingPass: true });

		// Check confirmPassword exists
		const confirmPassword = data.get('confirmPassword');
		if (!confirmPassword) return fail(400, { missingConfirmPass: true });

		if (password !== confirmPassword) return fail(400, { noMatch: true });
		const hashedPassword = await bcrypt.hash(password.toString(), 10);

		const user = await prisma.user.create({
			data: {
				firstName: firstName.toString(),
				lastName: lastName.toString(),
				email: email.toString(),
				hashedPassword
			}
		});

		return { success: true, user: user };
	}
} satisfies Actions;
