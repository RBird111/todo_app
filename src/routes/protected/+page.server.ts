import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login');
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id')?.toString());

		await prisma.task.delete({
			where: { id }
		});
	}
} satisfies Actions;
