
import React, { useState } from 'react';
import { CommunityPost, CommunityReply } from '../types';

interface CommunityPageProps {
  posts: CommunityPost[];
  setPosts: React.Dispatch<React.SetStateAction<CommunityPost[]>>;
  authorName: string;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ posts, setPosts, authorName }) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [postType, setPostType] = useState<'tip' | 'milestone' | 'question'>('tip');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: Math.random().toString(36).substring(2, 9),
      author: authorName,
      content: newPostContent,
      type: postType,
      likes: 0,
      dislikes: 0,
      replies: [],
      timestamp: new Date().toISOString()
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleCreateReply = (postId: string) => {
    if (!replyContent.trim()) return;

    const newReply: CommunityReply = {
      id: Math.random().toString(36).substring(2, 9),
      author: authorName,
      content: replyContent,
      timestamp: new Date().toISOString()
    };

    setPosts(posts.map(p => p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p));
    setReplyContent('');
    setReplyingToId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete your post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleDislike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Community Feed</h1>
        <p className="text-sm text-slate-500 mt-1">Connect with wellness insights and shared milestones.</p>
      </header>

      {/* Post Creation */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
               {authorName[0]}
             </div>
             <span className="text-sm font-bold text-slate-900">Share something with the community...</span>
          </div>
          <textarea
            className="w-full p-4 rounded-lg border border-slate-200 text-sm font-medium focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none h-24 bg-slate-50/30 transition-all"
            placeholder="Write your tip, milestone or question..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {(['tip', 'milestone', 'question'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPostType(type)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all border ${
                    postType === type 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${
                  post.author.includes('AI') ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {post.author}
                    {post.author.includes('AI') && <i className="fa-solid fa-badge-check text-[10px] text-indigo-500"></i>}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                  post.type === 'tip' ? 'bg-emerald-50 text-emerald-600' : 
                  post.type === 'question' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {post.type}
                </span>
                {post.author === authorName && (
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <i className="fa-light fa-trash-can text-sm"></i>
                  </button>
                )}
              </div>
            </div>
            
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {post.content}
            </p>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-6">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group"
              >
                <i className="fa-light fa-heart text-sm group-active:scale-125 transition-transform"></i>
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              
              <button 
                onClick={() => handleDislike(post.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
                title="Not True"
              >
                <i className="fa-light fa-circle-xmark text-sm group-active:scale-125 transition-transform"></i>
                <span className="text-xs font-bold">{post.dislikes}</span>
              </button>

              <button 
                onClick={() => setReplyingToId(replyingToId === post.id ? null : post.id)}
                className={`flex items-center gap-2 transition-colors ${replyingToId === post.id ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-600'}`}
              >
                <i className="fa-light fa-comment text-sm"></i>
                <span className="text-xs font-bold">{post.replies.length} Reply</span>
              </button>
              
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors ml-auto">
                <i className="fa-light fa-share-nodes text-sm"></i>
              </button>
            </div>

            {/* Reply Input */}
            {replyingToId === post.id && (
              <div className="mt-4 pt-4 border-t border-slate-50 animate-slideDown">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                    {authorName[0]}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input 
                      autoFocus
                      className="w-full px-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all"
                      placeholder="Add a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCreateReply(post.id);
                        }
                      }}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setReplyingToId(null)}
                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 hover:text-slate-600"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleCreateReply(post.id)}
                        disabled={!replyContent.trim()}
                        className="text-[10px] font-bold text-white uppercase tracking-widest px-3 py-1 bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Replies List */}
            {post.replies.length > 0 && (
              <div className="mt-6 space-y-4 border-l-2 border-slate-100 pl-4 ml-4">
                {post.replies.map(reply => (
                  <div key={reply.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{reply.author}</span>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {posts.length === 0 && (
          <div className="py-20 text-center bg-white border border-slate-200 border-dashed rounded-xl">
             <i className="fa-light fa-messages text-4xl text-slate-200 mb-4 block"></i>
             <p className="text-sm text-slate-400">The feed is currently empty. Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
