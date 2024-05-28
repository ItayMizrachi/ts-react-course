import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface Props {
    onClick: () => void;
}

const Like = ({ onClick }: Props) => {
    const [full, setFull] = useState(false);
    const toggle = () => {
        setFull(!full);
        onClick();
    }

    return (
        <>
            {full ? <AiFillHeart color='red' size={20} onClick={toggle} />
                : <AiOutlineHeart size={20} onClick={toggle} />}
        </>
    )
}

export default Like