import prisma from '@/lib/prisma';  
import JobPostForm from '../forms/job-form';

export default async function JobPostPage() {
  const tags = await prisma.tag.findMany();  
  const tagOptions = tags.map(tag => [tag.name, tag.id]);   

  return (
    <section> 
      <JobPostForm tags={tagOptions} />
    </section>
  );
}
