import React from 'react'
import ContentLoader from 'react-content-loader'
const ProductLoaders = (props) => {
    return (
        <ContentLoader 
        speed={1}
        width={1000}
        height={50}
        viewBox="0 0 1000 50"
        backgroundColor="var(--main-bg)"
        foregroundColor="#dddbdb"
        {...props}
      >
        <rect x="0" y="6" rx="6" ry="6" width="1000" height="37" /> 
        </ContentLoader>
    )
}

export default ProductLoaders
