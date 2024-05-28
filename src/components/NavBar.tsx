
interface Props {
    carItemsCount: number
}

const NavBar = ({ carItemsCount }: Props) => {
    return (
        <div>NavBar: {carItemsCount}</div>
    )
}

export default NavBar