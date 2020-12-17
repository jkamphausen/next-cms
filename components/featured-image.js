import styled from 'styled-components'

const FeaturedImageStyles = styled.img`
    
`

export default function FeaturedImage({ embedded }) {

    const image = embedded;

    return (
        <FeaturedImageStyles
            className="featuredImage"
            src={image.media_details.sizes.full.source_url}
            alt={image.alt_text}
            title={image.title.rendered}
        />
    )
}