import './App.css'
import { ImageAreaSelector } from './components/ImageAreaSelector'

function App () {


  return (
    <><div className="main-content">
      <h1>Image Analyzer</h1>
      <div className="analyzer-container">

        <ImageAreaSelector />

        <div className="sidebar">
          <div className="search-bar">
            <input type="text" placeholder="Search options..." />
          </div>
          <ul className="options-list">
            <li className="highlight">Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
          <div className="buttons">
            <button>Discard</button>
            <button>Confirm</button>
          </div>
        </div>
      </div>
      <div className="image-queue">
        <h2>Next images in queue:</h2>
        <ul className="queue-list">
          <li className="queue-item">Image 1</li>
          <li className="queue-item">Image 2</li>
          <li className="queue-item">Image 3</li>
          <li className="queue-item">Image 4</li>
          <li className="queue-item">Image 5</li>
          <li className="queue-item">Image 6</li>
          <li className="queue-item">Image 7</li>
          <li className="queue-item">Image 8</li>
          <li className="queue-item">Image 9</li>
          <li className="queue-item">Image 10</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
