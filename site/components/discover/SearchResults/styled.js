import styled, { keyframes } from 'styled-components'

import {
  AccordionFacets,
  Breadcrumb,
  FacetItem,
  Pagination,
  ProductCard,
  Select as SelectPrimitive,
  SortSelect,
  theme,
} from '@sitecore-discover/ui'

const StyledBreadcrumbRoot = styled(Breadcrumb.Root)`
  width: 100%;
  display: inline-block;
`

const StyledBreadcrumbList = styled(Breadcrumb.List)`
  list-style: none;
  padding: 0;
`

const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  display: inline;
  color: ${theme.vars.palette.primary.main};
  margin-left: ${theme.vars.spacing.xs};
`

const StyledBreadcrumbNavigation = styled(Breadcrumb.Navigation)``

const StyledBreadcrumbLink = styled(Breadcrumb.Link)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  text-decoration: none;
`

const StyledBreadcrumbSeparator = styled(Breadcrumb.Separator)``

export const StyledBreadcrumb = {
  Root: StyledBreadcrumbRoot,
  List: StyledBreadcrumbList,
  Item: StyledBreadcrumbItem,
  Navigation: StyledBreadcrumbNavigation,
  Link: StyledBreadcrumbLink,
  Separator: StyledBreadcrumbSeparator,
}

const selectTriggerStyle = `
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${theme.vars.spacing.xs};
  background-color: transparent;
  height: 40px;
  padding: ${theme.vars.spacing.xs} ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.main};
  border: none;
  &:focus {
    outline: none;
  }
`

const StyledSortSelectTrigger = styled(SortSelect.Trigger)`
  ${selectTriggerStyle}
`

const StyledGenericSelectTrigger = styled(SelectPrimitive.Trigger)`
  ${selectTriggerStyle}
`

const contentSelectStyle = `
  background-color: ${theme.vars.palette.primary.contrastText};
  position: relative;
  overflow: hidden;
  color: ${theme.vars.palette.primary.main};
  box-shadow: 2px 2px 4px ${theme.vars.palette.grey['400']};
  position: absolute;
  top: 30px;
  &:focus-within {
    border-color: ${theme.vars.palette.primary.dark};
  }
`

const StyledSortSelectContent = styled(SortSelect.Content)`
  ${contentSelectStyle}
`

const StyledGenericSelectContent = styled(SelectPrimitive.SelectContent)`
  ${contentSelectStyle}
`

const viewportSelectStyles = `
  padding: ${theme.vars.spacing.xs};
  z-index: 50000;
`

const StyledSortSelectViewport = styled(SortSelect.Viewport)`
  ${viewportSelectStyles}
`

const StyledGenericSelectViewport = styled(SelectPrimitive.Viewport)`
  ${viewportSelectStyles}
`

const optionSelectStyles = `
  display: flex;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 ${theme.vars.spacing.xs};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  color: ${theme.vars.palette.primary.main};
  position: relative;
  border-radius: 0px;
  background-color: #000;

  &[data-highlighted] {
    border-radius: 0;
    background-color: #fff;
    color: #000;
  }
  &[data-disabled] {
    color: ${theme.vars.palette.grey['800']};
    font-style: italic;
  }
`

const StyledSortSelectOption = styled(SortSelect.Option)`
  ${optionSelectStyles}
`

const StyledGenericSelectOption = styled(SelectPrimitive.SelectItem)`
  ${optionSelectStyles}
`

const StyledSortSelectValue = styled(SortSelect.SelectValue)`
  color: ${theme.vars.palette.primary.main};
`

const StyledGenericSelectValue = styled(SelectPrimitive.SelectValue)`
  color: ${theme.vars.palette.primary.main};
`

const StyledSortSelectIcon = styled(SortSelect.Icon)``

const StyledGenericSelectIcon = styled(SelectPrimitive.Icon)``

const StyledSortSelectRoot = styled(SortSelect.Root)``
const StyledGenericSelectRoot = styled(SelectPrimitive.Root)``

const StyledSortSelectOptionText = styled(SortSelect.OptionText)``
const StyledGenericSelectOptionText = styled(SortSelect.OptionText)``

export const StyledSortSelect = {
  Trigger: StyledSortSelectTrigger,
  Content: StyledSortSelectContent,
  Viewport: StyledSortSelectViewport,
  Option: StyledSortSelectOption,
  SelectValue: StyledSortSelectValue,
  Root: StyledSortSelectRoot,
  OptionText: StyledSortSelectOptionText,
  Icon: StyledSortSelectIcon,
}

