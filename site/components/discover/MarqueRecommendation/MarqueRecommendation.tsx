import { FC } from 'react'
import {
  useRecommendation,
  widget,
  WidgetDataType,
} from '@sitecore-discover/react'
import { Marquee } from '@components/ui'
import ProductCard from '../ProductCard'

interface ComponentProps {
  title?: string
  productsToDisplay?: number
}

const MarqueRecommendation: FC<ComponentProps> = ({
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
    <div>
      {title && <h2>{title}</h2>}
      <Marquee>
        {products.map((product, index) => (
          <ProductCard
            key={product.sku}
            product={product}
            variant="slim"
            onProductClick={onProductClick}
          />
        ))}
      </Marquee>
    </div>
  )
}

export default widget(MarqueRecommendation, WidgetDataType.RECOMMENDATION)
