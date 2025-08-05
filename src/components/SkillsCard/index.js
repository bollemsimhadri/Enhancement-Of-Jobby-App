import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="skill-item-con">
      <div className="skills-con">
        <img src={imageUrl} alt={name} className="img" />
        <p className="para">{name}</p>
      </div>
    </li>
  )
}
export default SkillsCard