export const StyledSelect = {
  Root: StyledGenericSelectRoot,
  Trigger: StyledGenericSelectTrigger,
  Icon: StyledGenericSelectIcon,
  SelectValue: StyledGenericSelectValue,
  Content: StyledGenericSelectContent,
  Viewport: StyledGenericSelectViewport,
  Option: StyledGenericSelectOption,
  OptionText: StyledGenericSelectOptionText,
}

const StyledProductRoot = styled(ProductCard.Root)`
  border: solid 1px ${theme.vars.palette.grey['400']};
  box-shadow: 2px 2px 4px ${theme.vars.palette.grey['400']};
  max-width: 200px;
  padding: ${theme.vars.spacing.m};
  cursor: pointer;
  display: block;
  &:focus-within {
    border: solid 1px ${theme.vars.palette.primary.main};
  }
  &:hover {
    border: solid 1px ${theme.vars.palette.primary.main};
  }
`

const StyledProductImage = styled(ProductCard.Image)`
  width: 100%;
  object-fit: cover;
  display: block;
`

const StyledProductName = styled(ProductCard.Name)`
  margin: 0 0 ${theme.vars.spacing.m};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  font-weight: ${theme.vars.typography.fontSize4.fontWeight};
  line-height: ${theme.vars.typography.fontSize4.lineHeight};
`

const StyledProductContent = styled(ProductCard.Content)`
  margin: 0;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: ${theme.vars.typography.fontWeight};
  line-height: ${theme.vars.typography.lineHeight};
  color: ${theme.vars.palette.primary.main};
`

const StyledProductSku = styled(ProductCard.Sku)`
  font-family: ${theme.vars.typography.fontFamilySystem};
  color: ${theme.vars.palette.primary.main};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`

const StyledProductLink = styled.a`
  text-decoration: none;
  color: ${theme.vars.palette.primary.main};
  font-size: ${theme.vars.typography.fontSize4.fontSize};
  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const StyledPrice = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`

export const StyledProductCard = {
  Link: StyledProductLink,
  Sku: StyledProductSku,
  Content: StyledProductContent,
  Image: StyledProductImage,
  Name: StyledProductName,
  Root: StyledProductRoot,
  Price: StyledPrice,
}

const AccordionItemCheckboxStyled = styled(AccordionFacets.ItemCheckbox)`
  all: unset;
  background-color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &[data-state='checked'] {
    color: ${theme.vars.palette.primary.contrastText};
    background-color: ${theme.vars.palette.primary.main};
  }

  &:focus {
    border: solid 1px ${theme.vars.palette.primary['900']};
  }
`

const AccordionItemToggleStyled = styled(AccordionFacets.ItemToggle)`
  all: unset;
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  margin-right: ${theme.vars.spacing.s};

  &:focus {
    border: solid 1px ${theme.vars.palette.primary['900']};
  }

  &[data-state='on'] {
    background-color: ${theme.vars.palette.primary.main};
    color: ${theme.vars.palette.primary.contrastText};
  }
`

const AccordionItemCheckboxIndicatorStyled = styled(
  AccordionFacets.ItemCheckboxIndicator
)`
  color: ${theme.vars.palette.primary.contrastText};
  width: 15px;
  height: 15px;
`

const AccordionValueListStyled = styled(AccordionFacets.ValueList)`
  list-style: none;
  li {
    padding: ${theme.vars.spacing.xs} 0;
    font-family: ${theme.vars.typography.fontFamilySystem};
    font-size: ${theme.vars.typography.fontSize1.fontSize};
  }

  &[data-orientation='horizontal'] {
    display: flex;
    flex-direction: row;
  }
`

const AccordionItemCheckboxLabelStyled = styled(AccordionFacets.ItemLabel)`
  padding-left: ${theme.vars.spacing.xs};
  color: ${theme.vars.palette.primary.main};
`

const AccordionItemStyled = styled(FacetItem)`
  display: flex;
  align-items: center;
`

const AccordionHeaderStyled = styled(AccordionFacets.Header)`
  display: flex;
  margin-top: ${theme.vars.spacing.s};
  margin-bottom: ${theme.vars.spacing.s};
`
const AccordionTriggerStyled = styled(AccordionFacets.Trigger)`
  align-items: center;
  color: ${theme.vars.palette.primary.main};
  display: flex;
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  height: 45px;
  justify-content: space-between;
  line-height: 1;
  padding: 0 ${theme.vars.spacing.m};
  flex: 1 1 0;
  background: none;
  border: none;
`

