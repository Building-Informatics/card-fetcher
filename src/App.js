import {useState} from "react"

function App() {
  const [amount, setAmount] = useState(1)
  const [cards, setCards] = useState([])

  async function fetchData(e) {
    const requestOptions = {
      method: "GET"
    }
    const data = await fetch(`https://deckofcardsapi.com/api/deck/ihx57swbij9m/draw/?count=${amount}`, requestOptions)
    console.log(data)
    const body = await data.json()
    console.log(`body`, body)
    setCards(body.cards)
  }

  return (
    <div>
      <input value={amount} onChange={e => setAmount(e.target.value)}/>
      <button onClick={fetchData}>Fetch</button>
      <div>
        {cards.map(card => {
          return <MyComponent src={card.image}/>
        })}
      </div>
    </div>
  );
}

export default App;
