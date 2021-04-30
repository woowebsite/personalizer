Product Base
    id
    title
    description
    status  Draft | Active
    visibility  Public | Private
    publish_date    Immediate | scheduled     
    category_id
    provider_id
    thumbnail_id

ProductBase_Category
    id
    title
    parentId

ProductBase_Tags
    id
    text
    product_base_id

Providers
    id
    name
    description

Thumbnail
    id
    url
    small_url
    large_url
    medium_url
    isPrimary
    type: Mockup, ProductBase
    refId

PrintArea
    id
    name
    width
    height
    isCombine
    product_base_id

Mockup
    id
    name
    background
    width
    height
    thumbnail_id
    isNoise
    isPrimary
    product_base_id