import Comment from './Comment'

export default function CommentsBlock({ comments }) {
  return (
    comments.results.length !== 0 &&
    <div>
      {
        comments.results.map(comment => {
          return <Comment key={comment.id} comment={comment} />
        })
      }
    </div>
  )
}