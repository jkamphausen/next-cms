import { formatRelative } from 'date-fns'
import { de } from 'date-fns/locale'


import CMS from '../lib/cms'

import Comments from './comments'

import styles from '../styles/post.module.css'

export default function Post({ id }) {

  return <CMS endpoint={`/wp-json/wp/v2/posts/${id}?_fields=id,title,date,content`}>{
    post => <div className={styles.post}>
      <h2 dangerouslySetInnerHTML={{
        __html: post.title.rendered
      }} />
      {/* <small>{post.date}</small> */}
      <small>{formatRelative(new Date(post.date), new Date(), { locale: de })}</small>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <br />
      <Comments id={post.id} />
    </div>
  }</CMS>
}