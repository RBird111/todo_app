import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) throw redirect(302, '/login');

	const id = Number(params.taskId);

	const task = await prisma.task.findUnique({ where: { id } });

	if (task && task.userId === locals.user.id) return { task };

	throw redirect(302, '/view-tasks');
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const id = Number(data.get('id'));

		const title = data.get('title')?.toString();
		if (!title) return fail(400, { title: true, missing: true });

		const description = data.get('description')?.toString();
		if (!description) return fail(400, { description: true, missing: true });

		const dueDate = data.get('dueDate')?.toString();
		if (!dueDate) return fail(400, { dueDate: true, missing: true });

		const parsedDate = (date: string) => {
			const [y, m, d] = date.split('-');
			return new Date(Number(y), Number(m), Number(d));
		};

		await prisma.task.update({
			where: { id },
			data: {
				title,
				description,
				dueDate: parsedDate(dueDate)
			}
		});

		throw redirect(302, '/view-tasks');
	}
} satisfies Actions;
