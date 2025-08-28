const prisma = require('./generated/prisma');

async function main() {
  const usuarios = await prisma.usuario.findMany();
  console.log(usuarios);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());