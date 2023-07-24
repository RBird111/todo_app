import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login');
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const userId = Number(data.get('userId'));
		if (!userId) return fail(400, { userId: true, missing: true });

		const title = data.get('title')?.toString();
		if (!title) return fail(400, { title: true, missing: true });

		const description = data.get('description')?.toString();
		if (!description) return fail(400, { description: true, missing: true });

		const dueDate = data.get('dueDate')?.toString();
		if (!dueDate) return fail(400, { dueDate: true, missing: true });

		const parsedDate = (date: string) => {
			const [m, d, y] = date.split('/');
			return new Date(Number(y), Number(m), Number(d));
		};

		const task = await prisma.task.create({
			data: {
				userId,
				title,
				description,
				dueDate: parsedDate(dueDate)
			}
		});

		console.log('Task =>', task);

		throw redirect(302, '/protected');
	}
} satisfies Actions;
