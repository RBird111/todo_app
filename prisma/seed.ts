import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import seeds from './seed_data.json';

const prisma = new PrismaClient();

const main = async () => {
	console.log(`Start seeding ...`);

	for (const u of Object.values(seeds)) {
		const hashedPassword = await bcrypt.hash(u.password, 10);
		const user = await prisma.user.create({
			data: {
				firstName: u.firstName,
				lastName: u.lastName,
				email: u.email,
				hashedPassword,
				tasks: {
					create: u.tasks
				}
			}
		});
		console.log(`Created user with id: ${user.id}`);
	}

	console.log(`Seeding finished.`);
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
