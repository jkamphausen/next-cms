import Link from 'next/link'
import cn from 'classnames'

import { formatRelative } from 'date-fns'
import { de } from 'date-fns/locale'

import CMS from '../lib/cms'

import styles from '../styles/post.module.css'

export default function PostPreviews() {
  return <CMS endpoint="/wp-json/wp/v2/posts?_fields=id,excerpt,title,date">{
    posts =>
      posts.map(p =>
        <div className={cn(styles.post, styles.excerpt)} key={p.id}>
          <h2><Link href="/post/[postId]" as={'/post/' + p.id}><a dangerouslySetInnerHTML={{
            __html: p.title.rendered
          }}></a></Link></h2>
          <small>{formatRelative(new Date(p.date), new Date(), { locale: de })}</small>
          <div dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
        </div>
      )
  }</CMS>
}