const AccordionFacetsFacetStyled = styled(AccordionFacets.Facet)`
  border-bottom: solid 1px ${theme.vars.palette.grey['800']};
`

const AccordionFacetsRootStyled = styled(AccordionFacets.Root)``

export const StyledAccordionFacets = {
  Trigger: AccordionTriggerStyled,
  Header: AccordionHeaderStyled,
  Item: AccordionItemStyled,
  ItemCheckboxLabel: AccordionItemCheckboxLabelStyled,
  ValueList: AccordionValueListStyled,
  ItemCheckboxIndicator: AccordionItemCheckboxIndicatorStyled,
  ItemToggle: AccordionItemToggleStyled,
  ItemCheckbox: AccordionItemCheckboxStyled,
  Facet: AccordionFacetsFacetStyled,
  Root: AccordionFacetsRootStyled,
}

const paginationLinkStyle = `
  cursor: pointer;
  margin: 0 5px;

  &[data-current='true'] {
    color: gray;
    pointer-events: none;
    text-decoration-line: none;
  }
`

const paginationNavigationLinkStyle = `
  ${paginationLinkStyle}
  &[data-current='true'] {
    display: none;
  }
`

const PaginationRootStyled = styled(Pagination.Root)`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  margin-top: ${theme.vars.spacing.m};
`
const PaginationPrevPageStyled = styled(Pagination.PrevPage)`
  display: inline;
  ${paginationNavigationLinkStyle}
`
const PaginationNextPageStyled = styled(Pagination.NextPage)`
  display: inline;
  ${paginationNavigationLinkStyle}
`
const PaginationFirstPageStyled = styled(Pagination.FirstPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationNavigationLinkStyle}
`
const PaginationLastPageStyled = styled(Pagination.LastPage)`
  font-size: ${theme.vars.typography.fontSize2.fontSize};
  ${paginationLinkStyle}
`
const PaginationPageStyled = styled(Pagination.Page)`
  cursor: pointer;
  ${paginationLinkStyle}
`
const PaginationPagesStyled = styled(Pagination.Pages)`
  display: inline;
`

export const StyledPagination = {
  Root: PaginationRootStyled,
  PrevPage: PaginationPrevPageStyled,
  NextPage: PaginationNextPageStyled,
  FirstPage: PaginationFirstPageStyled,
  LastPage: PaginationLastPageStyled,
  Page: PaginationPageStyled,
  Pages: PaginationPagesStyled,
}

const Wrapper = styled.div``

const MainArea = styled.div`
  display: flex;
  max-width: 100%;
`

const LeftArea = styled.section`
  position: relative;
  flex: 1 1;
  margin-right: ${theme.vars.spacing.l};
`

const RightArea = styled.section`
  display: flex;
  flex-direction: column;
  flex: 4 1;
`

const RightTopArea = styled.section`
  display: flex;
  justify-content: space-between;
`

export const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${theme.vars.spacing.m};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-flow: row;
`

const ClearFilters = styled.button`
  background: none;
  border: none;
  color: ${theme.vars.palette.primary.main};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const SelectedFiltersList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: ${theme.vars.spacing.s};
`

const SelectedFiltersListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${theme.vars.spacing.xs} 0 ${theme.vars.spacing.xs} 0;
`

const SelectedFiltersListItemText = styled.span`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`

const SelectedFiltersListItemButton = styled.button`
  background: none;
  border: none;
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  cursor: pointer;
`

export const StyledPageControls = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
`

export const StyledQuerySummary = styled.div`
  color: ${theme.vars.palette.primary.main};
  font-family: ${theme.vars.typography.fontFamilySystem};
  font-size: ${theme.vars.typography.fontSize1.fontSize};
  font-weight: bold;
  margin: auto 0;
`

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  min-height: 50vh;
`

const Rotate = keyframes`
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`

export const LoaderAnimation = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  display: block;
  fill: ${theme.vars.palette.primary.main};
  height: 50px;
  margin: auto;
  width: 50px;
`

export const StyledFilters = {
  ClearFilters,
  SelectedFiltersList,
  SelectedFiltersListItem,
  SelectedFiltersListItemText,
  SelectedFiltersListItemButton,
}

export const SearchResultsLayout = {
  Wrapper,
  MainArea,
  LeftArea,
  RightArea,
  RightTopArea,
}
