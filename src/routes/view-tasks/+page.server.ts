import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login');
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id')?.toString());

		await prisma.task.delete({
			where: { id }
		});
	},
	complete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id')?.toString());
		const task = await prisma.task.findUnique({
			where: { id }
		});

		if (task)
			await prisma.task.update({
				where: { id },
				data: { completed: !task.completed }
			});

		throw redirect(303, '/view-tasks');
	}
} satisfies Actions;
