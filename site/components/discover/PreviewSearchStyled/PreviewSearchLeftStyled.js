import React from 'react'

import { Presence } from '@radix-ui/react-presence'
import { debounce } from '@sitecore-discover/common'
import { WidgetDataType, widget } from '@sitecore-discover/react'
import { usePreviewSearchWithLocks } from '@sitecore-discover/ui'

import {
  Group,
  Link,
  LoaderAnimation,
  LoaderContainer,
  SearchGroupHeading,
  StyledGrid,
  StyledGroupList,
  StyledInputTrigger,
  StyledMainContent,
  StyledMainList,
  StyledMainListItem,
  StyledProductCard,
  StyledRoot,
  StyledSubContent,
  StyledSubItem,
  StyledSubList,
  StyledTrigger,
} from './styled'

const getSelectedElement = (categories, suggestions, trendingCategories) => {
  if (trendingCategories.length > 0) {
    return trendingCategories[0].text
  }
  if (categories.length > 0) {
    return categories[0].text
  }
  if (suggestions.length > 0) {
    return suggestions[0].text
  }
  return ''
}

export const PreviewSearchLeftStyled = ({ defaultProductsPerPage = 6 }) => {
  const {
    setLock,
    lock,
    trendingCategoriesToShow,
    categoriesToShow,
    suggestionsToShow,
    context: { productsPerPage = defaultProductsPerPage },
    actions: {
      onTrendingCategoryChange,
      onKeyphraseChange,
      onCategoryChange,
      onSuggestionChange,
      onProductClick,
    },
    queryResult: {
      isFetching,
      isLoading,
      data: { content: { product: { value: products = [] } = {} } = {} } = {},
    },
  } = usePreviewSearchWithLocks((query) => {
    query.getRequest().setNumberProducts(productsPerPage)
    return {
      productsPerPage,
    }
  })

  const trendingCategoryHandler = debounce((text) => {
    setLock(false)
    onTrendingCategoryChange({ trendingCategory: text })
  }, 100)

  const keyphraseHandler = debounce((event) => {
    const target = event.target
    setLock(false)
    onKeyphraseChange({ keyphrase: target.value })
  }, 100)

  const categoryHandler = debounce((text) => {
    setLock(true)
    onCategoryChange({ category: text })
  }, 100)

  const suggestionHandler = debounce((text) => {
    setLock(true)
    onSuggestionChange({ suggestion: text })
  }, 100)
  const loading = (isLoading || isFetching) && !lock
  return (
    <StyledRoot>
      <StyledMainList>
        <StyledMainListItem>
          <StyledInputTrigger onKeyUp={keyphraseHandler} autoComplete="off" />
          <StyledMainContent>
            {loading && (
              <LoaderContainer>
                <Presence present={loading}>
                  <LoaderAnimation
                    aria-busy={loading}
                    aria-hidden={!loading}
                    focusable="false"
                    role="progressbar"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                  </LoaderAnimation>
                </Presence>
              </LoaderContainer>
            )}
            {!loading && (
              <StyledSubContent
                orientation="vertical"
                defaultValue={getSelectedElement(
                  categoriesToShow,
                  suggestionsToShow,
                  trendingCategoriesToShow
                )}
              >
                <StyledGroupList>
                  {/* ul */}
                  {trendingCategoriesToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>
                        Trending categories
                      </SearchGroupHeading>
                      {trendingCategoriesToShow.map(({ text }) => (
                        <Group value={text} key={text}>
                          {/* li */}
                          <StyledTrigger
                            onFocus={() => trendingCategoryHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {/* ul */}
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  {/* li */}
                                  <Link
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      onProductClick({ sku: p.sku || '' })
                                      // add redirection or any action
                                    }}
                                  >
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>
                                          ${p.final_price}
                                        </StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                  {categoriesToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Categories</SearchGroupHeading>
                      {categoriesToShow.map(({ text }) => (
                        <Group value={text} key={text}>
                          <StyledTrigger onFocus={() => categoryHandler(text)}>
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link href="#">
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>
                                          ${p.final_price}
                                        </StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                  {suggestionsToShow.length > 0 && (
                    <>
                      <SearchGroupHeading>Suggestions</SearchGroupHeading>
                      {suggestionsToShow.map(({ text }) => (
                        <Group value={text} key={text}>
                          <StyledTrigger
                            onFocus={() => suggestionHandler(text)}
                          >
                            {text}
                          </StyledTrigger>
                          <StyledGrid>
                            <StyledSubList>
                              {products.map((p, i) => (
                                <StyledSubItem key={i.toString()}>
                                  <Link href="#">
                                    <StyledProductCard.Root product={p}>
                                      <StyledProductCard.Image />
                                      <StyledProductCard.Name />
                                      {p.final_price && (
                                        <StyledProductCard.Price>
                                          ${p.final_price}
                                        </StyledProductCard.Price>
                                      )}
                                    </StyledProductCard.Root>
                                  </Link>
                                </StyledSubItem>
                              ))}
                            </StyledSubList>
                          </StyledGrid>
                        </Group>
                      ))}
                    </>
                  )}
                </StyledGroupList>
              </StyledSubContent>
            )}
          </StyledMainContent>
        </StyledMainListItem>
      </StyledMainList>
    </StyledRoot>
  )
}

const PreviewSearchLeftStyledWidget = widget(
  PreviewSearchLeftStyled,
  WidgetDataType.PREVIEW_SEARCH
)
export default PreviewSearchLeftStyledWidget
