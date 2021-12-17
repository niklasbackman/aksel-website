import { SandboxComponent } from "./types";

const data = [
  { name: "Donald Smith", age: 32, country: "USA", points: 38 },
  { name: "Preben Aalborg", age: 44, country: "Denmark", points: 11 },
  { name: "Rudolph Bachenmeier", age: 32, country: "Germany", points: 70 },
  {
    name: "Nawaf Al-Ahmad Al-Jaber Al-Sabah",
    age: 25,
    country: "Kuwait",
    points: 95,
  },
  { name: "Per Hansen", age: 61, country: "Norway", points: 15 },
  {
    name: "Christina Salikova",
    age: 48,
    country: "Czech Republic",
    points: 38,
  },
  { name: "Nina Margeaux", age: 19, country: "France", points: 64 },
];

const ButtonSandbox: SandboxComponent = (props, variant) => {
  const propZebraStripes = props?.zebraStripes ? ` zebraStripes` : "";
  const propSize = props?.size ? ` size="${props.size}"` : "";

  const comp = `<Table${propZebraStripes}${propSize}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell scope="col">Name</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Age</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Country</Table.HeaderCell>
                      <Table.HeaderCell scope="col">Points</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  ${data
                    .map(
                      ({ name, age, country, points }) =>
                        `<Table.Row>
                          <Table.HeaderCell scope="row">${name}</Table.HeaderCell>
                          <Table.DataCell>${age}</Table.DataCell>
                          <Table.DataCell>${country}</Table.DataCell>
                          <Table.DataCell>${points}</Table.DataCell>
                        </Table.Row>`
                    )
                    .join("")}
                  </Table.Body>
                </Table>`;

  switch (variant) {
    case "":
      return comp;
    case "Selectable":
      return `
      const SelectableTable = () => {
        const [selectedRows, toggleSelectedRow] = useToggleList([]);

        return (
          <Table${propZebraStripes}${propSize}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Selected</Table.HeaderCell>
                <Table.HeaderCell scope="col">Name</Table.HeaderCell>
                <Table.HeaderCell scope="col">Age</Table.HeaderCell>
                <Table.HeaderCell scope="col">Country</Table.HeaderCell>
                <Table.HeaderCell scope="col">Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            ${data
              .map(
                ({ name, age, country, points }, i) =>
                  `<Table.Row selected={selectedRows.includes("${i}")}>
                    <Table.DataCell>
                      <Checkbox
                        ${propSize}
                        hideLabel
                        checked={selectedRows.includes("${i}")}
                        onChange={() => toggleSelectedRow("${i}")}
                        aria-labelledby="id${i}"
                      >
                        {" "}
                      </Checkbox>
                    </Table.DataCell>
                    <Table.HeaderCell scope="row">
                      <span id="id${i}">${name}</span>
                    </Table.HeaderCell>
                    <Table.DataCell>${age}</Table.DataCell>
                    <Table.DataCell>${country}</Table.DataCell>
                    <Table.DataCell>${points}</Table.DataCell>
                  </Table.Row>`
              )
              .join("")}
            </Table.Body>
          </Table>
        );
      }
      
      render(<SelectableTable />)
      const useToggleList = (initialState) => {
        const [list, setList] = React.useState(initialState);
    
        return [
          list,
          (value) =>
            setList((list) =>
              list.includes(value)
                ? list.filter((id) => id !== value)
                : [...list, value]
            ),
        ];
      };
      `;
    default:
      return comp;
  }
};

ButtonSandbox.args = {
  props: {
    size: ["", "medium", "small"],
    zebraStripes: false,
  },
  variants: ["", "Selectable"],
  background: "white",
};

export default ButtonSandbox;
