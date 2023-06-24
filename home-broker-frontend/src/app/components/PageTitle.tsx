export default function PageTitle(props: {title: string}) {
  return <article className="format format-invert">
  <h1>{props.title}</h1>
</article>
}