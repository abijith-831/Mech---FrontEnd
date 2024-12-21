import './styles/card.css'
import cardImage from '../../assets/user/ws6.webp'

const Card:React.FC = () => {
  return (
<div className="card">
      <div className="image-container">
        <img src={cardImage} alt="hghbggvvg" />
        <span className="rating">8.6</span>
        
      </div>
      <h3>AutoFix Workshop</h3>
      <h5>Chaliyam</h5>
      <h4>From 2400 Rs on service</h4>
    </div>
  )
}

export default Card
