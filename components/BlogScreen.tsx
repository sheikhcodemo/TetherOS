
import React from 'react';
import { ArrowUpRight, Calendar, User } from 'lucide-react';

const BlogScreen: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "Understanding USDT Reserves: A Deep Dive",
      excerpt: "An in-depth look at how Tether ensures 1:1 backing for every token in circulation, including breakdown of cash equivalents.",
      date: "Oct 12, 2023",
      author: "Financial Team",
      tag: "Education"
    },
    {
      id: 2,
      title: "Security Best Practices for Large Volume Swaps",
      excerpt: "Learn the essential protocols for securing your digital assets during high-value exchange operations.",
      date: "Nov 05, 2023",
      author: "Security Ops",
      tag: "Security"
    },
    {
      id: 3,
      title: "The Future of Stablecoins in Global Commerce",
      excerpt: "How cross-border payments are being revolutionized by blockchain technology and stable assets.",
      date: "Dec 15, 2023",
      author: "Market Analyst",
      tag: "Trends"
    },
     {
      id: 4,
      title: "API v3.0 Release Notes",
      excerpt: "Detailed overview of the new endpoints and enhanced rate limits available in the latest gateway update.",
      date: "Jan 10, 2024",
      author: "Dev Team",
      tag: "Technical"
    }
  ];

  return (
    <main className="flex-1 w-full py-24 px-6 animate-fade-in-up">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex items-end justify-between">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Market Insights</h1>
                <p className="text-zinc-400">Latest updates, security briefs, and market analysis.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="group bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-primary-500/30 transition-all hover:bg-zinc-900/60 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 rounded bg-primary-500/10 text-primary-500 text-[10px] font-bold uppercase tracking-wider border border-primary-500/10">
                  {post.tag}
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-primary-500 transition-colors" />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-zinc-600 font-mono pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogScreen;
