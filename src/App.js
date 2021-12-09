import {useState} from "react"
import mime from "mime-types"
import {v4} from 'uuid'

function App() {
  const [amount, setAmount] = useState(1)
  const [cards, setCards] = useState([])
  const [file, setFile] = useState(null)

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
  
  // upload data to solid pod
  async function uploadData() {
    const mimetype = mime.lookup(file.name)
    console.log(`mimetype`, mimetype)
    var requestOptionsPicture = {
      method: "PUT",
      headers: { "Content-Type": mimetype },
      body: file,
    };

    await fetch(
      `http://localhost:5000/jeroen/data/${v4()}`,
      requestOptionsPicture
    );
  }

  return (
    <div>
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={uploadData}>Upload</button>
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
