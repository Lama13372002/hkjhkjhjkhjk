'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight, X, ArrowLeft } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

// Force static generation
export const dynamic = 'force-static'

function BlogPost({ post }: { post: typeof blogPosts[0] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <motion.div
        className="overflow-hidden rounded-lg blog-card-hover h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="h-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.fallbackImage})` }}
        >
          <div className="w-full h-full flex items-end blog-overlay">
            <div className="text-white p-4">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 flex-1">
          <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-3 w-full">
            Читать
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">{post.title}</DialogTitle>
          <div className="relative">
            <div
              className="h-60 w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${post.fallbackImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{post.title}</h2>
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                  <div className="text-sm">{new Date(post.publishedAt).toLocaleDateString('ru-RU')}</div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Закрыть</span>
              </Button>
            </div>

            <div className="p-6">
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-10 flex items-center">
          <Link href="/">
            <Button variant="outline" className="group mr-4">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>На главную</span>
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Блог о путешествиях</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
