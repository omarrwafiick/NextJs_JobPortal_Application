import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'C++',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'Scala',
  'Dart',
  'Elixir',
  'Perl',
  'Objective-C',
  'SQL',
  'Shell',
  'HTML',
  'CSS',
  'R',
  'Haskell',
  'Assembly',
  'MATLAB',
];

async function main() { 
  for (const lang of programmingLanguages) {
    await prisma.tag.upsert({
      where: { name: lang }, 
      update: {},
      create: { name: lang },
    });
  } 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
});
