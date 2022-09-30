const fs = require('fs');
const { execSync } = require('node:child_process');
const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const prisma = global.prisma || new PrismaClient({ log: ['info'] });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

//create an empty file called prisma/test.db
fs.closeSync(fs.openSync('prisma/test.db', 'w'));

execSync('DATABASE_URL=file:./test.db npx prisma migrate dev', {
  stdio: 'inherit',
});

const seed = async () => {
  // prisma create test user
  await prisma.user.create({
    data: {
      email: 'fakeuser@test.com',
      password: await argon2.hash('fakepassword'),
      name: 'Test User',
    },
  });
};

seed();
