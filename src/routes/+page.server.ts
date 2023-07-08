import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const user = await prisma.user.findUnique({
		where: { id: 1 },
		include: { tasks: true }
	});

	return { user };
}) satisfies PageServerLoad;
