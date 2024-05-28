import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import Like from "./components/Like";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [tags, setTags] = useState(['happy', 'sad']);
  const [bugs, setBugs] = useState([
    { id: 1, title: 'Bug 1', fixed: false },
    { id: 2, title: 'Bug 2', fixed: false },
  ])
  const [cartItems, setCartItems] = useState(['product 1', 'product 2']);
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "Jhon",
    }
  })
  
    const handleClick5 = () => {
      setGame({ ...game, player: { ...game.player, name: 'Bob' } });
    }

  const [pizza, setPizza] = useState({
    name: 'Spicy Pepperoni',
    toppings: ['Mushroom']
  })

  const handleClick6 = () => {
    setPizza({...pizza, toppings: [...pizza.toppings, 'Olive']});
  }

  const handleClick3 = () => {
    //Add 
    setTags([...tags, 'mad']);

    //Remove
    setTags(tags.filter(tag => tag !== 'happy'));

    //Update
    setTags(tags.map(tag => tag === 'happy' ? 'happiness' : tag));
  }

  const handleClick4 = () => {
    // setBugs( bugs.map(bug => bug.id === 1 ? {...bug , fixed: true} : bug));
    setBugs(produce(draft => {
      const bug = draft.find(bug => bug.id === 1);
      if (bug) bug.fixed = true;
    }))
  }

  let items = [
    'New York',
    'San Francisco',
    'Tokyo',
    'London',
    'Paris',
  ]

  const handleSelectItem = (item: string) => {
    console.log(item);
  }

  const [cart, setCart] = useState({
    discount: .1,
    items: [
      {id:1, title: 'Product 1', quanity: 1},
      {id:2, title: 'Product 2', quanity: 1},
    ]
  })

  const handleClick7 = () => {
    setCart({
      ...cart, 
      items: cart.items.map(item => item.id === 1 ? { ...item, quanity: item.quanity + 1 } : item)
    });
  }

  return (
    <div>
      {/* {bugs.map(bug => <p key={bug.id}>{bug.title} {bug.fixed ? 'fixed' : 'new'}</p>)}
      <button onClick={handleClick4}>Click Me</button>
      <Like onClick={() => console.log('clicked')
      } /> */}
      {/* <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /> */}

      {/* <NavBar carItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />

      <h2>{game.player.name}</h2>
      <button onClick={handleClick5}>Change Name</button>

      <h2>{pizza.toppings + " "} </h2>
      <button onClick={handleClick6}>Add Olive</button> */}

      <ExpandableText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum doloribus iure quae. Atque, quisquam distinctio repellendus odio consectetur necessitatibus delectus neque soluta nobis quas cumque debitis assumenda vitae doloremque nulla tempore illo ullam pariatur impedit. Earum commodi eius quaerat nobis maiores fuga harum, enim nostrum culpa totam! Similique culpa obcaecati tenetur provident quia doloremque ullam. Ratione veniam, quo dolorum dignissimos praesentium in reiciendis quas architecto corrupti nostrum nulla, rem recusandae nobis cumque dolores, vero obcaecati! Iusto id earum eos officiis laudantium cumque provident ad, aut, illum nesciunt accusamus labore in saepe ratione nostrum voluptatibus, magni reiciendis fuga corrupti consequatur ipsum.
      </ExpandableText>
    </div>
  )
}

export default App;

// <div>
//   {showAlert && <Alert onClose={() => setShowAlert(false)}>Alert</Alert>}
//   <Button color="secondary" onClick={() => setShowAlert(!showAlert)
//   }>My Button</Button>
// </div>


// return <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /></div>

// return (
//   <div>
//     <Alert>
//      <h1>Hello Itay</h1>
//     </Alert>
//   </div>
// )