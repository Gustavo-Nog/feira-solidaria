const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

modules.export = prisma;