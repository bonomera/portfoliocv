type BlogPostPageProps = {
  params: Promise<{ id: string }>
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const id = Number((await props.params).id)
  const post = await getPost(id)
  // ...
}