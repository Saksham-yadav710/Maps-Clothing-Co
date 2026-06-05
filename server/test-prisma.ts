import { prisma } from './config/prisma.js';

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Success:', users);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
