import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import usePrice from '@framework/product/use-price'
import ProductTag from '../../product/ProductTag'
import { SearchResponseProduct } from '@sitecore-discover/react'

interface Props {
  className?: string
  product: SearchResponseProduct
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
  onProductClick: any
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
  onProductClick,
}) => {
  const { price } = usePrice({
    amount: product.final_price,
    baseAmount: +product.price!,
    currencyCode: 'USD',
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link
      href={`/product/${product.sku}`}
      className={rootClassName}
      aria-label={product.name}
      onClick={(event) => {
        event.preventDefault()
        onProductClick({ sku: product.sku || '' })
        window.location.href = `/product/${product.sku}`
      }}
    >
      {variant === 'slim' && (
        <>
          <div className={s.header}>
            <span>{product.name}</span>
          </div>
          {product?.image_url && (
            <Image
              quality="85"
              src={'https:' + product.image_url || placeholderImg}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              {...imgProps}
            />
          )}
        </>
      )}

      {variant === 'simple' && (
        <>
          {!noNameTag && (
            <div className={s.header}>
              <h3 className={s.name}>
                <span>{product.name}</span>
              </h3>
              <div className={s.price}>{`${price} USD`}</div>
            </div>
          )}
          <div className={s.imageContainer}>
            {product?.image_url && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={'https:' + product.image_url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}

      {variant === 'default' && (
        <>
          <ProductTag name={product.name!} price={`${price} USD`} />
          <div className={s.imageContainer}>
            {product?.image_url && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={'https:' + product.image_url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}
    </Link>
  )
}

export default ProductCard
