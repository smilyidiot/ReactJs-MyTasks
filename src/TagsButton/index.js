import './index.css'

const TagsButton = props => {
  const {details, activeTab} = props
  const {displayText} = details

  const onClickTag = () => {
    activeTab(displayText)
  }

  return (
    <li className="tag-list-item">
      <button type="button" className="tags-button" onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagsButton
