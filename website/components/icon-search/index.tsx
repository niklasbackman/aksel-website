import styled from "styled-components";
import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, Detail, Heading, Modal } from "@navikt/ds-react";
import { LayoutContext } from "../templates/layout/Layout";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ModalContent from "./ModalContent";
import { useRouter } from "next/router";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";
import Filter, { FilterT } from "./Filter";

const ScIconSearch = styled.div<{ $isTablet: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.$isTablet ? `width: 100%;` : `width: 864px; max-width: 60vw;`};
  position: relative;
`;

const ScIcons = styled.div`
  grid-template-columns: repeat(auto-fit, 160px);
  align-content: start;
  display: grid;
  column-gap: 16px;
  row-gap: 24px;
  justify-content: flex-start;
  padding: 2rem 0;
`;

const ScIcon = styled.button`
  height: 8rem;
  width: 10rem;
  flex-shrink: 1;
  border-radius: 4px;
  background: none;
  border: none;
  border: 1px solid transparent;

  /* box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14); */

  :hover {
    background-color: var(--navds-color-gray-10);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScIconInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  height: 100%;
  width: 100%;

  svg {
    font-size: 2rem;
  }
`;

const ScIconTexts = styled.div`
  text-align: center;
  > * {
    :last-child {
      color: var(--navds-color-gray-60);
    }
  }
`;

const getName = (name: string) => {
  return name
    .replace("Filled", "")
    .replace("Outline", "")
    .replace("Stroke", "");
};

export const getTag = (name: string) => {
  switch (true) {
    case name.endsWith("Filled"):
      return "Filled";
    case name.endsWith("Outline"):
      return "Outline";
    case name.endsWith("Stroke"):
      return "Stroke";
    default:
      return "Outline";
  }
};

const IconSearch = () => {
  const context = useContext(LayoutContext);

  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const router = useRouter();
  const [visibleIcons, setVisibleIcons] = useState<IconMetaT[]>([]);

  const setQuery = useCallback((icon: string) => {
    const query = router.query;
    query.icon = icon;
    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  }, []);

  const handleSelect = useCallback((icon: string) => {
    setSelectedIcon(icon);
    setOpen(true);
    setQuery(icon);
  }, []);

  useEffect(() => {
    Modal.setAppElement("#__next");
    router.query.icon && handleSelect(router.query.icon as string);
    setVisibleIcons(meta.filter((x) => "Outline" === getTag(x.name)));
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedIcon(null);

    const query = router.query;
    delete query["icon"];

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleFilterChange = async (filter: FilterT) => {
    if (filter.toggle === "" && filter.value === "") {
      setVisibleIcons(meta);
      return;
    }

    let metaIcons = [...meta];

    metaIcons = metaIcons.filter(
      (x) => filter.toggle === getTag(x.name).toLowerCase()
    );

    if (filter.value) {
      metaIcons = metaIcons.filter(
        (x) =>
          x.name.toLowerCase().includes(filter.value) ||
          x.pageName.toLowerCase().includes(filter.value)
      );
    }

    setVisibleIcons([...metaIcons]);
  };

  const categories: CategoryT[] = categorizeIcons(visibleIcons);

  return (
    <ScIconSearch $isTablet={context.isTablet}>
      <Filter onFilterChange={handleFilterChange} />
      {categories.length === 0 && <BodyLong spacing>Ingen treff...</BodyLong>}
      {categories.map((cat) => {
        return (
          <div key={cat.category}>
            <Heading level="3" size="small">
              {cat.category}
            </Heading>
            <ScIcons>
              {cat.icons.map((i) => {
                const T = Icons[i.name];
                return (
                  <ScIcon
                    key={i.created_at}
                    onClick={() => handleSelect(i.name)}
                  >
                    <ScIconInner>
                      <div>
                        <T />
                      </div>
                      <ScIconTexts>
                        <Detail size="small"> {getName(i.name)}</Detail>
                        <Detail size="small"> {getTag(i.name)}</Detail>
                      </ScIconTexts>
                    </ScIconInner>
                  </ScIcon>
                );
              })}
            </ScIcons>
          </div>
        );
      })}
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedIcon && <ModalContent icon={selectedIcon} />}
        </Modal.Content>
      </Modal>
    </ScIconSearch>
  );
};
export default IconSearch;
