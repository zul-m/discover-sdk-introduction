import { FC } from 'react'
import { useRecommendation } from '@sitecore-discover/react'
import ProductCard from '../ProductCard'

interface ComponentProps {
  title?: string
  productsToDisplay?: number
}

const GenericRecommendation: FC<ComponentProps> = ({
  title,
  productsToDisplay,
}) => {
  const {
    actions: { onProductClick },
    context: { productsPerPage = productsToDisplay },
    queryResult: {
      isLoading,
      isFetching,
      data: { content: { product: { value: products = [] } = {} } = {} } = {},
    },
  } = useRecommendation((query) => {
    query.getRequest().setNumberProducts(productsPerPage)
    return {
      productsPerPage,
    }
  })

  const ready = !isLoading && !isFetching

  if (!ready || (ready && products.length === 0)) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-row">
      {title && <h2>{title}</h2>}
      {products.map((product, index) => (
        <ProductCard
          key={product.sku}
          product={product}
          variant="slim"
          onProductClick={onProductClick}
        />
      ))}
    </div>
  )
}

export default GenericRecommendation
