import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	console.log(`Start seeding ...`);

	const user = await prisma.user.create({
		data: {
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			tasks: {
				create: [
					{
						title: 'Fix bug in login functionality',
						description: 'There is a bug causing login failures. Investigate and fix it.',
						completed: false,
						dueDate: '2023-07-10T12:00:00Z'
					},
					{
						title: 'Optimize database queries',
						description:
							'Identify slow-performing queries and optimize them for better performance.',
						completed: false,
						dueDate: '2023-07-12T15:30:00Z'
					},
					{
						title: 'Implement new feature X',
						description: 'Add a new feature X based on the requirements provided.',
						completed: false,
						dueDate: '2023-07-15T09:00:00Z'
					},
					{
						title: 'Refactor code for better maintainability',
						description: 'Review and refactor code to improve readability and maintainability.',
						completed: false,
						dueDate: '2023-07-20T16:45:00Z'
					},
					{
						title: 'Write unit tests for module Y',
						description: 'Create comprehensive unit tests to ensure the correctness of module Y.',
						completed: false,
						dueDate: '2023-07-25T14:00:00Z'
					}
				]
			}
		}
	});
	console.log(`Created user with id: ${user.id}`);
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
