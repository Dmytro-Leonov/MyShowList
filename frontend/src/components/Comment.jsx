import useInstance from '../hooks/useInstance'
import pic from '../assets/default_user_avatar.png'
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx'
import { IoReturnUpBack } from 'react-icons/io5'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useState, useRef } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentsBlock from './CommentsBlock'
import CommentForm from './CommentForm'
import { UserContext } from '../UserContext';
import { useContext } from 'react';

dayjs.extend(relativeTime)

export default function Comment({ comment }) {
  const { user, } = useContext(UserContext)
  
  const instance = useInstance()
  const [userVote, setUserVote] = useState(comment.user_vote)
  const [likes, setLikes] = useState(comment.likes)
  const [repliesShown, setRepliesShown] = useState(false)

  const [loadingReplies, setLoadingReplies] = useState(true)
  const [replies, setReplies] = useState(null)
  const fetchReplies = () => {
    setLoadingReplies(true)
    instance.get(`/comments/for-comment/${comment.id}/`)
      .then(res => {
        setReplies(res.data);
        setLoadingReplies(false)
      })
  }

  const voteComment = async (vote) => {
    if (vote !== userVote) {
      await instance.post('/comments/comment/vote/', { comment: comment.id, vote: vote })
        .then(() => {
          setLikes(likes + vote - userVote)
          setUserVote(vote)
        })
        .catch()
    }
    else {
      await instance.delete('/comments/comment/vote/', { data: { comment: comment.id } })
        .then(() => {
          setLikes(likes - vote)
          setUserVote(null)
        })
        .catch()
    }
  }

  const openReplies = () => {
    setRepliesShown(!repliesShown)
    !replies && fetchReplies()
  }

  const commentTex = useRef()
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false)

  const submitComment = () => {
    const commentT = commentTex.current.value.trim()
    if (commentT)
      instance.post('comments/', { show: comment.show, parent_comment: comment.id, reply_to_user: comment.user.id, text: commentTex.current.value })
        .then((res) => {
          commentTex.current.value = ''
          setIsReplyFormVisible(false)
        })
        .catch()
  }

  const cancelComment = () => {
    setIsReplyFormVisible(false)
    commentTex.current.value = ''
  }

  return (
    <div className='border-l rounded-md mt-4 pl-7 flex flex-col gap-2 '>
      <div className='flex gap-4 items-center'>
        <div className='w-8 rounded-[50%] overflow-hidden aspect-square'>
          {
            comment.user.picture ?
              <img src={comment.user.picture} alt='Profile pic' />
              : <img src={pic} alt="Profile pic" className='w-full' />
          }
        </div>
        <div className='flex uppercase'>{comment.user.full_name}</div>
        <p>{dayjs(comment.date_created).fromNow()}</p>
      </div>
      <p className='flex gap-2'>
        {comment?.reply_to_user && `@${comment.reply_to_user.full_name}, `}
        {comment.text}
      </p>
      <div className='flex gap-1 items-center'>
        <div className='rounded-md py-1 px-2 hover:bg-dark-secondary hover:cursor-pointer first:ml-[-0.5rem]' onClick={() => voteComment(1)}>{userVote === 1 ? <AiFillLike /> : <AiOutlineLike />}</div>
        <p>{likes}</p>
        <div className='rounded-md py-1 px-2 hover:bg-dark-secondary hover:cursor-pointer first:ml-[-0.5rem]' onClick={() => voteComment(-1)}>{userVote === -1 ? <AiFillDislike /> : <AiOutlineDislike />}</div>
        {
          comment.replies_count > 0 &&
          <p onClick={() => openReplies()} className='select-none rounded-md py-1 px-2 hover:bg-dark-secondary hover:cursor-pointer text-sm text-blue-500 flex items-center gap-1'>
            {repliesShown ? <RxTriangleUp size={20} /> : <RxTriangleDown size={20} />} {comment.replies_count} {comment.replies_count == 1 ? 'reply' : 'replies'}
          </p>
        }
        {
          user &&
          <p onClick={() => setIsReplyFormVisible(!isReplyFormVisible)} className='select-none rounded-md py-1 px-2 hover:bg-dark-secondary hover:cursor-pointer text-sm text-blue-500 flex items-center gap-1'><IoReturnUpBack />Reply</p>

        }
      </div>
      {
        isReplyFormVisible &&
        <CommentForm
          textRef={commentTex}
          onCancel={cancelComment}
          onSubmit={submitComment}
          cancelText={'Cancel'}
          submitText={'Send'}
        />
      }
      {
        !loadingReplies && comment.replies_count !== 0 && repliesShown ? <CommentsBlock comments={replies} /> : null
      }
    </div>
  )
}