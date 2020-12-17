import { formatRelative } from 'date-fns'
import { de } from 'date-fns/locale'

import config from '../config'

import CMS from '../lib/cms'

import Comments from './comments'
import FeaturedImage from './featured-image'

import styles from '../styles/post.module.css'

export default function Post({ id }) {

  return <CMS endpoint={`/wp-json/wp/v2/posts/${id}?_fields=id,title,date,content&_embed=true`}>{
    post => <div className={styles.post}>
      <h2 dangerouslySetInnerHTML={{
        __html: post.title.rendered
      }} />

      {post._embedded['wp:featuredmedia'][0] && <FeaturedImage embedded={post._embedded['wp:featuredmedia'][0]} />}

      {/* {post._embedded['wp:featuredmedia'] &&
        <img
          className="featuredImage"
          src={post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url}
          alt={post._embedded['wp:featuredmedia'][0].alt_text}
          title={post._embedded['wp:featuredmedia'][0].title.rendered}
        />} */}

      <small>{formatRelative(new Date(post.date), new Date(), { locale: de })}</small>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <br />
      {!config.commentSettings.disableCommentsInPosts && <Comments id={post.id} />}

    </div>
  }</CMS>
}