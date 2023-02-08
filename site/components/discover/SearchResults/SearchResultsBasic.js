import React from 'react'

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons'
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsBreadcrumb,
  useSearchResultsSelectedFacets,
  widget,
} from '@sitecore-discover/react'
import { AccordionFacets, Presence } from '@sitecore-discover/ui'

import {
  LoaderAnimation,
  LoaderContainer,
  SearchResultsLayout,
  StyledAccordionFacets,
  StyledBreadcrumb,
  StyledFilters,
  StyledGrid,
  StyledPageControls,
  StyledPagination,
  StyledProductCard,
  StyledQuerySummary,
  StyledSelect,
  StyledSortSelect,
} from './styled'

export const SearchResultsBasicStyled = ({
  defaultSortType = 'featured',
  defaultSortDirection = 'desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultProductsPerPage = 24,
}) => {
  const {
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onProductClick,
      onFilterClick,
      onSortChange,
      onFacetClick,
      onClearFilters,
    },
    context: {
      sortType = defaultSortType,
      sortDirection = defaultSortDirection,
      page = defaultPage,
      productsPerPage = defaultProductsPerPage,
    },
    queryResult: {
      isLoading,
      data: {
        total_page: totalPages = 0,
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        facet_names: facetNames = [],
        content: { product: { value: products = [] } = {} } = {},
      } = {},
    },
  } = useSearchResults(() => {
    let search = window.location.search
    let params = new URLSearchParams(search)

    return {
      sortType,
      sortDirection,
      page,
      productsPerPage,
      keyphrase: params.get('keyphrase'),
    }
  })
  const selectedSortIndex = sortChoices.findIndex(
    (s) => s.name === sortType && s.order === sortDirection
  )
  const categories = useSearchResultsBreadcrumb()
  const selectedFacetsFromApi = useSearchResultsSelectedFacets()

  if (isLoading) {
    return (
      <LoaderContainer>
        <Presence present={isLoading}>
          <LoaderAnimation
            aria-busy={isLoading}
            aria-hidden={!isLoading}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </LoaderAnimation>
        </Presence>
      </LoaderContainer>
    )
  }
  return (
    <SearchResultsLayout.Wrapper>
      <StyledBreadcrumb.Root>
        <StyledBreadcrumb.Navigation>
          <StyledBreadcrumb.List>
            {categories.map((c, index, { length }) => (
              <StyledBreadcrumb.Item key={index}>
                <StyledBreadcrumb.Link
                  href={c.url_path}
                  onClick={(e) => e.preventDefault()}
                >
                  {c.name}
                </StyledBreadcrumb.Link>
                {index < length - 1 && <StyledBreadcrumb.Separator value="»" />}
              </StyledBreadcrumb.Item>
            ))}
          </StyledBreadcrumb.List>
        </StyledBreadcrumb.Navigation>
      </StyledBreadcrumb.Root>
      <SearchResultsLayout.MainArea>
        <SearchResultsLayout.LeftArea>
          {selectedFacetsFromApi.length > 0 && (
            <StyledFilters.ClearFilters onClick={onClearFilters}>
              Clear Filters
            </StyledFilters.ClearFilters>
          )}
          <StyledFilters.SelectedFiltersList>
            {selectedFacetsFromApi.map((selectedFacet) =>
              selectedFacet.values.map((v, index) => (
                <StyledFilters.SelectedFiltersListItem key={`filter-${index}`}>
                  <StyledFilters.SelectedFiltersListItemText>
                    {selectedFacet.name}:{v.text}
                  </StyledFilters.SelectedFiltersListItemText>
                  <StyledFilters.SelectedFiltersListItemButton
                    onClick={() =>
                      onFilterClick({
                        facetId: selectedFacet.id,
                        facetValueId: v.id,
                        checked: false,
                      })
                    }
                  >
                    X
                  </StyledFilters.SelectedFiltersListItemButton>
                </StyledFilters.SelectedFiltersListItem>
              ))
            )}
          </StyledFilters.SelectedFiltersList>
          <StyledAccordionFacets.Root
            defaultFacetTypesExpandedList={[]}
            onFacetTypesExpandedListChange={() => {}}
            onFacetValueClick={onFacetClick}
          >
            {facetNames.map((f, index) => (
              <StyledAccordionFacets.Facet facetId={f} key={`facet-${index}`}>
                <StyledAccordionFacets.Header>
                  <StyledAccordionFacets.Trigger>
                    {facets[f].display_name}
                  </StyledAccordionFacets.Trigger>
                </StyledAccordionFacets.Header>
                <AccordionFacets.Content>
                  <StyledAccordionFacets.ValueList>
                    {facets[f].value.map((v, index) => (
                      <StyledAccordionFacets.Item
                        {...{ index, facetValueId: v.id }}
                        key={`facet-item-${index}`}
                      >
                        <StyledAccordionFacets.ItemCheckbox>
                          <StyledAccordionFacets.ItemCheckboxIndicator>
                            <CheckIcon />
                          </StyledAccordionFacets.ItemCheckboxIndicator>
                        </StyledAccordionFacets.ItemCheckbox>
                        <StyledAccordionFacets.ItemCheckboxLabel>
                          {v.text} {v.count && `(${v.count})`}
                        </StyledAccordionFacets.ItemCheckboxLabel>
                      </StyledAccordionFacets.Item>
                    ))}
                  </StyledAccordionFacets.ValueList>
                </AccordionFacets.Content>
              </StyledAccordionFacets.Facet>
            ))}
          </StyledAccordionFacets.Root>
        </SearchResultsLayout.LeftArea>
        <SearchResultsLayout.RightArea>
          {/* Sort Select */}
          <SearchResultsLayout.RightTopArea>
            {totalItems && (
              <StyledQuerySummary>
                Showing {productsPerPage * (page - 1) + 1} -{' '}
                {productsPerPage * (page - 1) + products.length} of {totalItems}{' '}
                results
              </StyledQuerySummary>
            )}
            <StyledSortSelect.Root
              defaultValue={
                selectedSortIndex > -1 ? sortChoices[selectedSortIndex] : {}
              }
              onValueChange={onSortChange}
            >
              <StyledSortSelect.Trigger>
                <StyledSortSelect.SelectValue>
                  {selectedSortIndex > -1
                    ? sortChoices[selectedSortIndex].label
                    : ''}
                </StyledSortSelect.SelectValue>
                <StyledSortSelect.Icon />
              </StyledSortSelect.Trigger>
              <StyledSortSelect.Content>
                <StyledSortSelect.Viewport>
                  {sortChoices.map((option, index) => (
                    <StyledSortSelect.Option
                      value={option}
                      key={`sort-${index}`}
                    >
                      <StyledSortSelect.OptionText>
                        {option.label}
                      </StyledSortSelect.OptionText>
                    </StyledSortSelect.Option>
                  ))}
                </StyledSortSelect.Viewport>
              </StyledSortSelect.Content>
            </StyledSortSelect.Root>
          </SearchResultsLayout.RightTopArea>

          {/* Results */}
          <StyledGrid>
            {products.map((p, index) => (
              <StyledProductCard.Root product={p} key={`product-${index}`}>
                <StyledProductCard.Image />
                <StyledProductCard.Sku />
                <StyledProductCard.Name>
                  <StyledProductCard.Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      onProductClick({ sku: p.sku || '' })
                    }}
                  >
                    {p.name}
                  </StyledProductCard.Link>
                </StyledProductCard.Name>
                {p.final_price && (
                  <StyledProductCard.Price>
                    ${p.final_price}
                  </StyledProductCard.Price>
                )}
              </StyledProductCard.Root>
            ))}
          </StyledGrid>
          <StyledPageControls>
            <div>
              <label>Results Per Page</label>
              <StyledSelect.Root
                defaultValue={String(defaultProductsPerPage)}
                onValueChange={(v) =>
                  onResultsPerPageChange({ numProducts: Number(v) })
                }
              >
                <StyledSelect.Trigger>
                  <StyledSelect.SelectValue />
                  <StyledSelect.Icon />
                </StyledSelect.Trigger>
                <StyledSelect.Content>
                  <StyledSelect.Viewport>
                    <StyledSelect.Option value="24">
                      <StyledSelect.OptionText>24</StyledSelect.OptionText>
                    </StyledSelect.Option>

                    <StyledSelect.Option value="48">
                      <StyledSelect.OptionText>48</StyledSelect.OptionText>
                    </StyledSelect.Option>

                    <StyledSelect.Option value="64">
                      <StyledSelect.OptionText>64</StyledSelect.OptionText>
                    </StyledSelect.Option>
                  </StyledSelect.Viewport>
                </StyledSelect.Content>
              </StyledSelect.Root>
            </div>
            <div>
              <StyledPagination.Root
                currentPage={page}
                defaultCurrentPage={1}
                totalPages={totalPages}
                onPageChange={(v) => onPageNumberChange({ page: v })}
                href={(n) => n}
              >
                <StyledPagination.PrevPage onClick={(e) => e.preventDefault()}>
                  <ArrowLeftIcon />
                </StyledPagination.PrevPage>
                <StyledPagination.Pages>
                  {({ pages }) =>
                    pages.map(({ page }) => (
                      <StyledPagination.Page
                        key={page}
                        aria-label={`Page ${page}`}
                        page={page}
                        onClick={(e) => e.preventDefault()}
                      >
                        {page}
                      </StyledPagination.Page>
                    ))
                  }
                </StyledPagination.Pages>
                <StyledPagination.NextPage onClick={(e) => e.preventDefault()}>
                  <ArrowRightIcon />
                </StyledPagination.NextPage>
              </StyledPagination.Root>
            </div>
          </StyledPageControls>
        </SearchResultsLayout.RightArea>
      </SearchResultsLayout.MainArea>
    </SearchResultsLayout.Wrapper>
  )
}

const SearchResultsBasicStyledWidget = widget(
  SearchResultsBasicStyled,
  WidgetDataType.SEARCH_RESULTS
)
export default SearchResultsBasicStyledWidget
