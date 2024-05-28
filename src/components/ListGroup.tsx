import { MouseEvent, useState } from "react";
import styled from "styled-components";

interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}

interface ListItemProps {
    active: boolean;
}

const List = styled.ul`
list-style: none;
padding: 0;
`;

const ListItem = styled.li<ListItemProps>`
padding: 5px 0;
background: ${props => props.active ? 'blue' : 'none'}
`;


function ListGroup({ items, heading, onSelectItem }: Props) {


    const [selectedIndex, setSelectedIndex] = useState(0);
    const arr = useState(-1);
    arr[0] //variable (selected index)
    arr[1] //updater function

    // items = []

    // const message = items.length === 0 ? <p>No Item Found</p> : null;

    const handleClick = (e: MouseEvent) => {
        console.log(e);
    }

    const getMessage = () => {
        return items.length === 0 ? <p>No Item Found</p> : null;
    }

    // if (items.length === 0)
    //     return (
    //         <>
    //             <h1>List</h1>
    //             <p>No Item Found</p>
    //         </>
    //     )

    return (
        <>
            <h1>{heading}</h1>
            {items.length === 0 && <p>No Item Found</p>}
            <List className="list-group">
                {items.map((item, index) => <ListItem active={index === selectedIndex} onClick={() => {
                    setSelectedIndex(index);
                    onSelectItem(item);
                }}
                    className={selectedIndex === index ? `list-group-item active` : `list-group-item`} key={item}>{item}</ListItem>)}
            </List>
        </>
    )
}

export default ListGroup;