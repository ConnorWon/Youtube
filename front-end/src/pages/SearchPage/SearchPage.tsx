import { Tooltip } from "@mui/material";
import {
  MainContainer,
  OuterContainer,
  OuterColumnContainer,
  MainColumnContainer,
  InnerColumnContainer,
  FiltersMenu,
  ButtonContainer,
  FilterButton,
  IconContainer,
  ButtonText,
  FilterCollapsible,
  MenuContent,
  FilterGroup,
  FilterGroupHeader,
  FilterType,
  ContentContainer,
} from "./Styling";
import { useState, useEffect, useContext } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { HorizontalVideo } from "./HorizontalVideo";
import { SidebarContext } from "../../contexts/SidebarContext";
import {SEARCH_FILTERS} from "../../utils/Constants";

// dummy data to produce videos on page
const videos = [1, 2, 3, 4, 5];

export const SearchPage = () => {
  // state for opening filter tab
  const [open, setOpen] = useState<boolean>(false);

  // handles opening and closing filter tab
  const handleClick = () => {
    setOpen(!open);
  };

  const { setModalSideExpand } = useContext(SidebarContext);

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  return (
    <MainContainer>
      <OuterContainer>
        <OuterColumnContainer>
          <MainColumnContainer>
            <InnerColumnContainer>
              <FiltersMenu>
                <ButtonContainer>
                  <Tooltip
                    title={
                      open ? "Close search filters" : "Open search filters"
                    }
                  >
                    <FilterButton onClick={() => handleClick()}>
                      <IconContainer>
                        <TuneIcon />
                      </IconContainer>
                      <ButtonText>Filters</ButtonText>
                    </FilterButton>
                  </Tooltip>
                </ButtonContainer>
                <FilterCollapsible in={open} timeout="auto">
                  <MenuContent direction="row">
                    {SEARCH_FILTERS.map((filter) => (
                      <FilterGroup>
                        <FilterGroupHeader>{filter.category}</FilterGroupHeader>
                        {filter.options.map((option) => (
                          <FilterType>{option}</FilterType>
                        ))}
                      </FilterGroup>
                    ))}
                  </MenuContent>
                </FilterCollapsible>
              </FiltersMenu>
              <ContentContainer>
                {videos.map(() => (
                  <HorizontalVideo />
                ))}
              </ContentContainer>
            </InnerColumnContainer>
          </MainColumnContainer>
        </OuterColumnContainer>
      </OuterContainer>
    </MainContainer>
  );
};
