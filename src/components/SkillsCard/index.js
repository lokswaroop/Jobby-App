import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props

  const {imageUrl, name} = skillDetails

  return (
    <li className="skillsItemContainer">
      <div className="skillsContainer">
        <img src={imageUrl} alt={name} className="SkillImage" />
        <p className="skillName">{name}</p>
      </div>
    </li>
  )
}
export default SkillsCard
