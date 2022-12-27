import Comment from './Comment'

export default function CommentsBlock({ comments }) {
  return (
    comments.results.length !== 0 &&
    <div className=''>
      {
        comments.results.map(comment => {
          return <Comment key={comment.id} comment={comment} />
        })
      }
    </div>
  )
}